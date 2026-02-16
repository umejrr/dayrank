import Todo from "./Todo";
import { useEffect, useRef } from "react";
import { useState } from "react";
import journalBg from "./imgs/journal-bg.png";
import sunActive from "./imgs/sun-active.svg";
import sunInactive from "./imgs/sun-inactive.svg";
import moonActive from "./imgs/moon-active.svg";
import moonInactive from "./imgs/moon-inactive.svg";

const JournalModal = ({ journalOpen }) => {
  const [todoList, setTodoList] = useState([]);

  const [goldText, setGoldText] = useState("");
  const [silverText, setSilverText] = useState("");
  const [bronzeText, setBronzeText] = useState("");

  const [isMorning, setIsMorning] = useState(true);

  const stored = JSON.parse(localStorage.getItem("user"));

  const token = stored?.token;

  const inputRef = useRef();

  const addTodo = async (tier, inputText, clearInput) => {
    if (inputText.trim() === "") {
      return;
    }

    let time = "";

    isMorning ? (time = "morning") : (time = "night");

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      tier,
      time,
    };

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    });

    let res = await fetch("/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return;
    }
    let data = await res.json();

    if (res.ok) {
      setTodoList(data);
    }

    clearInput("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await fetch("/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();

    if (res.ok) {
      setTodoList(data);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todoList.find((t) => t.id === id);
    let nextComplete = !todo.isComplete;

    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isComplete: nextComplete }),
    });

    const res = await fetch("/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();

    setTodoList(data);
  };

  useEffect(() => {
    if (!token) return;

    const getRes = async () => {
      const res = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("GET /api/todos failed:", res.status);
        return;
      }

      const data = await res.json();
      setTodoList(Array.isArray(data) ? data : []);
    };

    getRes();
  }, [token]);

  return (
    <dialog open={journalOpen}>
      <div className="dialog-wrap">
        <h2>Add new JOURNAL</h2>
        <div class="journal-wrap">
          <img className="journal-bg" src={journalBg} />
          <div className="journal-content-wrap">
            <div class="journal-content-top">
              <a href="#">
                <img
                  onClick={() => setIsMorning(true)}
                  src={isMorning ? sunActive : sunInactive}
                  alt=""
                />
              </a>
              {isMorning ? <h4>Morning</h4> : <h4>Night</h4>}

              <a href="#" onClick={() => setIsMorning(false)}>
                <img src={!isMorning ? moonActive : moonInactive} alt="" />
              </a>
              <div class="medium-line"></div>
            </div>

            <div class="journal-content-bottom">
              <div class="journal-tier">
                <h5>Gold</h5>
                <div class="journal-tier-add-wrap">
                  <input
                    ref={inputRef}
                    type="text"
                    onChange={(e) => setGoldText(e.target.value)}
                    value={goldText}
                    placeholder="add task"
                  />
                  <button
                    className="add-list-btn"
                    onClick={() => addTodo("gold", goldText, setGoldText)}
                  >
                    Add
                  </button>
                </div>

                <div className="task-list">
                  {todoList
                    .filter((t) => t.tier === "gold")
                    .filter((t) =>
                      isMorning ? t.time === "morning" : t.time === "night",
                    )
                    .map((item) => {
                      return (
                        <Todo
                          key={item.id}
                          id={item.id}
                          text={item.text}
                          isComplete={item.isComplete}
                          isDelete={deleteTodo}
                          toggleTodo={toggleTodo}
                        ></Todo>
                      );
                    })}
                </div>
              </div>

              <div class="journal-tier">
                <h5>Silver</h5>
                <div class="journal-tier-add-wrap">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="add task"
                    onChange={(e) => setSilverText(e.target.value)}
                    value={silverText}
                  />
                  <button
                    className="add-list-btn"
                    onClick={() => addTodo("silver", silverText, setSilverText)}
                  >
                    Add
                  </button>
                </div>

                <div className="task-list">
                  {todoList
                    .filter((t) =>
                      isMorning ? t.time === "morning" : t.time === "night",
                    )
                    .filter((t) => t.tier === "silver")
                    .map((item) => {
                      return (
                        <Todo
                          key={item.id}
                          id={item.id}
                          text={item.text}
                          isComplete={item.isComplete}
                          isDelete={deleteTodo}
                          toggleTodo={toggleTodo}
                        ></Todo>
                      );
                    })}
                </div>
              </div>

              <div class="journal-tier">
                <h5>Bronze</h5>
                <div class="journal-tier-add-wrap">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="add task"
                    onChange={(e) => setBronzeText(e.target.value)}
                    value={bronzeText}
                  />
                  <button
                    className="add-list-btn"
                    onClick={() => addTodo("bronze", bronzeText, setBronzeText)}
                  >
                    Add
                  </button>
                </div>

                <div className="task-list">
                  {todoList
                    .filter((t) =>
                      isMorning ? t.time === "morning" : t.time === "night",
                    )
                    .filter((t) => t.tier === "bronze")
                    .map((item) => {
                      return (
                        <Todo
                          key={item.id}
                          id={item.id}
                          text={item.text}
                          isComplete={item.isComplete}
                          isDelete={deleteTodo}
                          toggleTodo={toggleTodo}
                        ></Todo>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default JournalModal;
