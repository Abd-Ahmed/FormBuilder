package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.User;
import io.iovision.FromBuilder.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser (User user){
        user.setRole(false);
        return userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }
    public User updateuser(User user) {
        return userRepo.save(user);
    }
    public void deleteUser(Long id){
        userRepo.deleteUserById(id);
    }
}