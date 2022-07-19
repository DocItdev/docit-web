import { AnyAction } from "redux";
import { UserType } from "../@types/User";
import { WorkspaceType } from "../@types/Workspace";

// Action Constants
const SET_TOKEN = 'docIt/users/SET_TOKEN';
const SET_USER = 'docIt/users/SET_USER';
const SET_WORKSPACE = 'docIt/workspaces/SET_WORKSPACE';
const SET_DOC_ID = 'docIt/documents/SET_DOC_ID';
const SET_EDITABLE = 'docIt/posts/SET_EDITABLE';
const SET_MEDIA_BLOB_URL = 'docIt/posts/SET_MEDIA_BLOB_URL';
const SET_MEDIA_TYPE = 'docIt/posts/SET_MEDIA_TYPE';
const SET_FILE_NAME = 'docIt/posts/SET_FILE_NAME';
const TOKEN_EXPIRE = 'docIt/users/SET_TOKEN_EXPIRE';

export interface AppState {
  userToken: string;
  user: UserType
  workspace: WorkspaceType,
  selectedDocId: string;
  editable: boolean;
  mediaBlobUrl: string;
  mediaType: string;
  fileName: string;
  tokenExpiresIn: number;
}

//state
const initialState: AppState = {
  userToken: '',
  user: null,
  workspace: null,
  selectedDocId: '',
  editable: false,
  mediaBlobUrl: '',
  mediaType:'',
  fileName: undefined,
  tokenExpiresIn: 0,
};

//reducers
export default function reducer(state = initialState, action: AnyAction) {
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
    case SET_WORKSPACE:
      return { ...state, workspace: action.payload };
    case TOKEN_EXPIRE:
      return { ...state, tokenExpiresIn: action.payload };
    default:
      return state;
  }
}

// Action Creators
export function setToken(token: string) {
  return { type: SET_TOKEN, payload: token };
}

export function setDocId(docId: string) {
  return { type: SET_DOC_ID, payload: docId };
}

export function setEditable(editable: boolean) {
  return { type: SET_EDITABLE, payload: editable };
}

export function setMediaBlobUrl(blobUrl: string) {
  return { type: SET_MEDIA_BLOB_URL, payload: blobUrl };
}

export function setMediaType(mediaType: string) {
  return { type: SET_MEDIA_TYPE, payload: mediaType };
}

export function setFileName(fileName: string) {
  return { type: SET_FILE_NAME, payload: fileName };
}

export function setUser(user: UserType) {
  return { type: SET_USER, payload: user };
}

export function setWorkspace(workspace: WorkspaceType) {
  return { type: SET_WORKSPACE, payload: workspace };
}

export function setTokenExpire(milliseconds: number) {
  return { type: TOKEN_EXPIRE, payload: milliseconds };
}
