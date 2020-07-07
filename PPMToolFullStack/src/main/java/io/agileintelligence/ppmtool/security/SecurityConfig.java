package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.filters.JWTAuthenticationFilter;
import io.agileintelligence.ppmtool.services.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@EnableWebSecurity
// for future method security
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JWTAuthenticationEntryPoint unauthorizedHandler;

    private final CustomUserDetailsService customUserDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SecurityConfig(JWTAuthenticationEntryPoint unauthorizedHandler, CustomUserDetailsService customUserDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.customUserDetailsService = customUserDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // how to deal with username and passwords and roles are all done here  - do see the in-memory pwd thing
    @Override
    protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    // overloaded only for this and @bean so that we can auto-wire in our controllers
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }

    /**
     * Securing the urls and allowing role-based access to these urls.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors() //Cross-Origin Resource Sharing
                .and()
                .csrf().disable()   //Cross-Site Request Forgery https://www.baeldung.com/spring-security-csrf
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)  // add exception handler like 401
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //REST Apis are stateless
                .and()
                .headers().frameOptions().sameOrigin() //To enable H2 Database
                .and()
                .authorizeRequests()
                .antMatchers(
                        "/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .antMatchers(SecurityConstants.SIGN_UP_URLS).permitAll()
                .antMatchers(SecurityConstants.H2_URL).permitAll()
                .anyRequest().authenticated();// rest any other request should be authenticated

        //Allows adding a {@link Filter} before one of the known {@link Filter} classes.
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
