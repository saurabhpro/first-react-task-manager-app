package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.MapValidationErrorComponent;
import io.agileintelligence.ppmtool.loginpayload.JWTLoginSuccessResponse;
import io.agileintelligence.ppmtool.loginpayload.LoginRequest;
import io.agileintelligence.ppmtool.security.JWTTokenProvider;
import io.agileintelligence.ppmtool.services.UserService;
import io.agileintelligence.ppmtool.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static io.agileintelligence.ppmtool.security.SecurityConstants.BEARER_TOKEN_PREFIX;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    private final MapValidationErrorComponent mapValidationErrorComponent;
    private final UserService userService;
    private final UserValidator userValidator;
    private final JWTTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public UserController(MapValidationErrorComponent mapValidationErrorComponent, UserService userService, UserValidator userValidator, JWTTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.mapValidationErrorComponent = mapValidationErrorComponent;
        this.userService = userService;
        this.userValidator = userValidator;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        // Validate passwords match
        userValidator.validate(user, result);

        mapValidationErrorComponent.mapValidationErrors(result);

        User newUser = userService.saveUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JWTLoginSuccessResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                                                    BindingResult result) {
        mapValidationErrorComponent.mapValidationErrors(result);

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String jwt = BEARER_TOKEN_PREFIX + tokenProvider.generateAuthToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

}
