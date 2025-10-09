export type User = {
  id: string;
  email: string;
};

export type LoginInput = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterInput = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export interface IAuthClient {
  login(input: LoginInput): Promise<AuthResponse>;
  register(input: RegisterInput): Promise<{ message: string }>;
  logout(): Promise<void>;
  getToken(): string | null;
  getCurrentUser(): User | null;
}
