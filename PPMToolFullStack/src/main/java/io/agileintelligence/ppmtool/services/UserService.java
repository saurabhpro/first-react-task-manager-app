package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.usernameexists.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(
                    bCryptPasswordEncoder.encode(newUser.getPassword())
            );
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());

            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword(null);

            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }
}