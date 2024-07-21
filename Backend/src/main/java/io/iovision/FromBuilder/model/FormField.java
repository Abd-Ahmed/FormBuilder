package io.iovision.FromBuilder.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Embeddable
@Getter
@Setter
public class FormField {

    private String fieldType;

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

