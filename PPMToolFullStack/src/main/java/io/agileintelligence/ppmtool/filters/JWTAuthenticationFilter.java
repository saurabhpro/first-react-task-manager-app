package io.agileintelligence.ppmtool.filters;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.security.JWTTokenProvider;
import io.agileintelligence.ppmtool.services.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
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
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            if (checkJWTToken(request)) {
                String jwt = getJWTFromRequest(request);
                Claims claims = tokenProvider.validateAuthToken(jwt);

                if (claims.get("id") != null) {
                    setUpSpringAuthentication(claims, request);
                } else {
                    SecurityContextHolder.clearContext();
                }
            } else {
                SecurityContextHolder.clearContext();
            }

            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e) {
            logger.error("Could not set user authentication in security context", e);
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
        }
    }

    /**
     * Authentication method in Spring boot
     *
     * @param claims
     * @param request
     */
    private void setUpSpringAuthentication(Claims claims, HttpServletRequest request) {
        // get user ID
        final Long userId = tokenProvider.getUserIdFromAuthToken(claims);

        // call userDetails service
        final User userDetails = customUserDetailsService.loadUserById(userId);

        // authentication info
        final var authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                Collections.emptyList() // authorities/roles
        );

        // add authentication session and remote address in authentication details
        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request)
        );

        // add in context - the verified authentication
        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        final String bearerToken = request.getHeader(HEADER_STRING);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TOKEN_PREFIX)) {
            return bearerToken.substring(BEARER_TOKEN_PREFIX.length());
        }

        throw new MalformedJwtException("Authentication Header doesn't have Bearer Token");
    }

    private boolean checkJWTToken(HttpServletRequest request) {
        final String authenticationHeader = request.getHeader(HEADER_STRING);
        return authenticationHeader != null && authenticationHeader.startsWith(BEARER_TOKEN_PREFIX);
    }

}