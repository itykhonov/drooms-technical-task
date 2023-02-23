import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { getIds } from 'src/app/helpers';
import { AppState } from '../../reducers';
import { isFilmsStateLoadingSelector, selectFilmsByIds } from '../home-page/selectors';
import { IFilm } from '../home-page/types';
import { getCharactersRequest } from './actions';
import { getCharacterById, isCharacterStateLoadingSelector } from './selectors';
import { ICharacter } from './types';

@Component({
  selector: 'character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrls: ['./character-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsPageComponent {
  private _characterId$!: Observable<string>;
  public films$!: Observable<IFilm[]>;
  public character$!: Observable<ICharacter>;
  public isCharacterLoading$!: Observable<boolean>;
  public isFilmsLoading$!: Observable<boolean>;
  public constructor(
    private _store: Store<AppState>,
    private _activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._characterId$ = this._activatedRoute.params.pipe(
      map(({ id }) => id)
    );
    this._characterId$.pipe(
      tap((id: string) => this._store.dispatch(getCharactersRequest({ ids: [id], shouldLoadMoviesData: true })))
    ).subscribe();
    this.character$ = this._characterId$.pipe(
      switchMap(id => this._store.select(getCharacterById(id)))
    );
    this.films$ = this.character$.pipe(
      filter((character: ICharacter) => !!character),
      map((character: ICharacter) => getIds(character.films)),
      switchMap((ids: string[]) => this._store.select(selectFilmsByIds(ids)))
    );
    this.isCharacterLoading$ = this._store.select(isCharacterStateLoadingSelector);
    this.isFilmsLoading$ = this._store.select(isFilmsStateLoadingSelector);
  }
}
