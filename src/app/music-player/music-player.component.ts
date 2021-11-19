import { MusicService } from './../service/music.service';

import * as moment from 'moment'
import { Song } from './../interface/music-list';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import data from '../../assets/data/music-list.json'

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
    this.musicService.setVolume(ev)
  }

  timeFormat(time: number, format="mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }


  ngDoCheck(){
    // this.musicService.streamObserve(this.musicService.curAudio.src).subscribe(event => {});
    this.curSong = this.musicService.currentSong;
    this.isPlay = this.musicService.isPlay;
    this.musicService.streamObserve;
    this.secondDuration = this.musicService.curAudio.duration;
    this.duration = this.timeFormat(this.musicService.curAudio.duration);
    this.currentTime = this.timeFormat(this.musicService.curAudio.currentTime);
    
  }
}



