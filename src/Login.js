import { useEffect, useState } from "react";
import openedEye from "./imgs/opened-eye.png";
import closedEye from "./imgs/closed-eye.png";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => setVisible(!visible);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/login/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.errors);
      return;
    }

    if (res.ok) {
      setUser({
        email: "",
        password: "",
      });
      setErrors({});
    }
  }

  return (
    <div class="section-auth">
      <div class="padding-global">
        <div class="container">
          <div class="auth-form-wrap">
            <h1>Log in</h1>
            <form className="auth-form" action="" onSubmit={handleLogin}>
              <div class="input-wrap">
                <input
                  id="login-email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  placeholder="EMAIL"
                />
                {errors.email && <p className="auth-error">{errors.email}</p>}
              </div>
              <div class="input-wrap">
                <input
                  id="login-pw"
                  value={user.password}
                  className={visible ? "password-on" : "pw-off"}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type={visible ? "text" : "password"}
                  placeholder="PASSWORD"
                />
                {errors.password && (
                  <p className="auth-error">{errors.password}</p>
                )}
                <button
                  className="show-pw"
                  onClick={handleVisibility}
                  type="button"
                >
                  <img src={visible ? openedEye : closedEye} />
                </button>
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                placeholder="sign up"
              />
            </form>
            <p className="or-wrap">
              or <a href="/signup">signup?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
