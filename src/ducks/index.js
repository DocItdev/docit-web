// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_USER = 'docIt/users/SET_USER';
const SET_DOC_ID = 'docIt/documents/SET_DOC_ID';
const SET_EDITABLE = 'docIt/posts/SET_EDITABLE';
const SET_MEDIA_BLOB_URL = 'docIt/posts/SET_MEDIA_BLOB_URL';
const SET_MEDIA_TYPE = 'docIt/posts/SET_MEDIA_TYPE';
const SET_FILE_NAME = 'docIt/posts/SET_FILE_NAME';

//state
const initialState = {
  userToken: '',
  user: null,
  selectedDocId: '',
  editable: false,
  videoBlobUrl: '',
  snipDataUri: '',
  mediaBlobUrl: '',
  mediaType:'',
  fileName: undefined,
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
    case SET_FILE_NAME:
        return { ...state, fileName: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
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

export function setFileName(fileName) {
  return { type: SET_FILE_NAME, payload: fileName };
}

export function setUser(user) {
  return { type: SET_USER, payload: user };
}
