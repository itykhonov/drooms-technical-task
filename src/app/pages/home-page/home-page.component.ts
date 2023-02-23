import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { getAllFilmsRequest } from './actions';
import { isFilmsStateLoadingSelector, selectFilms } from './selectors';
import { IFilm } from './types';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public films$!: Observable<IFilm[]>;
  public isFilmsLoading$!: Observable<boolean>;
  public constructor(private _store: Store<AppState>) { }

  public ngOnInit(): void {
    this._store.dispatch(getAllFilmsRequest());
    this.films$ = this._store.select(selectFilms);
    this.isFilmsLoading$ = this._store.select(isFilmsStateLoadingSelector);
  }
}
