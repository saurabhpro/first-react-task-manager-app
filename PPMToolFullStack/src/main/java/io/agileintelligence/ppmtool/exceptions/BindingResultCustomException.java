package io.agileintelligence.ppmtool.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@Getter
@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BindingResultCustomException extends RuntimeException {
    private final Map<String, String> errorMap;

    public BindingResultCustomException(Map<String, String> errorMap) {
        this.errorMap = errorMap;
    }
}
