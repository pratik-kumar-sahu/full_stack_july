import { useContext, useState } from "react";
import "./App.scss";
import ModalForm from "./components/ModalForm";
import Todo from "./components/Todo";
import { TodoContext } from "./stateHandling/TodoContext";

function App() {
  const [modal, setModal] = useState(false);
  const { todos } = useContext(TodoContext);

  return (
    <div className="app">
      {modal ? (
        <ModalForm modal={modal} setModal={setModal} />
      ) : (
        <div className="app__container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <input
              className="app__container-search"
              type="search"
              placeholder="Search your tasks..."
            />
            <button
              className="app__container-btn"
              onClick={() => setModal(true)}
            >
              <span style={{ fontSize: "1.6rem" }}>+</span> Add
            </button>
          </div>

          <div className="app__container-todos">
            {todos.map((todo) => (
              <Todo key={todo._id} todo={todo} setModal={setModal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
