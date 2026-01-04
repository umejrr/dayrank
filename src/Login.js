const Login = () => {
  return (
    <div class="section-auth">
      <div class="padding-global">
        <div class="container">
          <div class="auth-form-wrap">
            <h1>Log in</h1>
            <form className="auth-form" action="">
              <input type="text" placeholder="USERNAME" />
              <input type="password" placeholder="PASSWORD" />
            </form>
            <p className="or-wrap">
              or <a href="/signup">Signup?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
