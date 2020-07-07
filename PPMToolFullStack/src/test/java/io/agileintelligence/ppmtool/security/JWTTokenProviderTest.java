package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.TestingAuthenticationToken;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Slf4j
class JWTTokenProviderTest {

    JWTTokenProvider tokenProvider  = new JWTTokenProvider();

    @Test
    public void generateAuthToken() {
        User user = new User();
        user.setId(17L);
        user.setUsername("saurabh@123.com");
        user.setFullName("Saurabh Kumar");

        TestingAuthenticationToken authenticationToken = new TestingAuthenticationToken(user, null);
        String token = tokenProvider.generateAuthToken(authenticationToken);
        log.debug(token);

        assertNotNull(token);
    }

    @Test
    void validateAuthToken(){
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IlNhdXJhYmggS3VtYXIiLCJpZCI6IjE3IiwiZXhwIjoxNTk0MDkzNjcxLCJpYXQiOjE1OTQwOTM2NDEsInVzZXJuYW1lIjoic2F1cmFiaEAxMjMuY29tIn0.RFtv6trXOxeNAWRtzXcN-biPP5f3wPSFshaN7oEXG8ptfXeIzcXkpTGXN_iy8Qhz7Xj2i4vbu4DplvMhyU29Nw";

        final var actual = tokenProvider.validateAuthToken(token);
        Assertions.assertTrue(actual);
    }

    @Test
    void getUserIdFromAuthToken(){
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IlNhdXJhYmggS3VtYXIiLCJpZCI6IjE3IiwiZXhwIjoxNTk0MDkzNjcxLCJpYXQiOjE1OTQwOTM2NDEsInVzZXJuYW1lIjoic2F1cmFiaEAxMjMuY29tIn0.RFtv6trXOxeNAWRtzXcN-biPP5f3wPSFshaN7oEXG8ptfXeIzcXkpTGXN_iy8Qhz7Xj2i4vbu4DplvMhyU29Nw";

        final var actual = tokenProvider.getUserIdFromAuthToken(token);
        Assertions.assertEquals(17L, actual);
    }

    @Test
    void getClaimsFromAuthToken(){
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IlNhdXJhYmggS3VtYXIiLCJpZCI6IjE3IiwiZXhwIjoxNTk0MDkzNjcxLCJpYXQiOjE1OTQwOTM2NDEsInVzZXJuYW1lIjoic2F1cmFiaEAxMjMuY29tIn0.RFtv6trXOxeNAWRtzXcN-biPP5f3wPSFshaN7oEXG8ptfXeIzcXkpTGXN_iy8Qhz7Xj2i4vbu4DplvMhyU29Nw";

        final Claims actual = tokenProvider.getClaimsFromAuthToken(token);
        assertThat(actual.get("id").equals( 17L));
         assertThat(actual.getExpiration()).isNotNull();
        assertThat(actual.getIssuedAt()).isNotNull();
        // Check expiration date it set to more than 60 minutes in the future
        assertThat(actual.getExpiration()).isAfterOrEqualTo(
                Date.from(
                        LocalDateTime.now().toInstant(ZoneOffset.UTC).plus(60, ChronoUnit.MINUTES)
                ));
    }

}