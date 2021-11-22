
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import "@angular/compiler";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AudioContextModule } from 'angular-audio-context';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MusicPlayerComponent,
    CategoryComponent,
    FavoriteComponent,
    ChartComponent,
    HomeComponent,
    AlbumDetailComponent,
    PageNotFoundComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AudioContextModule,
    CommonModule,
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
