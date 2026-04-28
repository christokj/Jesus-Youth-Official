import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Reveal from "../../components/Reveal";
import { axiosInstance } from "../../config/axiosInstance";
import { consumeAdminSessionMessage, saveAdminSession } from "../../utils/adminAuth";

interface LoginForm {
  username: string;
  password: string;
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const pendingMessage = consumeAdminSessionMessage();

    if (pendingMessage) {
      toast.error(pendingMessage);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Username and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post<{ token: string; expiresAt: number }>("/admin/login", formData);
      saveAdminSession(response.data.token, response.data.expiresAt);
      toast.success("Admin login successful.");
      navigate("/admin-home");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Invalid credentials. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section shell section--tight">
      <Reveal className="page-header page-header--centered">
        <span className="eyebrow">Admin access</span>
        <h1>Login to the dashboard</h1>
        <p>Secure sign-in with the same refined theme, now styled fully with plain CSS.</p>
      </Reveal>

      <Reveal delay={120}>
        <form className="glass-panel auth-panel" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Admin username" />
          </label>
          <label className="field">
            <span>Password</span>
            <div className="field-password">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <button
                type="button"
                className="field-password__toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </Reveal>
    </section>
  );
}

export default AdminLoginPage;
