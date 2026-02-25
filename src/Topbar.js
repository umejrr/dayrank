import journalCloseIcon from "./imgs/journal-close.svg";
import journalOpenIcon from "./imgs/journal-open.svg";
import dayOpenIcon from "./imgs/day-open.svg";
import dayCloseIcon from "./imgs/day-close.svg";
import dayOpenAudio from "./sounds/day-open.mp3";
import journalOpenAudio from "./sounds/journal-open.mp3";

const Topbar = ({ journalOpen, setJournalOpen, dayOpen, setDayOpen }) => {
  let dayAudio = new Audio(dayOpenAudio);
  let journalAudio = new Audio(journalOpenAudio);

  return (
    <div className="topbar">
      <div className="topbar-heading-wrap">
        <h2>LAST 10 DAYz</h2>
      </div>
      <div className="topbar-btns-wrap">
        {journalOpen ? (
          <a
            className="dialog-close"
            onClick={() => {
              setJournalOpen(false);
              journalAudio.play();
            }}
          >
            {<img src={journalCloseIcon} alt="" />}
          </a>
        ) : (
          <a
            onClick={() => {
              setJournalOpen(true);
              journalAudio.play();
            }}
            href="#"
            className="checklist"
          >
            {<img src={journalOpenIcon} alt="" />}
          </a>
        )}
        {dayOpen ? (
          <a
            className="dialog-close"
            onClick={() => {
              setDayOpen(false);
              dayAudio.play();
            }}
          >
            {<img src={dayCloseIcon} alt="" />}
          </a>
        ) : (
          <a
            onClick={() => {
              setDayOpen(true);
              dayAudio.play();
            }}
            className="new-day"
          >
            {<img src={dayOpenIcon} alt="" />}
          </a>
        )}
      </div>
    </div>
  );
};

export default Topbar;
