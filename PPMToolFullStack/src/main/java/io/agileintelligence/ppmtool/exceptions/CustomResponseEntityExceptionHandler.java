package io.agileintelligence.ppmtool.exceptions;


import io.agileintelligence.ppmtool.exceptions.projectid.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.projectid.ProjectIdExceptionResponse;
import io.agileintelligence.ppmtool.exceptions.projectnotfound.ProjectNotFoundException;
import io.agileintelligence.ppmtool.exceptions.projectnotfound.ProjectNotFoundExceptionResponse;
import io.agileintelligence.ppmtool.exceptions.usernameexists.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.exceptions.usernameexists.UsernameAlreadyExistsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleBindResultException(BindingResultCustomException ex) {
        final var errorMap = ex.getErrorMap();
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest request) {
        ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request) {
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameExistsException(UsernameAlreadyExistsException ex) {
        final var exceptionResponse = new UsernameAlreadyExistsResponse(ex.getLocalizedMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
