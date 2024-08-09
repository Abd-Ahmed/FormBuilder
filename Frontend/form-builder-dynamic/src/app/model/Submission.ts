// src/app/models/submission.model.ts

import { User } from '../model/User';
import { Formulaire } from '../model/Formulaire';

export interface Submission {
  id?: number;
  form: { id: number }; // Simplified form type
  user: { id: any };
  formData: string;
  createdAt?: Date;
}