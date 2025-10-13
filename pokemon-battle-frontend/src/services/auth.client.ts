import type { IAuthClient } from "./auth.types";
import { MockAuthClient } from "./auth.client.mock";
import { HttpAuthClient } from "./auth.client.http.ts";

const useMock =
  String(import.meta.env.VITE_USE_MOCK_AUTH ?? "true").toLowerCase() === "true";

let client: IAuthClient | null = null;

export function getAuthClient(): IAuthClient {
  if (!client) {
    client = useMock ? new MockAuthClient() : new HttpAuthClient();
  }
  return client;
}
