// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';

const initialState = {
  userToken: '',
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_TOKEN:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
}

// Action Creators
export function setToken(token) {
  return { type: SET_TOKEN, payload: token };
}