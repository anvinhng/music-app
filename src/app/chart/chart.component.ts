import { Component, OnInit } from '@angular/core';
import { Song } from '../interface/music-list';
import data from '../../assets/data/music-list.json'
import { MusicService } from './../service/music.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  songList: any[] = data;
  rankingList: Song[] = this.songList.sort(function(a, b) {
    return a.rank - b.rank;
}).slice(0,100);

hideme: any = [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
  }
  openSong(url: string){
    let cSong = this.songList.find(x => x.url == url);
    this.musicService.fetchSong(cSong);
  }


}
