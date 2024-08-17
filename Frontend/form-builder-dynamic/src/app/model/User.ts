import { Submission } from "./Submission";

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: {
    id: number;
    name: string;
  };
  submissions: Submission[];

}
  
  export interface AuthenticatedUser {
    id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: {
    id: number;
    name: string;
  };
  submissions: Submission[];

}