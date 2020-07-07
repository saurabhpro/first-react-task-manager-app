package io.agileintelligence.ppmtool.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET = "d43e0828-c545-48ec-a899-330efaf4d552";   // used uuid generated
    public static final String BEARER_TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME_SECONDS = 36 * 100L; //3600 seconds
}