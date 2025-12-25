import { Alert, Button, Form, Spinner } from "react-bootstrap"
import "./Login.css"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authService";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const response = await login({
                email,
                password
            });

            const { token } = response.data;

            localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "E-posta veya şifre hatalı"
            );
        } finally {
            setLoading (false);
        }
    }

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
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            <Form>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>E-Posta</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Şifre</Form.Label>
                    <div className="password-wrapper">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Şifreniz"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                    <Button disabled={loading} onClick={handleSubmit}>
                        {loading ? (
                            <>
                                <Spinner size="sm" /> Giriş Yapılıyor...
                            </>
                        ) : (
                            "Giriş Yap"
                        )}
                    </Button>
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