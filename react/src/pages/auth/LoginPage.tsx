import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import "./auth.scss";

const LoginPage = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5174/auth/login", {
        nickname,
        password,
      });
      login(data.accessToken);
      navigate("/tasks");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login | Jose Pablo A. Fullstack Developer</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
