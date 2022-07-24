export const initialState = {
  accountId: null,
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accountId: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accountId: null,
      };
    default:
      return state;
  }
};

export default reducer;
