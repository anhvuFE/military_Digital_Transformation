import type { Session } from "@/types/session";

export async function listSessions(): Promise<Session[]> {
  throw new Error("Mock only");
}

export async function createSession(payload: Omit<Session, "id">): Promise<Session> {
  console.info(payload);
  throw new Error("Mock only");
}
