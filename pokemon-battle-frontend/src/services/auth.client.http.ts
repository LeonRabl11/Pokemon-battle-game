import { http } from "../lib/http";
import type {
  IAuthClient,
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from "./auth.types";

const USER_KEY = "user_v1";

export class HttpAuthClient implements IAuthClient {
  async login(input: LoginInput): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>("/auth/login", {
      email: input.email,
      password: input.password,
    });

    if (input.remember) {
      localStorage.setItem("token", data.token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", data.token);
      localStorage.removeItem("token");
    }

    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  }

  async register(input: RegisterInput): Promise<{ message: string }> {
    const { data } = await http.post<{ message: string }>("/auth/register", {
      email: input.email,
      password: input.password,
    });
    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
