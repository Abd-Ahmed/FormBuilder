package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.Submission;
import io.iovision.FromBuilder.repo.SubmissionRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepo submissionRepo;
    private final FormulaireService formulaireService;

    public SubmissionService(SubmissionRepo submissionRepo, FormulaireService formulaireService) {
        this.submissionRepo = submissionRepo;
        this.formulaireService = formulaireService;
    }

    @Transactional
    public Submission saveSubmission(Submission submission) {
        // Ensure the form exists
        formulaireService.getFormulaireById(submission.getForm().getId());
        return submissionRepo.save(submission);
    }

    public List<Submission> getSubmissions(Long userId, Long formId) {
        return submissionRepo.findByUserIdAndFormId(userId, formId);
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Submission not found with id: " + id));
    }

    @Transactional
    public void deleteSubmission(Long id) {
        submissionRepo.deleteById(id);
    }
}