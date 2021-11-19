import { Component, OnInit } from '@angular/core';
import data from '../../assets/data/music-list.json'
import { MusicService } from './../service/music.service';
import { Song } from './../interface/music-list';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  songList: any[] = data;
  albumString: string = "Formula Of Love";
  albumList: Song[] = data.filter(song => song.album.toLowerCase() == this.albumString.toLowerCase());
  albumTitle = this.albumList[0].album;
  albumArtist = this.albumList[0].artist;
  albumImg = this.albumList[0].img;
  albumGenre = this.albumList[0].genre.toUpperCase();

  hideme: any = [];

  kpopList: Array<any> = data.filter(x => x.genre == "kpop").slice(0,8);
  vpopList: Array<any> = data.filter(x => x.genre == "vpop").slice(0,8);
  usukList: Array<any> = data.filter(x => x.genre == "usuk").slice(0,8);

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
  }

  openSong(url: string){
    let cSong = this.songList.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
  }

}
