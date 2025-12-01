import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const links = {
  SOLDIER: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/results", label: "Kết quả cá nhân" },
  ],
  ADMIN: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Khóa huấn luyện" },
    { to: "/sessions", label: "Buổi huấn luyện" },
    { to: "/reports", label: "Báo cáo" },
    { to: "/commendations", label: "Khen thưởng" },
  ],
};

function Sidebar({ className }: { className?: string }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <aside className={clsx("sidebar", className)}>
      <div className="brand">Quân đội số</div>
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-sand/70">Training Command</p>
      <div className="flex flex-col gap-1.5">
        {links[user.role].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${isActive ? "active" : ""} flex items-center justify-between text-sm`
            }
          >
            {item.label}
            <span className="h-1.5 w-1.5 rounded-full bg-sand/50" aria-hidden />
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
