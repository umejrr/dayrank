import { Link, Links } from "react-router";
import howDoIuseDis from "./imgs/howdoiusedis.svg";

const Landing = () => {
  return (
    <div className="section-landing">
      <a href="/about" class="how-it-works-link">
        <img className="how-it-work-img" src={howDoIuseDis} alt="" />
      </a>
      <div className="padding-global">
        <div className="container">
          <h1>WELCOME TO DAYRANK</h1>
          <div className="btns-wrap-landing">
            <Link to={"/login"} class="btn btn-primary">
              log in
            </Link>
            <Link to={"/signup"} className="btn btn-primary">
              sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
