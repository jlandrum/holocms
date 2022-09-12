import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import applicationState from './appState'

export const store = configureStore({
  reducer: { applicationState },
})

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector = <T,> (selector: (state: RootState) => T) => useSelector<RootState,T>(selector);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch