package io.iovision.FromBuilder.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "formulaire")
public class Formulaire implements Serializable {

    @Id
    @SequenceGenerator(name = "formulaire_seq", sequenceName = "formulaire_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "formulaire_seq")
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String formName;

    private String description;

    @ElementCollection
    @CollectionTable(name = "form_fields", joinColumns = @JoinColumn(name = "form_id"))
    private List<FormField> formFields = new ArrayList<>();

    // Constructors, getters, setters, and other methods
}
