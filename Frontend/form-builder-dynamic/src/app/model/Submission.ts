export interface Submission {
  id: number;
  formId: number;
  formName: string;
  userId: number;
  username: string;
  submittedAt: string;
  formData: any;
}