import React, { createContext, useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const storedData = localStorage.getItem("todos");
    return storedData ? JSON.parse(storedData) : [];
  });
  console.log(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;
