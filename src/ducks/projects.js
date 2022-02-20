// Action Constants
const SET_PROJECTS = 'docIt/projects/all';
const SET_PROJECT = 'docIt/projects/project';
const CREATE_DOCUMENT = 'docIt/documents/create';

const initialState = {
  projects: [],
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case SET_PROJECTS: 
      return { ...state, projects: action.payload };
    case SET_PROJECT:
      return { ...state, projects: state.projects.concat([action.payload])};
    case CREATE_DOCUMENT:
      const project = state.projects.find(project => project.id === action.payload.projectId)
      const newProject = { ...project, Documents: project.Documents.concat([action.payload.doc]) };
      const newProjects = state.projects
        .filter(project => project.id !== action.payload.projectId)
        .concat([newProject]);
      return { ...state, projects: newProjects};
    default:
      return state;
  }
}

// Action Creators
export function setProjects(projects) {
  return { type: SET_PROJECTS, payload: projects };
}

export function setProject(project) {
  return { type: SET_PROJECT, payload: project };
}

export function setDocument(payload) {
  return { type: CREATE_DOCUMENT, payload };
}

