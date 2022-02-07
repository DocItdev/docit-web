// Action Constants
const SET_USER = 'docIt/users/SET_USER';
const SET_TOKEN = 'docIt/users/SET_TOKEN';

const initialState = {
  user: {},
  token: '',
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_USER: 
      return { ...state, user: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

// Action Creators
export function setUser(user) {
  return { type: SET_USER, payload: user };
}

export function setToken(token) {
  return { type: SET_TOKEN, payload: token };
}