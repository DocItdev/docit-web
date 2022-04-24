// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_DOC_ID = 'docIt/documents/SET_DOC_ID';
const SET_EDITABLE = 'docIt/posts/SET_EDITABLE';
const SET_MEDIA_BLOB_URL = 'docIt/posts/SET_MEDIA_BLOB_URL';
const SET_MEDIA_TYPE = 'docIt/posts/SET_MEDIA_TYPE';

//state
const initialState = {
  userToken: '',
  selectedDocId: '',
  editable: false,
  videoBlobUrl: '',
  snipDataUri: '',
  mediaBlobUrl: '',
  mediaType:''
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
    case SET_MEDIA_BLOB_URL:
      return { ...state, mediaBlobUrl: action.payload };
    case SET_MEDIA_TYPE:
      return { ...state, mediaType: action.payload };
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

export function setMediaBlobUrl(blobUrl) {
  return { type: SET_MEDIA_BLOB_URL, payload: blobUrl };
}

export function setMediaType(mediaType) {
  return { type: SET_MEDIA_TYPE, payload: mediaType };
}