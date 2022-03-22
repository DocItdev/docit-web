// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_DOC_ID = 'docIt/documents/SET_DOC_ID';
const SET_EDITABLE = 'docIt/posts/SET_EDITABLE';

//state
const initialState = {
  userToken: '',
  selectedDocId: '',
  editable: false,
};

//reducers
export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_TOKEN:
      return { ...state, userToken: action.payload };
    case SET_DOC_ID:
      return { ...state, selectedDocId: action.payload};
    case SET_EDITABLE:
      return { ...state, editable: action.payload };
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

export function setEditable(editable) {
  return { type: SET_EDITABLE, payload: editable };
}
