package io.iovision.FromBuilder.controller;


import io.iovision.FromBuilder.auth.AuthentifcationRequest;
import io.iovision.FromBuilder.auth.AuthentificationResponse;
import io.iovision.FromBuilder.auth.AuthentificationService;
import io.iovision.FromBuilder.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthentifcationController {
    private final AuthentificationService service;

    @CrossOrigin(origins = "http://localhost:8100")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthentificationResponse response = service.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:8100")
    @PostMapping("/login")
    public ResponseEntity<AuthentificationResponse> register(@RequestBody AuthentifcationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));


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
