// types/auth.ts
export interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ErrorState {
  [key: string]: string;
}
