package io.iovision.FromBuilder.controller;


import io.iovision.FromBuilder.auth.AuthentifcationRequest;
import io.iovision.FromBuilder.auth.AuthentificationResponse;
import io.iovision.FromBuilder.auth.AuthentificationService;
import io.iovision.FromBuilder.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthentifcationController {
    private final AuthentificationService service;

    @CrossOrigin(origins = "http://localhost:8100")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        System.out.println("Received registration request: " + request);
        try {
            AuthentificationResponse response = service.register(request);
            System.out.println("Registration successful");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("Registration failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:8100")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthentifcationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthentificationResponse> refreshToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return ResponseEntity.ok(service.refreshToken(token));
        }
        return ResponseEntity.badRequest().build();
    }


}
