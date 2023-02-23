import { createReducer, on } from '@ngrx/store';
import * as HomePageActions from '../actions';
import { IFilm } from '../types';

export interface State {
  loading: boolean;
  loaded: boolean;
  data: Record<string, IFilm>;
}

export const initialState: State = {
  data: {},
  loading: false,
  loaded: false
};

export const reducer = createReducer(
  initialState,
  on(HomePageActions.getAllFilmsRequest, state => ({ ...state, loading: true })),
  on(HomePageActions.allFilmsLoaded, state => ({ ...state, loading: false })),
  on(HomePageActions.getAllFilmsSuccess, (state, { films }) => ({ ...state, loading: false, loaded: true, data: films })),
  on(HomePageActions.getFilmsRequest, state => ({ ...state, loading: true })),
  on(HomePageActions.FilmsLoaded, state => ({ ...state, loading: false })),
  on(HomePageActions.getFilmsSuccess, (state, { film }) => ({ ...state, loading: false, data: { ...state.data, ...film } }))
);
