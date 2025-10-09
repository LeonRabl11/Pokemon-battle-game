import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { getAuthClient } from "../services/auth.client";
import type {
  User,
  LoginInput,
  RegisterInput,
  AuthResponse,
} from "../services/auth.types";

type AuthState = { user: User | null; token: string | null };

export default function AuthProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => getAuthClient(), []);
  const [state, setState] = useState<AuthState>({
    user: client.getCurrentUser(),
    token: client.getToken(),
  });

  const login = async (input: LoginInput): Promise<void> => {
    const res: AuthResponse = await client.login(input);
    setState({ user: res.user, token: res.token });
  };

  const register = async (input: RegisterInput): Promise<void> => {
    await client.register(input);
  };

  const logout = async (): Promise<void> => {
    await client.logout();
    setState({ user: null, token: null });
  };

  const value: AuthContextValue = useMemo(
    () => ({ user: state.user, token: state.token, login, register, logout }),
    [state.user, state.token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
