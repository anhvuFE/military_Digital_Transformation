import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

function LoginForm() {
  const [serviceNumber, setServiceNumber] = useState("admin");
  const [password, setPassword] = useState("123456");
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
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label>Mã quân nhân</label>
        <input value={serviceNumber} onChange={(e) => setServiceNumber(e.target.value)} placeholder="VD: admin hoặc soldier" />
      </div>
      <div>
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập 123456 để demo" />
      </div>
      {error && <p style={{ color: "#d64545" }}>{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
      <p style={{ color: "var(--color-muted)", margin: 0 }}>Tài khoản demo: admin/soldier - mật khẩu 123456</p>
    </form>
  );
}

export default LoginForm;
