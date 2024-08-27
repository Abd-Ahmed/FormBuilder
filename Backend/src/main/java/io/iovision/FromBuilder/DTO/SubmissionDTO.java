package io.iovision.FromBuilder.DTO;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubmissionDTO {
    private Long id;
    private Long formId;
    private String formName;
    private Long userId;
    private String username;
    private LocalDateTime submittedAt;
    private JsonNode formData;
}
