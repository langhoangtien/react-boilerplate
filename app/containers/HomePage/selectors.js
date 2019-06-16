/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectHome = () =>
  createSelector(
    selectHome,
    home => home,
  );

export { selectHome, makeSelectUsername, makeSelectHome };
