import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { getNotLoadedFilms, isAllFilmsLoaded, selectFilmsByIds } from '../selectors';
import { FilmsActionTypes, IFilm, IFilmsResponse } from '../types';
import { of } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { FilmsService } from '../services';
import { dataAdapter, getIds } from 'src/app/helpers';
import { СharacterActionTypes } from '../../character-details-page/types';

@Injectable()
export class homePageEffects {
  getAllFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActionTypes.GET_ALL_FILMS_REQUEST),
      withLatestFrom(this._store.select(isAllFilmsLoaded)),
      switchMap(([_, isLoaded]) => {
        if (isLoaded) {
          return of({ type: FilmsActionTypes.ALL_FILMS_LOADED });
        }
        return this._filmsService.getAllFilms().pipe(
          map((filmsResponse: IFilmsResponse) => {
            const films = dataAdapter(filmsResponse.results);
            return ({ type: FilmsActionTypes.GET_ALL_FILMS_SUCCESS, films });
          })
        )
      }),
      catchError(() => of({ type: FilmsActionTypes.GET_ALL_FILMS_ERROR }))
    )
  );

  getFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FilmsActionTypes.GET_FILMS_REQUEST),
      switchMap(({ ids, shouldLoadCharactersData }) => this._store.select(getNotLoadedFilms(ids)).pipe(
        take(1),
        switchMap((notLoadedFilmIds: string[]) => {
          if (notLoadedFilmIds.length) {
            return this._filmsService.getFilms(notLoadedFilmIds).pipe(
              switchMap((filmResponse: IFilm[]) => {
                const film = dataAdapter(filmResponse);
                const actions = [];
                if (shouldLoadCharactersData) {
                  const idsForLoad = getIds(filmResponse[0].characters);
                  actions.push({ type: СharacterActionTypes.GET_CHARACTERS_REQUEST, ids: idsForLoad });
                }
                actions.push({ type: FilmsActionTypes.GET_FILMS_SUCCESS, film });
                return actions;
              }),
            )
          }
          if (shouldLoadCharactersData) {
            return this._store.select(selectFilmsByIds(ids)).pipe(
              take(1),
              switchMap((films: IFilm[]) => {
                const charactersUrls = films.map(film => film.characters).flat();
                const uniqueCharactersUrls = charactersUrls.filter(
                  (value, index, array) => array.indexOf(value) === index);
                const idsForLoad = getIds(uniqueCharactersUrls);
                return [
                  { type: СharacterActionTypes.GET_CHARACTERS_REQUEST, ids: idsForLoad },
                  { type: FilmsActionTypes.FILMS_LOADED }
                ];
              })
            )
          }
          return of({ type: FilmsActionTypes.FILMS_LOADED });
        })
      )),
      catchError(() => of({ type: FilmsActionTypes.GET_FILMS_ERROR }))
    )
  );

  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _filmsService: FilmsService
  ) { }
}
