import { Alert, Button, Form, Modal, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap"
import "./Register.css"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authService";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showContract, setShowContract] = useState(false);
    const [acceptedContract, setAcceptedContract] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        companyName: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async () => {
        setFieldErrors({});
        setSuccessMessage("");

        try {
            await register({
                companyName: form.companyName,
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
                acceptTerms: acceptedContract,
            });

            setSuccessMessage("Kayıt işlemi başarıyla tamamlandı 🎉");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            if (error.response?.status === 400 && error.response.data?.errors) {
                setFieldErrors(error.response.data.errors);
            } else {
                setFieldErrors({
                    general: ["Beklenmeyen bir hata oluştu."]
                });
            }
        }
    };

    const getPasswordStrength = (password) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    };


  return (
    <div className="register-page">
        <div className="register-header">
            <h1>Hesabınızı Oluşturun</h1>
            <p>
                E-fatura ve muhasebe süreçlerinizi tek panelden
                <strong> güvenle </strong>
                yönetmeye başlayın.
            </p>
        </div>

        {successMessage && (
            <Alert variant="success">
                {successMessage}
            </Alert>
        )}


        <div className="register-card">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Firma Adı</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Örn: ABC Teknoloji A.Ş."
                        value={form.companyName}
                        isInvalid={!!fieldErrors.CompanyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {fieldErrors.CompanyName?.[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ad Soyad</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Adınız soyadınız"
                        value={form.fullName}
                        isInvalid={!!fieldErrors.FullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {fieldErrors.FullName?.[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-Posta</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com" 
                        value={form.email}
                        isInvalid={!!fieldErrors.Email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {fieldErrors.Email?.[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Şifre{" "}
                        <span className="password-info">?</span>
                    </Form.Label>
                    <div className="password-wrapper">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Bir şifre girin"
                            value={form.password}
                            isInvalid={!!fieldErrors.Password}
                            onFocus={() => setShowPasswordTooltip(true)}
                            onBlur={() => setShowPasswordTooltip(false)}
                            onChange={(e) => {
                                const value = e.target.value;
                                setForm({ ...form, password: value });
                                setPasswordStrength(getPasswordStrength(value));
                            }}
                        />

                        <Overlay
                            target={document.querySelector(".password-info")}
                            show={
                                showPasswordTooltip &&
                                form.password &&
                                !fieldErrors.Password
                            }
                            placement="right"
                        >
                            {(props) => (
                                <Tooltip {...props}>
                                    <div style={{ textAlign: "left" }}>
                                        • En az 8 karakter<br />
                                        • En az 1 büyük harf<br />
                                        • En az 1 sayı<br />
                                        • En az 1 sembol
                                    </div>
                                </Tooltip>
                            )}
                        </Overlay>

                        {form.password && (
                            <div className="password-strength">
                                <div
                                className={`strength-bar strength-${passwordStrength}`}
                                />
                                <small className="strength-text">
                                    {passwordStrength === 0 && "Çok zayıf"}
                                    {passwordStrength === 1 && "Zayıf"}
                                    {passwordStrength === 2 && "Orta"}
                                    {passwordStrength === 3 && "Güçlü"}
                                    {passwordStrength === 4 && "Çok güçlü"}
                                </small>
                            </div>
                        )}

                        {!fieldErrors.Password && (
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        )}
                        
                        <Form.Control.Feedback type="invalid">
                            <ul className="mb-0 ps-3">
                                {fieldErrors.Password?.map((msg, i) => (
                                <li key={i}>{msg}</li>
                                ))}
                            </ul>
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Şifre Tekrar</Form.Label>
                    <div className="password-wrapper">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Şifrenizi tekrar girin"
                            value={form.confirmPassword}
                            isInvalid={!!fieldErrors.ConfirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />

                        {!fieldErrors.ConfirmPassword && (
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        )}

                        <Form.Control.Feedback type="invalid">
                            {fieldErrors.ConfirmPassword?.[0]}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 contract-group">
                    <Form.Check
                        isInvalid={!!fieldErrors.AcceptTerms}
                        feedback={fieldErrors.AcceptTerms?.[0]}
                        feedbackType="invalid"
                        type="checkbox"
                        id="contractCheck"
                        checked={acceptedContract}
                        onChange={() => setShowContract(true)}
                        label={
                            <span>
                                <span className="text-bold">Kullanım koşullarını</span> okudum ve kabul ediyorum
                            </span>
                        }
                    />
                </Form.Group>
                <div className="register-button">
                    <Button onClick={handleSubmit}>Hesap Oluştur</Button>
                </div>
            </Form>
        </div>

        <div className="have-account">
            <span>
                Zaten hesabınız var mı?{" "}
                <button className="text-bold" onClick={() => navigate("/")}>Giriş Yap</button>
            </span>
        </div>

        <Modal
            show={showContract}
            onHide={() => setShowContract(false)}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>KULLANIM KOŞULLARI VE HİZMET SÖZLEŞMESİ</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <span>
                    İşbu <strong>Kullanım Koşulları ve Hizmet Sözleşmesi</strong> (“Sözleşme”),<br />
                    [Uygulama Adı] (“Platform”) ile Platform’a kayıt olan kullanıcı (“Kullanıcı”) arasında, 
                    Platform’un kullanımına ilişkin şartları belirlemek amacıyla düzenlenmiştir.
                </span>
                <h5>1. Taraflar ve Tanımlar</h5>
                <span>
                    Bu sözleşmede;
                    <ul>
                        <li><strong>Platform:</strong> [Uygulama Adı] isimli e-fatura, muhasebe ve finans yönetim hizmetlerinin sunulduğu yazılım sistemini,</li>
                        <li><strong>Kullanıcı:</strong> Platform’a kayıt olan gerçek veya tüzel kişiyi,</li>
                        <li><strong>Hizmet:</strong> Platform üzerinden sunulan tüm dijital hizmetleri</li>
                    </ul>
                    ifade eder.
                </span>
                <h5>2. Sözleşmenin Konusu</h5>
                <span>
                    İşbu Sözleşme, Kullanıcı’nın Platform’a kayıt olması ve Platform üzerinden sunulan hizmetlerden faydalanmasına ilişkin hak ve yükümlülükleri düzenler.
                </span>
                <h5>3. Üyelik ve Hesap Güvenliği</h5>
                <ul>
                    <li>Kullanıcı, kayıt sırasında verdiği bilgilerin doğru, güncel ve eksiksiz olduğunu kabul eder.</li>
                    <li>
                        Kullanıcı, hesap bilgilerinin gizliliğinden ve güvenliğinden kendisi sorumludur.
                        Hesabın yetkisiz kullanımı sonucu doğabilecek zararlardan Platform sorumlu tutulamaz.
                    </li>
                    <li>Kullanıcı, hesabını üçüncü kişilerle paylaşamaz.</li>
                </ul>
                <h5>4. Hizmetin Kullanımı</h5>
                <ul>
                    <li>Platform, e-fatura, muhasebe ve finansal süreçlerin dijital ortamda yönetilmesini amaçlar.</li>
                    <li>Platform üzerinden yapılan işlemler, yürürlükteki mevzuata uygun olarak Kullanıcı sorumluluğunda gerçekleştirilir.</li>
                    <li>Platform, mevzuat değişiklikleri veya teknik gereklilikler doğrultusunda hizmet içeriğinde değişiklik yapma hakkını saklı tutar.</li>
                </ul>
                <h5>5. Kullanıcı Yükümlülükleri</h5>
                <span>
                    Kullanıcı;
                    <ul>
                        <li>Platform’u hukuka aykırı amaçlarla kullanmamayı,</li>
                        <li>Yanıltıcı, hatalı veya yasa dışı veri girmemeyi,</li>
                        <li>Platform’un güvenliğini tehdit edecek girişimlerde bulunmamayı</li>
                    </ul>
                    kabul ve taahhüt eder.
                </span>
                <h5>6. Fikri Mülkiyet Hakları</h5>
                <span>
                    Platform’a ait tüm yazılım, tasarım, logo, içerik ve dokümanlar [Uygulama Adı]’na aittir. <br />
                    Bu unsurlar, Platform’un yazılı izni olmaksızın kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
                </span>
                <h5>7. Kişisel Verilerin Korunması</h5>
                <ul>
                    <li>Kullanıcı’ya ait kişisel veriler, 6698 sayılı <strong>Kişisel Verilerin Korunması Kanunu (KVKK)</strong>’na uygun olarak işlenir ve saklanır.</li>
                    <li>Kişisel veriler, yalnızca hizmetin sunulması amacıyla ve yasal yükümlülükler kapsamında kullanılır.</li>
                </ul>
                <h5>8. Sorumluluğun Sınırlandırılması</h5>
                <span>
                    Platform;
                    <ul>
                        <li>Hizmetin kesintisiz veya hatasız olacağını garanti etmez,</li>
                        <li>Kullanıcı’nın Platform’u kullanımından doğabilecek dolaylı zararlardan sorumlu tutulamaz.</li>
                    </ul>
                </span>
                <h5>9. Sözleşmenin Feshi</h5>
                <span>
                    Kullanıcı, dilediği zaman hesabını kapatarak sözleşmeyi sona erdirebilir. <br />
                    Platform, Kullanıcı’nın sözleşmeye aykırı davranması halinde hesabı askıya alma veya sonlandırma hakkını saklı tutar.
                </span>
                <h5>10. Değişiklikler</h5>
                <span>
                    Platform, işbu Sözleşme’de değişiklik yapma hakkını saklı tutar. <br />
                    Değişiklikler, Platform üzerinden yayımlandığı tarihte yürürlüğe girer.
                </span>
                <h5>11. Yürürlülük ve Kabul</h5>
                <span>
                    Kullanıcı, Platform’a kayıt olarak işbu <strong>Kullanım Koşulları ve Hizmet Sözleşmesi</strong>’ni okuduğunu, anladığını ve tüm hükümlerini kabul ettiğini beyan eder.
                </span>
                <h5>12. Yetkili Mahkeme</h5>
                <span>
                    İşbu Sözleşme’den doğabilecek uyuşmazlıklarda <strong>Türkiye Cumhuriyeti Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
                </span><br />
                <span>
                    <strong>📌 Yürürlük Tarihi:</strong> ... / ... / 2025 <br />
                    <strong>📌 Platform:</strong> [Uygulama Adı]
                </span>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setAcceptedContract(false);
                        setShowContract(false);
                    }}
                >
                Vazgeç
                </Button>

                <Button
                variant="primary"
                onClick={() => {
                    setAcceptedContract(true);
                    setShowContract(false);
                }}
                >
                Onaylıyorum
                </Button>
            </Modal.Footer>
        </Modal>

    </div>

    
  )
}

export default Register
