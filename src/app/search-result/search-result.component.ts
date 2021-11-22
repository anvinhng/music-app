import { SearchService } from './../service/search.service';
import { Component, OnInit } from '@angular/core';
import { MusicService } from '../service/music.service';
import { Song } from 'src/app/interface/music-list';
import data from '../../assets/data/music-list.json';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchList: Song[] = [];
  songList: any[] = data;
  hideme: any = [];

  constructor(private searchService: SearchService, private musicService: MusicService, private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.searchList = this.searchService.returnSearchSongArray();
  }

  openSong(url: string){
    let cSong = this.songList.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
    this.musicService.receiveCurrentPlaylist(this.searchList);
  }

  addFavorite(url: any) {
    let songAdd = this.searchList.find(x=>x.url == url)
    this.musicService.addFavSong(songAdd);
    alert("You add a Song to Favorite!");
  }

  removeFavorite(url: any){
    this.musicService.removeFavSong(url);
    alert("You remove a Song from Favorite!")
  }

  addLocalStorage(status: string){
    localStorage.setItem("liked", status);
  }

  getLocalStorage(){
    localStorage.getItem("liked");
  }


}
