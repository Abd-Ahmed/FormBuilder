package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.User;
import io.iovision.FromBuilder.repo.UserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String email = ((UserDetails)principal).getUsername(); // Spring Security uses username for the principal, which in this case is the email
            return userRepository.findByEmail(email);
        }

        return null;
    }
}