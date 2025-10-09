import type {
  IAuthClient,
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from "./auth.types";

const USERS_KEY = "mock_users_v1";
const TOKEN_KEY = "token_v1";
const USER_KEY = "user_v1";

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

function loadUsers(): (User & { password: string })[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as (User & { password: string })[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: (User & { password: string })[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export class MockAuthClient implements IAuthClient {
  async login(input: LoginInput): Promise<AuthResponse> {
    await sleep(300);
    const users = loadUsers();
    const found = users.find(
      (u) => u.email === input.email && u.password === input.password
    );
    if (!found) throw new Error("Invalid email or password");

    const token = `mock.${btoa(found.email)}.${Date.now()}`;
    if (input.remember) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
    }

    const user: User = { id: found.id, email: found.email };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { token, user };
  }

  async register(input: RegisterInput): Promise<{ message: string }> {
    await sleep(300);
    const users = loadUsers();
    if (users.some((u) => u.email === input.email)) {
      throw new Error("Email already registered");
    }
    users.push({
      id: crypto.randomUUID(),
      email: input.email,
      password: input.password,
    });
    saveUsers(users);
    return { message: "ok" };
  }

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
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
