package io.iovision.FromBuilder.auth;

import io.iovision.FromBuilder.model.Role;
import io.iovision.FromBuilder.model.User;
import io.iovision.FromBuilder.repo.UserRepo;
import io.iovision.FromBuilder.repo.RoleRepo;

import io.iovision.FromBuilder.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthentificationService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private Role test;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthentificationResponse register(RegisterRequest request) {

        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleRepo.findByName("USER"))
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthentificationResponse.builder().token(jwtToken).build();
    }
    public AuthentificationResponse authenticate(AuthentifcationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthentificationResponse.builder().token(jwtToken).build();

    }
    public AuthentificationResponse refreshToken(String token) {
        String refreshedToken = jwtService.refreshToken(token);
        return AuthentificationResponse.builder().token(refreshedToken).build();
    }
}
