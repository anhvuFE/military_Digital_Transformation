import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Home, User, BookOpen, Award, Calendar, FileText, Trophy, Shield, BarChart3, Clock, Medal } from "lucide-react";

const links = {
  SOLDIER: [
    { to: "/dashboard", label: "Trang chủ", icon: Home },
    { to: "/profile", label: "Hồ sơ cá nhân", icon: User },
    { to: "/training-history", label: "Lịch sử huấn luyện", icon: Clock },
    { to: "/results", label: "Kết quả cá nhân", icon: Award },
    { to: "/achievements", label: "Thành tích", icon: Medal },
  ],
  ADMIN: [
    { to: "/dashboard", label: "Bảng điều khiển", icon: Home },
    { to: "/courses", label: "Khóa huấn luyện", icon: BookOpen },
    { to: "/sessions", label: "Buổi huấn luyện", icon: Calendar },
    { to: "/reports", label: "Báo cáo", icon: BarChart3 },
    { to: "/commendations", label: "Khen thưởng", icon: Trophy },
  ],
};

function Sidebar({ className }: { className?: string }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <aside className={clsx("sidebar", className)}>
      <div className="brand flex items-center gap-2">
        <Shield className="h-6 w-6 text-sand" />
        <span>Quân đội số</span>
      </div>
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sand/70">
        {user.role === "ADMIN" ? "Trung tâm chỉ huy" : "Khu vực cá nhân"}
      </p>
      <div className="flex flex-col gap-1.5">
        {links[user.role].map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${isActive ? "active" : ""} group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-white/10`
              }
            >
              <Icon className="h-4 w-4 text-sand/70 group-hover:text-sand" />
              <span className="flex-1">{item.label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-sand/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          );
        })}
      </div>

      {/* User Info Section */}
      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="rounded-lg bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/20">
              <User className="h-5 w-5 text-orange" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-sand">{user.name}</p>
              <p className="text-xs text-sand/70">
                {user.role === "ADMIN" ? "Quản trị viên" : "Quân nhân"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
