package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Collection;


@Entity
@Data
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Please enter your full name")
    private String fullName;

    @NotBlank(message = "Password field is required")
    private String password;

    @Transient
    private String confirmPassword;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    //OneToMany with Project

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /*
    UserDetails interface methods
     */


    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // for Roles  o o o
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true; // if account expired stuff - ulta method
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true; // again utla  of locked
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true; // ulta of password expired
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
