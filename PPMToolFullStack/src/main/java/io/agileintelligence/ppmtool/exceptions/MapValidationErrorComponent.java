package io.agileintelligence.ppmtool.exceptions;

import io.agileintelligence.ppmtool.exceptions.BindingResultCustomException;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Component
public class MapValidationErrorComponent {

    public void mapValidationErrors(BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            throw new BindingResultCustomException(errorMap);
        }
    }
}
