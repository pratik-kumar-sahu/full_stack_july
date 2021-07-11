import { v4 as uuidv4 } from "uuid";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { ...action.payload, _id: uuidv4() }];

    case "DELETE_TODO":
      return state.filter((e) => e._id !== action.payload);

    case "EDIT_TODO":
      const foundId = action.payload.id;
      state = state.filter((item) => item._id !== foundId);
      return [...state, { ...action.payload.todo, _id: foundId }];

    default:
      return state;
  }
};
