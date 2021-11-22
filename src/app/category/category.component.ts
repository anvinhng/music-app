import { Component, OnInit } from '@angular/core';
import data from '../../assets/data/music-list.json'
import { MusicService } from './../service/music.service';
import { Song } from './../interface/music-list';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  hideme: any = [];
  songList: any[] = data;

  kpopList: Array<any> = data.filter(x => x.genre == "kpop").slice(0,8);
  vpopList: Array<any> = data.filter(x => x.genre == "vpop").slice(0,8);
  usukList: Array<any> = data.filter(x => x.genre == "usuk").slice(0,8);
  songInCategoryOrder = this.kpopList.concat(this.vpopList, this.usukList);

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
  }

  openSong(url: string){
    let cSong = this.songList.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
    this.musicService.receiveCurrentPlaylist(this.songInCategoryOrder);
  }

}
