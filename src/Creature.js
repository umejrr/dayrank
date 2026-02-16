import { useState } from "react";
import { useEffect } from "react";
import head from "./imgs/Frame 23.png";
import mouthBorder from "./imgs/Vector 7.png";
import inputBg from "./imgs/input-bg.png";
import body from "./imgs/body.png";
import "react-datepicker/dist/react-datepicker.css";
import JournalModal from "./JournalModal";
import DaysModal from "./DaysModal";

const Creature = ({ dayOpen, setDayOpen, journalOpen, setJournalOpen }) => {
  const [days, setDays] = useState([]);

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
    let bgColor = "";
    if (score === 3) {
      tier = "Gold";
      bgColor = "yellow";
    } else if (score < 3 && score >= 2) {
      tier = "Silver";
      bgColor = "gray";
    } else {
      tier = "Bronze";
      bgColor = "brown";
    }

    const dayToSend = {
      score,
      tier,
      bgColor,
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
          <img className="head" src={head} alt="" />
          <div className="mouth">
            <ul className="card-table">
              <img className="mouth-border" src={mouthBorder} alt="" />
              {days.slice(-8).map((day) => (
                <li
                  className="card"
                  key={day.id}
                  style={{ backgroundColor: day.bgColor }}
                >
                  <p>{new Date(day.date).toLocaleDateString("en-GB")}</p>
                  <p>{day.tier}</p>
                  <p>{day.score}</p>
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
