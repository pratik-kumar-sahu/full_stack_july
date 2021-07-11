export const todoReducer = (state, action) => {
  switch (action) {
    case "ADD_TODO":
      return { ...state, todo: action.payload };

    default:
      break;
  }
};
