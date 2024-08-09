package io.iovision.FromBuilder.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class FormField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "form_id", nullable = false)
    @JsonBackReference
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

