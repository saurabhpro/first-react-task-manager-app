package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTTokenProvider {

    //Generate the token

    public String generateToken(Authentication authentication) {
        final User user = (User) authentication.getPrincipal();

        final LocalDateTime now = LocalDateTime.now();
        final LocalDateTime expiryDate = now.plus(SecurityConstants.EXPIRATION_TIME_MILLIS, ChronoUnit.MILLIS);

        final String userId = String.valueOf(user.getId());

//        immutable claims are not acceptable as JWT builder updates it too
//        final Map<String, Object> claims = Map.ofEntries(
//                Map.entry("id", Long.toString(user.getId())),
//                Map.entry("username", user.getUsername()),
//                Map.entry("fullName", user.getFullName())
//        );

        final Map<String, Object> claims = new HashMap<>();
        claims.put("id", Long.toString(user.getId()));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());


        // addition of ROLES done here
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(Date.from(now.toInstant(ZoneOffset.UTC)))
                .setExpiration(Date.from(expiryDate.toInstant(ZoneOffset.UTC)))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET) //TODO
                .compact();
    }

    //Validate the token

    //Get user Id from token
}