import React, { createContext, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  console.log(todos);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;
