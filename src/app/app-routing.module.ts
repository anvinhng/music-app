import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ChartComponent } from './chart/chart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

const routes: Routes = [
  {path:'', component: HomeComponent} ,
  {path:'category', component: CategoryComponent},
  {path:'favorite', component: FavoriteComponent},
  {path:'chart', component: ChartComponent},
  {path:'album-detail', component: AlbumDetailComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CategoryComponent, FavoriteComponent, ChartComponent, AlbumDetailComponent, PageNotFoundComponent]
