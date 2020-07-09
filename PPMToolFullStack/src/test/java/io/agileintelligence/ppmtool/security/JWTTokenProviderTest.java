package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.TestingAuthenticationToken;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Slf4j
class JWTTokenProviderTest {

    private static String token;
    private static Instant expectedTimeOfExpiry;
    private final JWTTokenProvider tokenProvider = new JWTTokenProvider();

    @BeforeAll
    static void setToken() throws InterruptedException {
        expectedTimeOfExpiry = Instant.now()
                .plus(SecurityConstants.EXPIRATION_TIME_SECONDS, ChronoUnit.SECONDS);

        // so that we see difference clearly with actual expiry and this expiry
        TimeUnit.SECONDS.sleep(2);

        User user = new User();
        user.setId(17L);
        user.setUsername("saurabh@123.com");
        user.setFullName("Saurabh Kumar");

        TestingAuthenticationToken authenticationToken = new TestingAuthenticationToken(user, null);
        token = new JWTTokenProvider().generateAuthToken(authenticationToken);
    }

    @Test
    public void checkGenerateAuthTokenIsNotNull() {
        log.debug(token);

        assertNotNull(token);
    }

    @Test
    void validateAuthToken() {
        final var actual = tokenProvider.validateAuthToken(token);
        Assertions.assertNotNull(actual);
    }

    @Test
    void getUserIdFromAuthToken() {
        final var claims = tokenProvider.validateAuthToken(token);
        final var actual = tokenProvider.getUserIdFromAuthToken(claims);

        Assertions.assertEquals(17L, actual);
    }

    @Test
    void getClaimsFromAuthToken() {
        final Claims actual = tokenProvider.getClaimsFromAuthToken(token);

        assertThat(actual.get("id")).isEqualTo("17");
        assertThat(actual.getExpiration()).isNotNull();
        assertThat(actual.getIssuedAt()).isNotNull();

        // Check expiration date it set to more than 60 minutes in the future
        assertThat(actual.getExpiration())
                .isAfterOrEqualTo(Date.from(expectedTimeOfExpiry));

        assertThat(actual.getExpiration())
                .isCloseTo(Date.from(expectedTimeOfExpiry), 2000);
    }

}