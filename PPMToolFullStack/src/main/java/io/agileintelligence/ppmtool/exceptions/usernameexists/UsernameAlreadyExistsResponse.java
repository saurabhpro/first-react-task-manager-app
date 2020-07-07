package io.agileintelligence.ppmtool.exceptions.usernameexists;

import lombok.Getter;

@Getter
public class UsernameAlreadyExistsResponse {
    private String username;

    public UsernameAlreadyExistsResponse(String username) {
        this.username = username;
    }
}
