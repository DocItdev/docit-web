// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_DOC_ID = 'SET_DOC_ID';

//state
const initialState = {
  userToken: '',
  selectedDocId: "select document"
};

//reducers
export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_TOKEN:
      return { ...state, userToken: action.payload };
    case SET_DOC_ID:
      return { ...state, selectedDocId: action.payload};
    default:
      return state;
  }
}

// Action Creators
export function setToken(token) {
  return { type: SET_TOKEN, payload: token };
}

export function setDocId(docId){
  return { type: SET_DOC_ID, payload: docId};
}