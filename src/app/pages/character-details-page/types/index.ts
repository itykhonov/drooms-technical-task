export enum СharacterActionTypes {
  GET_CHARACTERS_REQUEST = '[MOVIE_DETAILS_PAGE] GET_CHARACTERS_REQUEST',
  GET_CHARACTERS_SUCCESS = '[MOVIE_DETAILS_PAGE] GET_CHARACTERS_SUCCESS',
  GET_CHARACTERS_ERROR = '[MOVIE_DETAILS_PAGE] GET_CHARACTERS_ERROR',
  CHARACTERS_LOADED = '[MOVIE_DETAILS_PAGE] CHARACTERS_LOADED'
}

export interface ICharacter {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  id?: string;
}
