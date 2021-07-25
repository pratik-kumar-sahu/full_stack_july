import { useContext, useEffect, useState } from "react";
import "./App.scss";
import ModalForm from "./components/ModalForm";
import Todo from "./components/Todo";
import { Toaster } from "react-hot-toast";
import { TodoContext } from "./stateHandling/TodoContext";

function App() {
  const [modal, setModal] = useState(false);
  const { todos } = useContext(TodoContext);

  const [todoArr, setTodoArr] = useState(todos);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTags, setFilterTags] = useState("");

  useEffect(() => {
    setTodoArr(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, setTodoArr, todos]);

  useEffect(() => {
    if (filterStatus) {
      setFilterTags("");
      setTodoArr(todos.filter((todo) => todo.status === filterStatus));
    } else {
      clearFilters();
    }
  }, [filterStatus, setTodoArr, todos]);

  useEffect(() => {
    if (filterTags) {
      setFilterStatus("");
      setTodoArr(todos.filter((todo) => todo.tags.includes(filterTags)));
    } else {
      clearFilters();
    }
  }, [filterTags, setTodoArr, todos]);

  const clearFilters = () => {
    setFilterStatus("");
    setFilterTags("");
    setSearch("");
    setTodoArr(todos);
  };

  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={true} />
      {modal ? (
        <ModalForm modal={modal} setModal={setModal} />
      ) : (
        <div className="app__container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: ".5rem",
            }}
          >
            <input
              className="app__container-search"
              type="search"
              placeholder="Search your tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="app__container-btn"
              onClick={() => setModal(true)}
            >
              <span style={{ fontSize: "1.6rem" }}>+</span> Add
            </button>
            <button
              style={{
                marginLeft: "1rem",
                display: `${filterStatus || filterTags ? "block" : "none"}`,
              }}
              className="app__container-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <select
              style={{ margin: "1rem" }}
              className="modal__container-input input2"
              name="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="" defaultValue>
                Filter by Status
              </option>
              <option value="backlog">Backlog</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              style={{ margin: "1rem" }}
              className="modal__container-input input2"
              name="status"
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
            >
              <option value="" defaultValue>
                Filter by Tags
              </option>
              <option value="Daily">Daily</option>
              <option value="Work">Work</option>
              <option value="Important">Important</option>
            </select>
          </div>

          <div className="app__container-todos">
            {todoArr.length < 1 ? (
              <div style={{ textAlign: "center" }}>No Tasks Found 🤔</div>
            ) : (
              todoArr.map((todo) => (
                <Todo key={todo._id} todo={todo} setModal={setModal} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
