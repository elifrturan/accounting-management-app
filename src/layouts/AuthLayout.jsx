import { Outlet } from "react-router-dom";
import "../assets/styles/AuthLayout.css";

export default function AuthLayout() {
  return (
    <div className="auth-root">
      <div className="auth-brand d-lg-flex flex-column d-none">
        <img src="/src/assets/images/logo.svg" alt="Logo" />
      </div>

      <div className="auth-bg-image d-lg-flex d-none">
        <img
          src="/src/assets/images/login-visual.svg"
          alt="Background"
        />
      </div>

      <div className="auth-center">
        <Outlet />
      </div>
    </div>
  );
}
