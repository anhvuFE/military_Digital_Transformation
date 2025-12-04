import { create } from "zustand";
import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface UiState {
  toasts: Toast[];
  showToast: (payload: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  modal: {
    open: boolean;
    title?: string;
    content?: ReactNode;
  };
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  showToast({ type, message }) {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));
  },
  removeToast(id) {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  sidebarOpen: false,
  openSidebar() {
    set({ sidebarOpen: true });
  },
  closeSidebar() {
    set({ sidebarOpen: false });
  },
  toggleSidebar() {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },
  modal: { open: false },
  openModal(title, content) {
    set({ modal: { open: true, title, content } });
  },
  closeModal() {
    set({ modal: { open: false } });
  },
}));
