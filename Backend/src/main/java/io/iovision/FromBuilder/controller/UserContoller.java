package io.iovision.FromBuilder.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserContoller {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("worked");
    }
}
