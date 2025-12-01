import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

interface Props {
  allow: ("ADMIN" | "SOLDIER")[];
  children: ReactNode;
}

function RoleGuard({ allow, children }: Props) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <div className="card">Vui lòng đăng nhập</div>;
  if (!allow.includes(user.role)) return <div className="card">Bạn không có quyền truy cập trang này</div>;

  return <>{children}</>;
}

export default RoleGuard;
