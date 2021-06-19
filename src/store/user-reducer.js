const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.user,
      };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user,
    });
  };
};
export const updateUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_USER,
      user,
    });
  };
};
export const clearUser = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_USER,
    });
  };
};
