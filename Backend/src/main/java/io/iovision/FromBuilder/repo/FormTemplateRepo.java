package io.iovision.FromBuilder.repo;

import io.iovision.FromBuilder.model.FormTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormTemplateRepo extends JpaRepository<FormTemplate, Long> {
    Optional<FormTemplate> findByCode(String code);

}
