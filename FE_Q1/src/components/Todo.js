import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoContext } from "../stateHandling/TodoContext";

toast.configure();

function Todo({ todo, setModal }) {
  const { title, description, date, color, status } = todo;
  const { dispatch } = useContext(TodoContext);
  const [hover, setHover] = useState(false);

  const editTodo = (id) => {
    setModal(id);
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch({ type: "DELETE_TODO", payload: id });
      toast.success("Task Deleted", { autoClose: 3000 });
    }
  };

  return (
    <div
      className="todo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover(true)}
    >
      <div
        style={{
          borderLeft: `5px solid ${color}`,
        }}
        className="todo__content"
      >
        <div style={{ marginLeft: "1rem" }}>
          <h3 style={{ color: "white" }}>{title}</h3>
          <p style={{ color: "var(--grey-light)" }}>{description}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <p className="todo__content-date">{date}</p>
            <p className="todo__content-status">{status}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              cursor: "pointer",
              marginBottom: "1rem",
              padding: ".2rem",
              borderRadius: ".3rem",
              borderStyle: "none",
              outlineStyle: "none",
              display: `${hover ? "block" : "none"}`,
            }}
            onClick={() => editTodo(todo._id)}
          >
            ✍🏻
          </button>
          <button
            style={{
              cursor: "pointer",
              borderRadius: ".3rem",
              padding: ".2rem",
              borderStyle: "none",
              outlineStyle: "none",
              display: `${hover ? "block" : "none"}`,
            }}
            onClick={() => deleteTodo(todo._id)}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
