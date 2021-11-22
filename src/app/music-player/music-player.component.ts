import { MusicService } from './../service/music.service';

import * as moment from 'moment'
import { Song } from './../interface/music-list';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import data from '../../assets/data/music-list.json'
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  duration:string = "00:00";
  isPlay=this.musicService.isPlay;
  seek = 0;
  currentTime:string = "00:00";
  secondDuration: number = 0;
  curSong: Song = {
    title: this.musicService.currentSong.title,
    artist: this.musicService.currentSong.artist,
    url: "",
    img: "",
    rank: 0,
    genre: "",
    album: ""
  };

  
 
  

  constructor(private musicService: MusicService ) { }
  
  ngOnInit(): void {
    this.curSong.title = this.musicService.currentSong.title;
    this.curSong.artist = this.musicService.currentSong.artist;
  }

  playOrPause(){
    if(this.musicService.isPlay==true){
      this.musicService.curAudio.pause();
      this.musicService.isPlay = false;
      this.isPlay = this.musicService.isPlay;
    } else {
      this.musicService.curAudio.play();
      this.musicService.isPlay = true;
      this.isPlay = this.musicService.isPlay;
    }
  
  }

  setSeekTo(ev: any){
    this.musicService.curAudio.currentTime = ev.target.value;
    
  }

  setVolume(ev: any){
    this.musicService.setVolume(ev);
  }

  timeFormat(time: number, format="mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }




  ngDoCheck(){
    // this.curSong = this.musicService.currentSong;
    let s = localStorage.getItem("currentSong");
    if(s){
      this.curSong= JSON.parse(s);
    };
    this.isPlay = this.musicService.isPlay;
    this.musicService.streamObserve(this.musicService.currentSong.url);
    this.musicService.streamObserve(this.curSong.url);
    this.secondDuration = this.musicService.curAudio.duration;
    this.duration = this.timeFormat(this.musicService.curAudio.duration);
    this.currentTime = this.timeFormat(this.musicService.curAudio.currentTime);
    this.seek = this.musicService.curAudio.currentTime;
    // this.musicService.curAudio.src = this.musicService.currentSong.url;
  }


  // Volume
  volumeIsOn: any = [];


  //Next - Previous

  nextSong(){
    let currentPlaylist: any[] = this.musicService.sendCurrentPlaylist();
    let currentPlayListSong = currentPlaylist.find(x => x.url == this.curSong.url)
    let i = currentPlaylist.indexOf(currentPlayListSong);
    if (i == currentPlaylist.length-1){
      this.musicService.fetchSong(currentPlaylist[0]);
    } else { this.musicService.fetchSong(currentPlaylist[i+1]) }
  }

  previousSong(){
    let currentPlaylist: any[] = this.musicService.sendCurrentPlaylist();
    let currentPlayListSong = currentPlaylist.find(x => x.url == this.curSong.url)
    let i = currentPlaylist.indexOf(currentPlayListSong);
    if (i == 0){
      let lastIndex = currentPlaylist.length-1
      this.musicService.fetchSong(currentPlaylist[lastIndex]);
    } else { this.musicService.fetchSong(currentPlaylist[i-1]) }
  }
}



