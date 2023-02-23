import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { IFilm, IFilmsResponse } from "../types";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private _http: HttpClient) { }

  public getAllFilms(): Observable<IFilmsResponse> {
    return this._http.get<IFilmsResponse>('https://swapi.dev/api/films');
  }

  public getFilms(ids: string[]): Observable<IFilm[]> {
    return forkJoin(ids.map(id => this.getFilm(id)));
  }

  public getFilm(id: string): Observable<IFilm> {
    return this._http.get<IFilm>(`https://swapi.dev/api/films/${id}`);
  }
}
