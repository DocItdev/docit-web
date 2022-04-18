// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_DOC_ID = 'docIt/documents/SET_DOC_ID';
const SET_EDITABLE = 'docIt/posts/SET_EDITABLE';
const SET_VIDEO_URL = 'docIt/posts/SET_VIDEO_URL';
const SET_SNIP_DATA_URI = 'docIt/posts/SET_SNIP_DATA_URI';

//state
const initialState = {
  userToken: '',
  selectedDocId: '',
  editable: false,
  videoBlobUrl: '',
  snipDataUri: '',
};

//reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, userToken: action.payload };
    case SET_DOC_ID:
      return { ...state, selectedDocId: action.payload };
    case SET_EDITABLE:
      return { ...state, editable: action.payload };
    case SET_VIDEO_URL:
      return { ...state, videoBlobUrl: action.payload };
    case SET_SNIP_DATA_URI:
      return { ...state, snipDataUri: action.payload };
    default:
      return state;
  }
}

// Action Creators
export function setToken(token) {
  return { type: SET_TOKEN, payload: token };
}

export function setDocId(docId) {
  return { type: SET_DOC_ID, payload: docId };
}

export function setEditable(editable) {
  return { type: SET_EDITABLE, payload: editable };
}

export function setVideoBlobUrl(videoUrl) {
  return { type: SET_VIDEO_URL, payload: videoUrl };
}

export function setSnipDataUri(snipUri) {
  return { type: SET_SNIP_DATA_URI, payload: snipUri };
}