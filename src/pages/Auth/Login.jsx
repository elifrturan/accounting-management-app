import { Button, Form } from "react-bootstrap"
import "./Login.css"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="login-page">
        <div className="login-header">
            <h1>E-Fatura Uygulamanıza Hoş Geldiniz</h1>
            <p>
                Fatura, muhasebe ve finans süreçlerinizi tek panelden
                <strong> güvenle </strong>
                yönetin.
            </p>
        </div>

        <div className="login-card">
            <Form>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>E-Posta</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Şifre</Form.Label>
                    <div className="password-wrapper">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Şifreniz"
                        />

                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </Form.Group>
                
                <div className="login-button">
                    <Button>Giriş Yap</Button>
                </div>
            </Form>
        </div>

        <div className="have-account">
            <span>
                Bir hesabınız yok mu?{" "}
                <button className="text-bold" onClick={() => navigate("/register")}>Hesap Oluştur</button>
            </span>
        </div>
    </div>
  )
}

export default Login
