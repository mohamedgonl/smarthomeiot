import { useReducer } from 'react';
import Context from './Context';
import reducer, { initialState } from './reducer';

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};
