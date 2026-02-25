import tick from "./imgs/tick.svg";
import untick from "./imgs/untick.svg";

const Todo = ({ text, id, isComplete, isDelete, toggleTodo }) => {
  return (
    <div onClick={() => toggleTodo(id)} className="task">
      <img src={!isComplete ? tick : untick} />
      <p className={`${isComplete ? "todo-checked" : ""}`}>{text}</p>
      <button onClick={() => isDelete(id)} className="clear-task">
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.71875 1.47876C2.43469 2.75261 3.39008 3.71039 4.62682 5.06446C6.34245 6.66276 7.78152 7.85999 8.61599 8.77467C9.13439 9.29427 9.84554 9.92641 10.5782 10.5777"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9.8595 1C6.35401 4.26365 4.59648 6.34443 3.75722 7.57877C3.08318 8.57128 2.36005 9.37821 1.80214 9.89541C1.5603 10.1756 1.40227 10.4916 1 11.0567"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
