import { Link, Links } from "react-router";

const Landing = () => {
  return (
    <div class="section-landing">
      <div class="padding-global">
        <div class="container">
          <h1>WELCOME TO DAYRANK</h1>
          <div class="btns-wrap-landing">
            <Link to={"/login"} class="btn btn-primary">
              sign up
            </Link>
            <Link to={"/signup"} class="btn btn-primary">
              log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
