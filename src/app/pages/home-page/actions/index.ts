import { createAction, props } from '@ngrx/store';
import { FilmsActionTypes, IFilm } from '../types';

export const getAllFilmsRequest = createAction(
  FilmsActionTypes.GET_ALL_FILMS_REQUEST,
);

export const getAllFilmsSuccess = createAction(
  FilmsActionTypes.GET_ALL_FILMS_SUCCESS,
  props<{ films: Record<string, IFilm> }>()
);

export const getAllFilmsError = createAction(
  FilmsActionTypes.GET_ALL_FILMS_ERROR,
);

export const allFilmsLoaded = createAction(
  FilmsActionTypes.ALL_FILMS_LOADED,
);

export const getFilmsRequest = createAction(
  FilmsActionTypes.GET_FILMS_REQUEST,
  props<{ ids: string[], shouldLoadCharactersData?: boolean }>()
);

export const getFilmsSuccess = createAction(
  FilmsActionTypes.GET_FILMS_SUCCESS,
  props<{ film: Record<string, IFilm> }>()
);

export const getFilmsError = createAction(
  FilmsActionTypes.GET_FILMS_ERROR,
);

export const FilmsLoaded = createAction(
  FilmsActionTypes.FILMS_LOADED,
);
