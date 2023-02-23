import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsPageComponent } from './pages/character-details-page/character-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'films/:id',
    component: MovieDetailsPageComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
