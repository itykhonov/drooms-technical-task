import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { State } from '../reducers';

export const selectFilmsData = (state: AppState) => state.films;

export const selectFilms = createSelector(
  selectFilmsData,
  (state: State) => Object.values(state.data)
);

export const isAllFilmsLoaded = createSelector(
  selectFilmsData,
  (state: State) => state.loaded
);

export const getFilmById = (id: string) => createSelector(
  selectFilmsData,
  (state: State) => state.data[id]
);

export const selectFilmsByIds = (ids: string[]) => createSelector(
  selectFilmsData,
  (state: State) => ids.map(id => state.data[id]).filter(film => !!film)
);

export const getNotLoadedFilms = (ids: string[]) => createSelector(
  selectFilmsData,
  (state: State) => ids.filter(id => !state.data[id])
);

export const isFilmsStateLoadingSelector = createSelector(
  selectFilmsData,
  (state: State) => state.loading
);
