import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    const getRes = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    console.log(getRes);
  }

  return (
    <div class="section-auth">
      <div class="padding-global">
        <div class="container">
          <div class="auth-form-wrap">
            <h1>Sign up</h1>
            <form className="auth-form" action="" onSubmit={handleLogin}>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                placeholder="USERNAME"
              />
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="EMAIL"
              />
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="PASSWORD"
              />
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

export default Login;
