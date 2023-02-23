import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { ICharacter } from "../types";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(private _http: HttpClient) { }

  public getCharacters(ids: string[]): Observable<ICharacter[]> {
    return forkJoin(ids.map(id => this.getCharacter(id)));
  }

  public getCharacter(id: string): Observable<ICharacter> {
    return this._http.get<ICharacter>(`https://swapi.dev/api/people/${id}`);
  }
}
