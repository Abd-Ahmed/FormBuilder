package io.iovision.FromBuilder.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Getter
@Setter
@Table(name = "submission")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "form_id", nullable = false)
    private Formulaire form;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User submittedBy;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @ElementCollection
    @CollectionTable(name = "submission_data", joinColumns = @JoinColumn(name = "submission_id"))
    @MapKeyColumn(name = "field_name")
    @Column(name = "field_value")
    private Map<String, String> formData;
}
