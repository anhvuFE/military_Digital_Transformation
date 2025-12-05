import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Button from "../common/Button";
import { useUiStore } from "@/store/uiStore";

function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar flex-wrap gap-2 sm:gap-3">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden btn secondary px-3 py-2" onClick={toggleSidebar}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-olive/10 ring-2 ring-olive/20" />
          <div className="hidden sm:block">
            <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-olive">Training Ops Center</div>
            <div className="text-[10px] sm:text-xs text-muted">Mệnh lệnh, tiến độ, kỷ luật</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {user && (
          <>
            <div className="leading-tight hidden sm:block">
              <div className="font-semibold text-sm sm:text-[15px]">{user.fullName}</div>
              <div className="text-[11px] sm:text-[12px] text-muted">
                {user.rank} • {user.role}
              </div>
            </div>
            <span className="pill whitespace-nowrap px-2 sm:px-3 py-1 text-[10px] sm:text-xs uppercase hidden sm:inline">Đơn vị {user.unitId}</span>
            <Button variant="ghost" className="px-3 py-2 text-sm" onClick={handleLogout}>
              Thoát
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Topbar;
