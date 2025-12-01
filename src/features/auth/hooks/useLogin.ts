import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
  const loginAction = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const [error, setError] = useState<string | null>(null);

  const login = async (serviceNumber: string, password: string) => {
    try {
      setError(null);
      await loginAction({ serviceNumber, password });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return { login, loading, error };
}
