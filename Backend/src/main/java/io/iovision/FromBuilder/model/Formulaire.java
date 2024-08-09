package io.iovision.FromBuilder.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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


    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FormField> formFields = new ArrayList<>();

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Submission> submissions = new ArrayList<>();
    // Constructors, getters, setters, and other methods
}
