import { createStore } from 'redux';
import rootReducer from '../ducks';

const store = createStore(rootReducer);

export { store }
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch