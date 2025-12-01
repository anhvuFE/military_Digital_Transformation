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
    <header className="topbar flex-wrap gap-3">
      <div className="flex items-center gap-3 flex-1">
        <button className="md:hidden btn secondary px-3 py-2" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-olive/10 ring-2 ring-olive/20" />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-olive">Training Ops Center</div>
            <div className="text-xs text-muted">Mệnh lệnh, tiến độ, kỷ luật</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {user && (
          <>
            <div className="leading-tight">
              <div className="font-semibold text-[15px]">{user.fullName}</div>
              <div className="text-[12px] text-muted">
                {user.rank} • {user.role}
              </div>
            </div>
            <span className="pill whitespace-nowrap px-3 py-1 text-xs uppercase">Đơn vị {user.unitId}</span>
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
