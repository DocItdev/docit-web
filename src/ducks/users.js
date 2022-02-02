// Action Constants
const SET_USER = 'docIt/users/SET_USER';

const initialState = {
  user: {},
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_USER: 
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Action Creators
export function setUser(user) {
  return { type: SET_USER, payload: user };
}