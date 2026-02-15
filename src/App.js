import "./App.scss";
import { useState } from "react";
import { useEffect } from "react";
import Topbar from "./Topbar";
import Creature from "./Creature";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useContext } from "react";
import useLogout from "./hooks/useLogout";

function App() {
  return (
    <div className="App">
      <CardTable></CardTable>
    </div>
  );
}

function CardTable() {
  const [dayOpen, setDayOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const { logout } = useLogout();

  const user = state.user;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="App-header">
      <div className="padding-global">
        <div className="container">
          <a onClick={handleLogout} className="logout">
            log out
          </a>
          <Topbar
            journalOpen={journalOpen}
            setJournalOpen={setJournalOpen}
            dayOpen={dayOpen}
            setDayOpen={setDayOpen}
          ></Topbar>
          <div className="welcome-wrap">
            <h1>Hello, {user ? user.username : " you?"}</h1>
          </div>
        </div>
      </div>
      <Creature
        dayOpen={dayOpen}
        setDayOpen={setDayOpen}
        journalOpen={journalOpen}
        setJournalOpen={journalOpen}
      ></Creature>
    </header>
  );
}

export default App;
