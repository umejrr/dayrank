import { useState, useRef } from "react";
import { useEffect } from "react";
import head from "./imgs/Frame 23.png";
import mouthBorder from "./imgs/Vector 7.png";
import inputBg from "./imgs/input-bg.png";
import body from "./imgs/body.png";
import "react-datepicker/dist/react-datepicker.css";
import JournalModal from "./JournalModal";
import DaysModal from "./DaysModal";
import eye from "./imgs/eye.png";
import goldTooth from "./imgs/gold-tooth.png";
import silverTooth from "./imgs/silver-tooth.png";
import bronzeTooth from "./imgs/bronze-tooth.png";

const Creature = ({ dayOpen, setDayOpen, journalOpen, setJournalOpen }) => {
  const [days, setDays] = useState([]);

  const eyeLeft = useRef(null);
  const eyeRight = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });

  function applyEyeTransform(el, mouseX, mouseY) {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouseX - cx;
    const dy = mouseY - cy;

    const rot = Math.atan2(dy, dx) * (180 / Math.PI);

    el.style.transform = `rotate(${rot}deg)`;
  }

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const { x, y } = mouse.current;
      applyEyeTransform(eyeLeft.current, x, y);
      applyEyeTransform(eyeRight.current, x, y);
    };

    const requestUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      requestUpdate();
    };

    const onScroll = () => {
      requestUpdate();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [newDays, setNewDays] = useState({
    date: "",
    morning: 0,
    night: 0,
    tier: "",
    score: 0,
  });
  const [startDate, setStartDate] = useState(new Date());

  const [morningValue, setMorningValue] = useState("");
  const [nightValue, setNightValue] = useState("");

  const stored = JSON.parse(localStorage.getItem("user"));
  const token = stored?.token;

  function handleChangeMorning(e) {
    setMorningValue(e.target.value);
    var scoreMornin = 0;
    switch (e.target.value) {
      case "Gold":
        scoreMornin = 3;
        break;
      case "Silver":
        scoreMornin = 2;
        break;
      case "Bronze":
        scoreMornin = 1;
        break;
    }

    setNewDays((prev) => ({ ...prev, morning: scoreMornin }));
  }

  function handleChangeNight(e) {
    setNightValue(e.target.value);
    var scoreNight = 0;

    switch (e.target.value) {
      case "Gold":
        scoreNight = 3;
        break;
      case "Silver":
        scoreNight = 2;
        break;
      case "Bronze":
        scoreNight = 1;
        break;
    }
    setNewDays((prev) => ({ ...prev, night: scoreNight }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let score = (newDays.morning + newDays.night) / 2;
    let tier = "";
    let bgImage = "";
    if (score === 3) {
      tier = "Gold";
      bgImage = goldTooth;
    } else if (score < 3 && score >= 2) {
      tier = "Silver";
      bgImage = silverTooth;
    } else {
      tier = "Bronze";
      bgImage = bronzeTooth;
    }

    const dayToSend = {
      score,
      tier,
      bgImage,
      date: Date.now(),
      morning: newDays.morning,
      night: newDays.night,
    };

    console.log(dayToSend);

    await fetch("/api/days", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dayToSend),
    });

    setDays([...days, dayToSend]);

    setNewDays({ date: "", morning: 0, night: 0, tier: "", score: 0 });
    setMorningValue("");
    setNightValue("");
    setDayOpen(false);
  }

  useEffect(() => {
    if (!token) return;

    const getRes = async () => {
      const res = await fetch("/api/days", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("GET /api/days failed:", res.status);
        return;
      }

      const data = await res.json();
      setDays(Array.isArray(data) ? data : []);
    };

    getRes();
  }, [token]);

  useEffect(() => {
    const cls = "modal-open";
    if (dayOpen || journalOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.classList.add(cls);
      document.body.classList.add(cls);
    } else {
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove(cls);
      document.body.classList.remove(cls);
    }
    return () => {
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove(cls);
      document.body.classList.remove(cls);
    };
  }, [dayOpen, journalOpen]);

  useEffect(() => {
    if (!dayOpen && !journalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setDayOpen(false);
        setJournalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dayOpen, journalOpen]);

  useEffect(() => {
    if (!token) return;

    const getRes = async () => {
      const res = await fetch("/api/days", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("GET /api/days flopped:", res.status);
        return;
      }

      const data = await res.json();
      setDays(Array.isArray(data) ? data : []);
    };

    getRes();
  }, [token]);

  return (
    <div className="card-table-wrap">
      <div className="padding-global">
        <div className="container">
          <div className="head-wrap">
            <div className="eye-wrap">
              <img className="eye left" ref={eyeLeft} src={eye} alt="" />
              <img className="eye right" ref={eyeRight} src={eye} alt="" />
            </div>
            <img className="head" src={head} alt="" />
          </div>
          <div className="mouth">
            <ul className="card-table">
              <img className="mouth-border" src={mouthBorder} alt="" />
              {days.slice(-8).map((day) => (
                <li
                  className="card"
                  key={day._id}
                  style={{ backgroundImage: `url(${day.bgImage})` }}
                >
                  <p>Date: {new Date(day.date).toLocaleDateString("en-GB")}</p>
                  <p>Tier: {day.tier}</p>
                  <p>Score: {day.score}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="body">
            <img src={body} />
          </div>
        </div>
      </div>

      <DaysModal
        dayOpen={dayOpen}
        handleSubmit={handleSubmit}
        morningValue={morningValue}
        handleChangeMorning={handleChangeMorning}
        nightValue={nightValue}
        handleChangeNight={handleChangeNight}
        startDate={startDate}
        setStartDate={setStartDate}
      ></DaysModal>

      <JournalModal journalOpen={journalOpen}></JournalModal>
    </div>
  );
};

export default Creature;
