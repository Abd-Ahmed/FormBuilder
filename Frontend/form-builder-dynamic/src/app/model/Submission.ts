export interface Submission {
  id: number;
  form: {
    id: number;
    formName: string;
  };
  submittedBy: {
    id: number;
    username: string;
  };
  submittedAt: string;
  formData: any;
}