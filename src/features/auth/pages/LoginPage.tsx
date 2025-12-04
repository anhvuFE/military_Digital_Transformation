import LoginForm from "../components/LoginForm";
import { Shield, Users, Activity } from "lucide-react";

function LoginPage() {
  return (
    <div className="login-page relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-olive/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sand/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-olive/5 to-sand/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>

      <div className="login-card max-w-[520px] relative animate-fade-in-up">
        {/* Logo section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive to-forest rounded-2xl shadow-xl mb-4 animate-bounce-subtle">
            <Shield className="w-10 h-10 text-sand" strokeWidth={2.5} />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="badge bg-olive/20 border-olive/30 text-sand font-semibold">Huấn luyện số</span>
            <span className="text-sm text-sand/60">•</span>
            <span className="text-sm text-sand/60 font-medium">Chuyển đổi số quân sự</span>
          </div>
        </div>

        {/* Title section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-sand mb-3 text-center bg-gradient-to-r from-sand to-sand/80 bg-clip-text text-transparent" style={{ fontFamily: "'Lexend', sans-serif", letterSpacing: "-0.02em" }}>
            Chào mừng trở lại
          </h1>
          <p className="text-center text-sand/70 text-base leading-relaxed font-medium">
            Đăng nhập vào hệ thống để quản lý và theo dõi tiến độ huấn luyện số
          </p>
        </div>

        {/* Login form */}
        <LoginForm />

        {/* Features section */}
        <div className="mt-8 pt-6 border-t border-sand/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="group">
              <div className="flex flex-col items-center gap-2 transition-transform hover:scale-105">
                <Users className="w-5 h-5 text-sand/50 group-hover:text-sand/70 transition-colors" />
                <span className="text-xs text-sand/60 group-hover:text-sand/80 transition-colors font-medium">Đa vai trò</span>
              </div>
            </div>
            <div className="group">
              <div className="flex flex-col items-center gap-2 transition-transform hover:scale-105">
                <Shield className="w-5 h-5 text-sand/50 group-hover:text-sand/70 transition-colors" />
                <span className="text-xs text-sand/60 group-hover:text-sand/80 transition-colors font-medium">Bảo mật cao</span>
              </div>
            </div>
            <div className="group">
              <div className="flex flex-col items-center gap-2 transition-transform hover:scale-105">
                <Activity className="w-5 h-5 text-sand/50 group-hover:text-sand/70 transition-colors" />
                <span className="text-xs text-sand/60 group-hover:text-sand/80 transition-colors font-medium">Theo dõi real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-sand/40 font-medium">© 2024 Hệ thống Huấn luyện số - Bộ Quốc phòng</p>
      </div>
    </div>
  );
}

export default LoginPage;
