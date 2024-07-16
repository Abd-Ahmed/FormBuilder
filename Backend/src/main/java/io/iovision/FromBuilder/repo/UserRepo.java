package io.iovision.FromBuilder.repo;

import io.iovision.FromBuilder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    void deleteUserById(Long id);
}