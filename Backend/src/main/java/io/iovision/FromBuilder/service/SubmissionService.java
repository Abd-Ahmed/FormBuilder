package io.iovision.FromBuilder.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.iovision.FromBuilder.DTO.SubmissionDTO;
import io.iovision.FromBuilder.model.Formulaire;
import io.iovision.FromBuilder.model.Submission;
import io.iovision.FromBuilder.model.User;
import io.iovision.FromBuilder.repo.FormulaireRepo;
import io.iovision.FromBuilder.repo.SubmissionRepo;
import io.iovision.FromBuilder.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SubmissionService {

    private final SubmissionRepo submissionRepo;
    private final FormulaireRepo formulaireRepo;
    private final UserRepo userRepo;
    private final ObjectMapper objectMapper;

    public SubmissionService(SubmissionRepo submissionRepo, FormulaireRepo formulaireRepo, UserRepo userRepo) {
        this.submissionRepo = submissionRepo;
        this.formulaireRepo = formulaireRepo;
        this.userRepo = userRepo;
        this.objectMapper = new ObjectMapper();

    }

    @Transactional
    public Submission saveSubmission(Long formId, Integer userId, Map<String, String> formData) throws JsonProcessingException {
        Formulaire form = formulaireRepo.findById(formId)
                .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        Submission submission = new Submission();
        submission.setForm(form);
        submission.setSubmittedBy(user);
        submission.setSubmittedAt(LocalDateTime.now());

        JsonNode jsonData = objectMapper.valueToTree(formData);
        submission.setFormData(jsonData);

        return submissionRepo.save(submission);

}

    public List<Submission> getSubmissionsByFormId(Long formId) {
        Formulaire form = formulaireRepo.findById(formId)
                .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
        return form.getSubmissions();
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + id));
    }

    public List<SubmissionDTO> getSubmissionsByUserId(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        return user.getSubmissions().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    private SubmissionDTO convertToDTO(Submission submission) {
        SubmissionDTO dto = new SubmissionDTO();
        dto.setId(submission.getId());
        dto.setFormId(submission.getForm().getId());
        dto.setFormName(submission.getForm().getFormName());
        dto.setUserId(Long.valueOf(submission.getSubmittedBy().getId()));
        dto.setUsername(submission.getSubmittedBy().getUsername());
        dto.setSubmittedAt(submission.getSubmittedAt());
        dto.setFormData(submission.getFormData());
        return dto;
    }

}