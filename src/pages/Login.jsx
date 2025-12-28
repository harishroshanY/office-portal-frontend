import { useState } from "react";
import { login } from "../services/authService";
import "../styles/login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await login(email, password);

    // save user session
    localStorage.setItem("user", JSON.stringify(response.data));

    // redirect to dashboard
    window.location.href = "/dashboard";

    const workRes = await fetch(
  `http://localhost:8080/work/start?email=${email}`,
  { method: "POST" }
);

const workLog = await workRes.json();
localStorage.setItem("workLogId", workLog.id);

  } catch (error) {
    alert("Login failed");
  }
};


  return (
  <div className="login-container">
    <div className="login-card">
      <h1>Office Work Portal</h1>
      <p>Login to continue</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <div className="footer-text">
        © 2025 Office Portal
      </div>
    </div>
  </div>
);

}



export default Login;
