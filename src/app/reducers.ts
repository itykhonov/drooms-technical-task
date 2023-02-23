import { ActionReducerMap } from '@ngrx/store';

import * as films from './pages/home-page/reducers';
import * as characters from './pages/character-details-page/reducers';

export interface AppState {
  films: films.State;
  characters: characters.State;
}

export const reducers: ActionReducerMap<AppState> = {
  films: films.reducer,
  characters: characters.reducer,
};
