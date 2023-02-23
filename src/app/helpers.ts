import { ICharacter } from "./pages/character-details-page/types";
import { IFilm } from "./pages/home-page/types";

export type DataType = IFilm | ICharacter;

export const getIdFromUrl = (url: string) => {
  const urlParamsArray = url.split('/');
  return urlParamsArray[urlParamsArray.length - 2];
};

export const dataAdapter = (filmData: DataType[]): Record<string, DataType> =>
  filmData.reduce((acc: Record<string, DataType>, next: DataType) => {
    const id = getIdFromUrl(next.url);
    if (!acc[id]) {
      acc[id] = {
        ...next,
        id
      };
    }
    return acc;
  }, {})

export const getIds = (urls: string[]) => urls.map(url => getIdFromUrl(url));
