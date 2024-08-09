package io.iovision.FromBuilder.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import io.iovision.FromBuilder.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {

    Role findByName(String name);


}
