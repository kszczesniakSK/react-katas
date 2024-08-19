import { createSelector } from 'reselect';
import { RootState } from './store';


const selectUser = (state: RootState) => state.user;

export const selectUserName = createSelector(
  selectUser,
  (user) => user.name
);

export const selectUserAge = createSelector(
  selectUser,
  (user) => user.age
);