export enum FilmsActionTypes {
  GET_ALL_FILMS_REQUEST = '[HOME_PAGE] GET_ALL_FILMS_REQUEST',
  GET_ALL_FILMS_SUCCESS = '[HOME_PAGE] GET_ALL_FILMS_SUCCESS',
  GET_ALL_FILMS_ERROR = '[HOME_PAGE] GET_ALL_FILMS_ERROR',
  ALL_FILMS_LOADED = '[HOME_PAGE] ALL_FILMS_LOADED',

  GET_FILMS_REQUEST = '[MOVIE_DETAILS_PAGE] GET_FILMS_REQUEST',
  GET_FILMS_SUCCESS = '[MOVIE_DETAILS_PAGE] GET_FILMS_SUCCESS',
  GET_FILMS_ERROR = '[MOVIE_DETAILS_PAGE] GET_FILMS_ERROR',
  FILMS_LOADED = '[MOVIE_DETAILS_PAGE] FILMS_LOADED',
}

export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
  id?: string;
}

export interface IFilmsResponse {
  count: number;
  next: number;
  previous: number;
  results: IFilm[];
}
