package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JWTTokenProvider {

    //Generate the token
    public String generateAuthToken(Authentication authentication) {
        final User user = (User) authentication.getPrincipal();

        final LocalDateTime now = LocalDateTime.now();
        final LocalDateTime expiryDate = now.plus(SecurityConstants.EXPIRATION_TIME_SECONDS, ChronoUnit.MILLIS);

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
                .setExpiration(Date.from(expiryDate.toInstant(ZoneOffset.UTC).
                        plusSeconds(SecurityConstants.EXPIRATION_TIME_SECONDS))
                )
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET) //TODO
                .compact();
    }


    //Validate the token
    public boolean validateAuthToken(final String token) {
        try {
            // just parsing correctly means its valid
            getClaimsFromAuthToken(token);
            return true;
        } catch (SignatureException sEx) {
            log.error("JWT Signature Invalid");
        } catch (MalformedJwtException mEx) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException eEx) {
            log.error("Expired JWT Token");
        } catch (UnsupportedJwtException uEx) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException iEx) {
            log.error("JWT claims string is empty");
        }

        return false;
    }

    //Get user Id from token
    public Long getUserIdFromAuthToken(String token) {
        Claims claims = getClaimsFromAuthToken(token);

        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }

    Claims getClaimsFromAuthToken(String token) {
        return Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}