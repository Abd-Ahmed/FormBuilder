package io.iovision.FromBuilder.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.JsonNode;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.Map;
@Entity
@Getter
@Setter
@Table(name = "submission")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

    @Column(columnDefinition = "jsonb")
    @Type(JsonBinaryType.class)
    private JsonNode formData;
}