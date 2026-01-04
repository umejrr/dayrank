import Todo from "./Todo";
import { useRef } from "react";
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

  const inputRef = useRef();

  const addTodo = (tier, inputText, clearInput) => {
    if (inputText.trim() === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      tier,
    };
    setTodoList((prev) => [...prev, newTodo]);
    clearInput("");
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  return (
    <dialog open={journalOpen}>
      <div className="dialog-wrap">
        <h2>Add new JOURNAL</h2>
        <div class="journal-wrap">
          <img className="journal-bg" src={journalBg} />
          <div className="journal-content-wrap">
            <div class="journal-content-top">
              <a href="#">
                <img src={sunInactive} alt="" />
              </a>
              <h4>NIGHT</h4>

              <a href="#">
                <img src={moonInactive} alt="" />
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
