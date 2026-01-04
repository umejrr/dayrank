const Login = () => {
  return (
    <div class="section-auth">
      <div class="padding-global">
        <div class="container">
          <div class="auth-form-wrap">
            <h1>Sign up</h1>
            <form className="auth-form" action="">
              <input type="text" placeholder="USERNAME" />
              <input type="email" placeholder="EMAIL" />
              <input type="password" placeholder="PASSWORD" />
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
