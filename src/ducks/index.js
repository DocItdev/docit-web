import { combineReducers } from 'redux';
import usersReducer from './users';
import projectsReducer from './projects';


export default combineReducers({
  users: usersReducer,
  projects: projectsReducer,
})