import { createAction, props } from '@ngrx/store';
import { СharacterActionTypes, ICharacter } from '../types';

export const getCharactersRequest = createAction(
  СharacterActionTypes.GET_CHARACTERS_REQUEST,
  props<{ ids: string[], shouldLoadMoviesData?: boolean }>()
);

export const getCharactersSuccess = createAction(
  СharacterActionTypes.GET_CHARACTERS_SUCCESS,
  props<{ characters: Record<string, ICharacter> }>()
);

export const getCharactersError = createAction(
  СharacterActionTypes.GET_CHARACTERS_ERROR,
);

export const charactersLoaded = createAction(
  СharacterActionTypes.CHARACTERS_LOADED,
);
