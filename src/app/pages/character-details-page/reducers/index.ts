import { createReducer, on } from '@ngrx/store';
import * as HomePageActions from '../actions';
import { ICharacter } from '../types';

export interface State {
  loading: boolean;
  data: Record<string, ICharacter>;
}

export const initialState: State = {
  data: {},
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(HomePageActions.getCharactersRequest, state => ({ ...state, loading: true })),
  on(HomePageActions.charactersLoaded, state => ({ ...state, loading: false })),
  on(HomePageActions.getCharactersSuccess, (state, { characters }) => ({ ...state, loading: false, data: { ...state.data, ...characters } })),
);
