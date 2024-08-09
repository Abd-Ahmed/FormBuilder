import { FormTemplate } from "./FormTemplate";

export interface FormField {
  id?: number;
  formId?: number;
  template: FormTemplate;
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
