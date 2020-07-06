package io.agileintelligence.ppmtool.exceptions.projectnotfound;

import lombok.Data;

@Data
public class ProjectNotFoundExceptionResponse {

    private String projectNotFound;

    public ProjectNotFoundExceptionResponse(String projectNotFound) {
        this.projectNotFound = projectNotFound;
    }
}