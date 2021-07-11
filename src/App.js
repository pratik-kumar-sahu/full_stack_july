import { useState } from "react";
import "./App.scss";
import ModalForm from "./components/ModalForm";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="app">
      {modal && <ModalForm setModal={setModal} />}
      <button onClick={() => setModal(true)}>Add Task</button>
    </div>
  );
}

export default App;
