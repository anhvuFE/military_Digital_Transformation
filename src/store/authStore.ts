import { create } from "zustand";
import type { Role, User } from "@/types/auth";
import { useUiStore } from "./uiStore";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (payload: { serviceNumber: string; password: string }) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const fakeUsers: Record<string, User> = {
  admin: {
    id: "1",
    fullName: "Nguyen Van A",
    rank: "Thuong uy",
    serviceNumber: "admin",
    role: "ADMIN",
    unitId: "unit-1",
  },
  soldier: {
    id: "2",
    fullName: "Tran Van B",
    rank: "Trung si",
    serviceNumber: "soldier",
    role: "SOLDIER",
    unitId: "unit-2",
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,

  async login({ serviceNumber, password }) {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 600));
    const ui = useUiStore.getState();
    const found =
      fakeUsers[serviceNumber as keyof typeof fakeUsers] ??
      Object.values(fakeUsers).find((u) => u.serviceNumber === serviceNumber);
    if (!found || password !== "123456") {
      set({ loading: false });
      ui.showToast({ type: "error", message: "Sai mã quân nhân hoặc mật khẩu (gõ 123456 để demo)" });
      return;
    }
    set({ user: found, token: "demo-token", loading: false });
    ui.showToast({ type: "success", message: "Đăng nhập thành công" });
  },

  logout() {
    set({ user: null, token: null });
  },

  hasRole(role) {
    return get().user?.role === role;
  },
}));
