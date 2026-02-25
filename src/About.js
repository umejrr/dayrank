import addDayImg from "./imgs/about-add-day.png";
import howDoIuseDis from "./imgs/howdoiusedis-ab.svg";
import drippedOut from "./imgs/drippedout.svg";
import goldMoon from "./imgs/gold-moon.svg";
import goldSun from "./imgs/gold-sun.svg";
import silverMoon from "./imgs/silver-moon.svg";
import silverSun from "./imgs/silversun.svg";
import bronzeMoon from "./imgs/bronzemoon.svg";
import bronzeSun from "./imgs/bronze-sun.svg";
import journalArrow from "./imgs/journalarrow.svg";
import journalAbout from "./imgs/journalabout.svg";
import aboutFinal from "./imgs/about-final.svg";
import aboutFinalBtn from "./imgs/about-final-btn.svg";
import finalImgLeft from "./imgs/final-left.svg";
import finalImgRight from "./imgs/final-right.svg";

const About = () => {
  return (
    <div className="about-section">
      <div className="container">
        <h1>WELCOME TO DAYRANK</h1>
        <div className="about-intro-wrap">
          <h2>So how do you use it actually?</h2>
          <div className="about-intro-p-wrap">
            <p>Simple.</p>
            <p>Every day u rate ur morning and night.</p>
            <p>That's it. No 47-step productivity ritual. No monk mode.</p>
          </div>
        </div>
        <img className="add-day-img" src={addDayImg} alt="" />
        <div className="about-intro-wrap">
          <div className="about-intro-p-wrap bottom">
            <p>Just:</p>
            <p>- Did ur morning bang?</p>
            <p>- Did ur night flop?</p>
            <p>- Or was it mid lol?</p>
          </div>
          <div className="about-intro-p-wrap bottom">
            <p>Pick a tier.</p>
            <p>Gold. Silver. Bronze.</p>
            <p>Ur day gets ranked.</p>
            <p>Ur creature evolves.</p>
          </div>
        </div>

        <div className="about-intro-wrap right">
          <h2>What's going on here?</h2>
          <div className="about-intro-p-wrap right">
            <p>Morning + Night = Daily Score.</p>
            <p>You choose:</p>
            <p>🥇 Gold (u locked in fr)</p>
            <p>🥈 Silver (respectable effort)</p>
            <p>🥉 Bronze (we try again tomorrow)</p>
            <p>The average decides ur DayRank.</p>
            <p>It's not about perfection.</p>
            <p>It's about momentum.</p>
            <p>Stack enough good days and u'll literally see the difference.</p>
          </div>
        </div>
        <img src={howDoIuseDis} alt="" className="before-after-img" />
        <img src={drippedOut} alt="" className="before-after-img" />
        <div className="tier-cols">
          <div className="tier-wrap">
            <h3>Gold</h3>
            <img src={goldMoon} alt="" />
            <h3>3</h3>
            <img src={goldSun} alt="" />
            <p>
              Both morning AND night were elite. U did what u said u would.
              Respect.
            </p>
          </div>
          <div className="tier-wrap">
            <h3>Silver</h3>
            <img src={silverMoon} alt="" />
            <h3>{"3<"}</h3>
            <img src={silverSun} alt="" />
            <p>
              {
                "Solid effort. Not perfect, but not lazy either. Progress > perfection."
              }
            </p>
          </div>
          <div className="tier-wrap">
            <h3>Bronze</h3>
            <img src={bronzeMoon} alt="" />
            <h3>{"2<"}</h3>
            <img src={bronzeSun} alt="" />
            <p>We don't judge. We reset.Tomorrow is free.</p>
          </div>
        </div>
        <div className="about-intro-wrap journal">
          <img className="journal-arrow" src={journalArrow} alt="" />
          <h2>What about the journal?</h2>
          <div className="about-intro-p-wrap">
            <p>Each morning & night you can add tasks.</p>
            <p>Gold = must win.</p>
            <p>Silver = good to win.</p>
            <p>Bronze = nice if it happens.</p>
            <p>It's structured chaos.</p>
            <p>Your chaos.</p>
          </div>
        </div>
        <img src={journalAbout} alt="" className="journal-about-img" />
        <div class="why-this-works-wrap">
          <h2>Why this works</h2>
          <div class="why-this-text right">
            <p>Most apps try to control ur entire life.</p>
            <p>DayRank just makes u honest with urself.</p>
          </div>
          <div class="why-this-text left">
            <p>It’s daily feedback.</p>
            <p>Low friction.</p>
            <p>No cringe quotes.</p>
          </div>
          <div class="why-this-text right">
            <p>Just: “Did I show up today?”</p>
            <p>And the more u show up…</p>
            <p>
              the more ur little creature starts looking less depressed lol.
            </p>
          </div>
        </div>
        <img src={aboutFinal} className="about-final-img" alt="" />
        <div class="about-final-wrap">
          <h2>Final thing</h2>
          <div class="about-final-text">
            <p>This isn’t about being perfect.</p>
            <p>It’s about stacking days.</p>
          </div>
          <div class="about-final-text bottom">
            <p>One day = small.</p>
            <p>100 days = different human.</p>
            <p>So yeah.</p>
            <p>Sign up.</p>
            <p>Rank ur day.</p>
          </div>
        </div>
        <a href="/signup" className="final-btn-wrap">
          <img
            src={aboutFinalBtn}
            alt="Final About Image"
            className="about-final-btn"
          />
        </a>
      </div>
      <img
        src={finalImgLeft}
        alt="Final Left Image"
        className="final-img-left"
      />
      <img
        src={finalImgRight}
        alt="Final Right Image"
        className="final-img-right"
      />
    </div>
  );
};

export default About;
