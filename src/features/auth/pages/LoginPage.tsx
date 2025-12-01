import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card max-w-[460px]">
        <div className="flex items-center justify-between mb-3">
          <p className="badge mb-0">Huấn luyện số</p>
          <span className="text-xs text-sand/70">Admin • Quân nhân</span>
        </div>
        <h2 className="mt-0 mb-2 text-3xl font-bold text-sand">Đăng nhập</h2>
        <p className="mb-4 text-sm text-sand/90">
          Truy cập dashboard theo vai trò Admin hoặc Quân nhân để xem kế hoạch, điểm và kết quả.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
