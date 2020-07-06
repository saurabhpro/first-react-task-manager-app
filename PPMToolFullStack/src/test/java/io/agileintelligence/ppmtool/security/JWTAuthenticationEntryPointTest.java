package io.agileintelligence.ppmtool.security;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JWTAuthenticationEntryPointTest {

   private final JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint=new JWTAuthenticationEntryPoint();
    @Test
    void getLoginJSONResponse() {
        String actual = jwtAuthenticationEntryPoint.getLoginJSONResponse();
        Assertions.assertEquals("{\"username\":\"Invalid Username\",\"password\":\"Invalid Password\"}", actual);
    }
}