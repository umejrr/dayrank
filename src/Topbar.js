import journalCloseIcon from "./imgs/journal-close.svg";
import journalOpenIcon from "./imgs/journal-open.svg";
import dayOpenIcon from "./imgs/day-open.svg";
import dayCloseIcon from "./imgs/day-close.svg";

const Topbar = ({ journalOpen, setJournalOpen, dayOpen, setDayOpen }) => {
  return (
    <div className="topbar">
      <div className="topbar-heading-wrap">
        <h2>LAST 10 DAYz</h2>
      </div>
      <div className="topbar-btns-wrap">
        {journalOpen ? (
          <a className="dialog-close" onClick={() => setJournalOpen(false)}>
            {<img src={journalCloseIcon} alt="" />}
          </a>
        ) : (
          <a
            onClick={() => setJournalOpen(true)}
            href="#"
            className="checklist"
          >
            {<img src={journalOpenIcon} alt="" />}
          </a>
        )}
        {dayOpen ? (
          <a className="dialog-close" onClick={() => setDayOpen(false)}>
            {<img src={dayCloseIcon} alt="" />}
          </a>
        ) : (
          <a onClick={() => setDayOpen(true)} className="new-day">
            {<img src={dayOpenIcon} alt="" />}
          </a>
        )}
      </div>
    </div>
  );
};

export default Topbar;
