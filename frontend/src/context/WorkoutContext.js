import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      const id = action.payload;
      const index = state.workouts.findIndex((workout) => workout._id === id);
      const copy = [...state.workouts];
      copy.splice(index, 1);
      return {
        workouts: copy,
      };
    case 'UPDATE_WORKOUT':
      const workouts = state?.workouts?.filter(
        (workout) => workout._id !== action.payload._id
      );
      return {
        workouts: [action.payload, ...workouts],
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
