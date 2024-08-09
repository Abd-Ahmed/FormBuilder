export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
  }
  
  export interface AuthenticatedUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
  }
  
  export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  