import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { User, Lock, AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";

function LoginForm() {
  const [serviceNumber, setServiceNumber] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(serviceNumber, password);
    if (useAuthStore.getState().user) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Service Number Field */}
      <div className="relative group">
        <label className="block text-sand/90 text-sm font-semibold mb-2" style={{ letterSpacing: "0.025em" }}>
          Mã quân nhân
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User
              className={`w-5 h-5 transition-colors ${
                focusedField === 'serviceNumber' ? 'text-sand' : 'text-sand/30'
              }`}
            />
          </div>
          <input
            type="text"
            value={serviceNumber}
            onChange={(e) => setServiceNumber(e.target.value)}
            onFocus={() => setFocusedField('serviceNumber')}
            onBlur={() => setFocusedField(null)}
            placeholder="Nhập mã quân nhân của bạn"
            className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-sand/20 rounded-xl text-sand placeholder-sand/40 focus:bg-white/15 focus:border-sand/40 focus:ring-2 focus:ring-sand/20 transition-all duration-200 text-base font-medium"
            required
          />
        </div>
        <span className="text-sm text-sand/50 mt-1.5 block font-normal">VD: admin hoặc soldier</span>
      </div>

      {/* Password Field */}
      <div className="relative group">
        <label className="block text-sand/90 text-sm font-semibold mb-2" style={{ letterSpacing: "0.025em" }}>
          Mật khẩu
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock
              className={`w-5 h-5 transition-colors ${
                focusedField === 'password' ? 'text-sand' : 'text-sand/30'
              }`}
            />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            placeholder="Nhập mật khẩu của bạn"
            className="w-full pl-11 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border border-sand/20 rounded-xl text-sand placeholder-sand/40 focus:bg-white/15 focus:border-sand/40 focus:ring-2 focus:ring-sand/20 transition-all duration-200 text-base font-medium"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sand/40 hover:text-sand/60 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-xl animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 font-medium">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full relative overflow-hidden bg-gradient-to-r from-olive to-forest hover:from-forest hover:to-olive text-sand font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang xử lý...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Đăng nhập
            </>
          )}
        </span>
        {!loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-sand/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </Button>

    </form>
  );
}

export default LoginForm;
