import { MusicService } from './../service/music.service';
import { Song } from 'src/app/interface/music-list';
import data from '../../assets/data/music-list.json';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  audioObj = new Audio();
  // currentSong!: Song;

  newSongs: any[] = data;

  hideme: any = [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {}

 

  openSong(url: string){
    let cSong = this.newSongs.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
  }

  addFavorite(url: any) {
    let songAdd = this.newSongs.find(x=>x.url = url)
    this.musicService.addFavSong(songAdd);
    alert("You add a Song to Favorite!")
  }

  removeFavorite(url: any){
    let songRemove = this.newSongs.find(x=>x.url = url)
    this.musicService.addFavSong(songRemove);
    alert("You remove a Song from Favorite!")
  }

}
