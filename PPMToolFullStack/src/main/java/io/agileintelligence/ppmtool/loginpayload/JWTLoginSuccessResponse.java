package io.agileintelligence.ppmtool.loginpayload;

import lombok.Data;

@Data
public class JWTLoginSuccessResponse {
    private final boolean success;
    private final String token;
}