import { MusicService } from './../service/music.service';
import { Component, OnInit } from '@angular/core';
import { Song } from '../interface/music-list';
import data from '../../assets/data/music-list.json'


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favSongList: any[] = [];
  songList: any[] = data;
  
  hideme: any = [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.favSongList = this.musicService.getFavSong();
  }

  ngOnCheck(){
    this.favSongList = this.musicService.getFavSong();
  }

  openSong(url: string){
    let cSong = this.favSongList.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
  }

  removeFavorite(url: any){
    let songRemove = this.songList.find(x=>x.url == url);
    this.musicService.removeFavSong(songRemove);
    alert("You remove a Song from Favorite!")
  }

}
