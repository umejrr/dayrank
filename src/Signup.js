import { useEffect, useState } from "react";
import openedEye from "./imgs/opened-eye.png";
import closedEye from "./imgs/closed-eye.png";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { dispatch, state } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const authUser = state.user;

  const navigate = useNavigate();

  const handleVisibility = () => setVisible(!visible);

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch("/signup/user", {
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
      navigate("/dashboard");

      dispatch({ type: "LOGIN", payload: data });

      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));
      setUser({
        username: "",
        email: "",
        password: "",
      });
      setErrors({});
    }
  }

  return (
    <div className="section-auth">
      <div className="padding-global">
        <div className="container">
          <div className="auth-form-wrap">
            <h1>Sign up</h1>
            <form className="auth-form" action="" onSubmit={handleSignup}>
              <div className="input-wrap">
                <input
                  id="signup-username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  type="text"
                  placeholder="USERNAME"
                />
                {errors.username && (
                  <p className="auth-error">{errors.username}</p>
                )}
              </div>
              <div className="input-wrap">
                <input
                  id="signup-email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  placeholder="EMAIL"
                />
                {errors.email && <p className="auth-error">{errors.email}</p>}
              </div>
              <div className="input-wrap">
                <input
                  id="signup-pw"
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
              or <a href="/login">login?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
