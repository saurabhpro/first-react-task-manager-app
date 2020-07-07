package io.agileintelligence.ppmtool.loginpayload;

import lombok.Getter;

@Getter
public class InvalidLoginResponse {
    private final String httpMsg;
    private final String username;
    private final String password;

    public InvalidLoginResponse() {
        this.httpMsg = "HTTP Status 401";
        this.username = "Invalid Username";
        this.password = "Invalid Password";
    }
}