import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isForgot, setIsForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // 🔐 LOGIN FUNCTION (CONNECTED TO BACKEND)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      setError("");
      alert("Login successful");

      navigate("/watch");

    } catch (error) {
      console.error(error);
      setError("Error connecting to server");
    }
  };

  // 🔁 RESET PASSWORD (CONNECTED TO BACKEND)
  const handleResetPassword = async () => {
    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must contain uppercase, lowercase, number & special character"
      );
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();

      alert(data.message);
      setIsForgot(false);
      setNewPassword("");

    } catch (err) {
      console.log(err);
      alert("Error updating password");
    }
  };

  return (
    <div className="auth-page auth-bg">
      <div className="auth-overlay"></div>

      <div className="auth-card">
        {!isForgot ? (
          <>
            <h2>User Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button className="btn-primary" onClick={handleLogin}>
              Login
            </button>

            <p
              style={{
                cursor: "pointer",
                marginTop: "10px",
                color: "#ff4d4d",
              }}
              onClick={() => setIsForgot(true)}
            >
              Forgot Password?
            </p>

            <p className="auth-footer">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>

            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              className="btn-primary"
              onClick={handleResetPassword}
            >
              Update Password
            </button>

            <p
              style={{
                cursor: "pointer",
                marginTop: "10px",
                color: "#ff4d4d",
              }}
              onClick={() => setIsForgot(false)}
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;