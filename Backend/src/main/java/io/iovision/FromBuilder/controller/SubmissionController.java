package io.iovision.FromBuilder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.iovision.FromBuilder.model.Submission;
import io.iovision.FromBuilder.model.User;
import io.iovision.FromBuilder.service.SubmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8101")
@RequestMapping("/submission")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/create/{formId}")
    public ResponseEntity<Submission> createSubmission(@PathVariable Long formId,
                                                       @RequestBody Map<String, String> formData,
                                                       @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = (User) userDetails;
            Submission submission = submissionService.saveSubmission(formId, user.getId(), formData);
            return ResponseEntity.status(HttpStatus.CREATED).body(submission);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/form/{formId}")
    public ResponseEntity<List<Submission>> getSubmissionsByFormId(@PathVariable Long formId) {
        List<Submission> submissions = submissionService.getSubmissionsByFormId(formId);
        return ResponseEntity.ok(submissions);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Submission>> getSubmissionsByUserId(@PathVariable Long userId) {
        List<Submission> submissions = submissionService.getSubmissionsByUserId(userId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable Long id) {
        Submission submission = submissionService.getSubmissionById(id);
        return ResponseEntity.ok(submission);
    }
}