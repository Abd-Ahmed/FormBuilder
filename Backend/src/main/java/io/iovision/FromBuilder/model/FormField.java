package io.iovision.FromBuilder.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class FormField {

    private String fieldType;

    private String label;

    private String placeholder;
}

