import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastContainer from "../common/ToastContainer";
import Modal from "../common/Modal";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/login");
  const user = useAuthStore((s) => s.user);
   const { sidebarOpen, closeSidebar } = useUiStore();

  if (isAuthPage) {
    return (
      <>
        {children}
        <ToastContainer />
        <Modal />
      </>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-shell bg-bg">
      <Sidebar className="hidden lg:flex" />
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <main className="page">{children}</main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeSidebar} />
          <Sidebar className="relative z-50 w-72 translate-x-0" />
        </div>
      )}
      <ToastContainer />
      <Modal />
    </div>
  );
}

export default AppLayout;
