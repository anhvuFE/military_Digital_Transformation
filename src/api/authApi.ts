import type { User } from "@/types/auth";

export async function login(payload: { serviceNumber: string; password: string }): Promise<{ user: User; token: string }> {
  console.info("Mock login", payload);
  throw new Error("API layer not implemented. Use authStore mock instead.");
}
