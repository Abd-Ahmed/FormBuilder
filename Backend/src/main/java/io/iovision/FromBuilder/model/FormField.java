package io.iovision.FromBuilder.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Getter
@Setter
public class FormField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", nullable = false)
    @JsonBackReference("formFieldReference")
    private Formulaire form;

    @ManyToOne
    @JoinColumn(name = "template_id", nullable = false)
    private FormTemplate template;

    private String label;
    private String placeholder;
    private List<String> options;
    private Boolean required;
    private Integer minLength;
    private Integer maxLength;
    private Integer min;
    private Integer max;
    private String pattern;
}
