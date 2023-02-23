import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { getIds } from 'src/app/helpers';
import { AppState } from '../../reducers';
import { isCharacterStateLoadingSelector, selectCharactersByIds } from '../character-details-page/selectors';
import { ICharacter } from '../character-details-page/types';
import { getFilmsRequest } from '../home-page/actions';
import { getFilmById, isFilmsStateLoadingSelector } from '../home-page/selectors';
import { IFilm } from '../home-page/types';

@Component({
  selector: 'movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsPageComponent {
  private _filmId$!: Observable<string>;
  public film$!: Observable<IFilm>;
  public characters$!: Observable<ICharacter[]>;
  public isCharacterLoading$!: Observable<boolean>;
  public isFilmsLoading$!: Observable<boolean>;
  public constructor(
    private _store: Store<AppState>,
    private _activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._filmId$ = this._activatedRoute.params.pipe(
      map(({ id }) => id)
    );
    this._filmId$.pipe(
      tap((id: string) => this._store.dispatch(getFilmsRequest({ ids: [id], shouldLoadCharactersData: true })))
    ).subscribe();
    this.film$ = this._filmId$.pipe(
      switchMap(id => this._store.select(getFilmById(id)))
    );
    this.characters$ = this.film$.pipe(
      filter((film: IFilm) => !!film),
      map((film: IFilm) => getIds(film.characters)),
      switchMap((ids: string[]) => this._store.select(selectCharactersByIds(ids)))
    );
    this.isCharacterLoading$ = this._store.select(isCharacterStateLoadingSelector);
    this.isFilmsLoading$ = this._store.select(isFilmsStateLoadingSelector);
  }
}
