import { FormField } from "./FormField";
export interface Formulaire {
    id: number;
    formName: string;
    description: string; 
    formFields: FormField[];
}
