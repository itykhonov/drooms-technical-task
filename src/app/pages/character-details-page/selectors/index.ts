import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { State } from '../reducers';

export const selectCharactersData = (state: AppState) => state.characters;

export const selectCharactersByIds = (ids: string[]) => createSelector(
  selectCharactersData,
  (state: State) => ids.map(id => state.data[id]).filter(ch => !!ch)
);

export const getNotLoadedCharacters = (ids: string[]) => createSelector(
  selectCharactersData,
  (state: State) => ids.filter(id => !state.data[id])
);

export const getCharacterById = (id: string) => createSelector(
  selectCharactersData,
  (state: State) => state.data[id]
);

export const isCharacterStateLoadingSelector = createSelector(
  selectCharactersData,
  (state: State) => state.loading
);
