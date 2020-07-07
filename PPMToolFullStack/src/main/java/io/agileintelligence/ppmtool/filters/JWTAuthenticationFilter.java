package io.agileintelligence.ppmtool.filters;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.security.JWTTokenProvider;
import io.agileintelligence.ppmtool.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static io.agileintelligence.ppmtool.security.SecurityConstants.BEARER_TOKEN_PREFIX;
import static io.agileintelligence.ppmtool.security.SecurityConstants.HEADER_STRING;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = getJWTFromRequest(httpServletRequest);

            if (StringUtils.hasText(jwt) && tokenProvider.validateAuthToken(jwt)) {

                Long userId = tokenProvider.getUserIdFromAuthToken(jwt);

                // call userDetails service
                User userDetails = customUserDetailsService.loadUserById(userId);

                // authentication info
                final var authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        Collections.emptyList()
                );

                // add authentication session and remote address in authentication details
                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(httpServletRequest)
                );

                // add in context - the verified authentication
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

            }

        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }


        // TODO responsible for ?
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }


    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(HEADER_STRING);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TOKEN_PREFIX)) {
            return bearerToken.substring(BEARER_TOKEN_PREFIX.length());
        }

        return null;
    }
}