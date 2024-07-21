export interface FormField {
    fieldType: string;
    label: string;
    placeholder?: string;
    options?: string[]; // For dropdown and radio fields
    required?: boolean; // If you decide to add a required property
    minLength?: number; // For text fields
    maxLength?: number; // For text fields
    min?: number; // For number fields
    max?: number; // For number fields
    pattern?: string; // For custom patterns
  }
  