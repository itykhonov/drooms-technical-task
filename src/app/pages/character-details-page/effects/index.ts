import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, switchMap, take } from 'rxjs/operators';
import { getNotLoadedCharacters, selectCharactersByIds } from '../selectors';
import { СharacterActionTypes, ICharacter } from '../types';
import { of } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { CharactersService } from '../services';
import { dataAdapter, getIds } from 'src/app/helpers';
import { FilmsActionTypes } from '../../home-page/types';

@Injectable()
export class characterDetailsPageEffects {
  getCharacters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(СharacterActionTypes.GET_CHARACTERS_REQUEST),
      switchMap(({ ids, shouldLoadMoviesData }) => this._store.select(getNotLoadedCharacters(ids)).pipe(
        take(1),
        switchMap(notLoadedIds => {
          if (notLoadedIds.length) {
            return this._charactersService.getCharacters(notLoadedIds).pipe(
              switchMap((charactersData: ICharacter[]) => {
                const actions = [];
                const characters = dataAdapter(charactersData);
                if (shouldLoadMoviesData) {
                  const idsForLoad = getIds(charactersData[0].films);
                  actions.push({ type: FilmsActionTypes.GET_FILMS_REQUEST, ids: idsForLoad });
                }
                actions.push({ type: СharacterActionTypes.GET_CHARACTERS_SUCCESS, characters });
                return actions;
              })
            )
          }
          if (shouldLoadMoviesData) {
            return this._store.select(selectCharactersByIds(ids)).pipe(
              take(1),
              switchMap((characters: ICharacter[]) => {
                const filmsUrls = characters.map(character => character.films).flat();
                const uniqueFilmsUrls = filmsUrls.filter(
                  (value, index, array) => array.indexOf(value) === index);
                const idsForLoad = getIds(uniqueFilmsUrls);
                return [
                  { type: FilmsActionTypes.GET_FILMS_REQUEST, ids: idsForLoad },
                  { type: СharacterActionTypes.CHARACTERS_LOADED }
                ];
              })
            )
          }
          return of({ type: СharacterActionTypes.CHARACTERS_LOADED });
        })
      )),
      catchError(() => of({ type: СharacterActionTypes.GET_CHARACTERS_ERROR }))
    )
  );

  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _charactersService: CharactersService
  ) { }
}
