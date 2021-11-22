import { MusicPlayerComponent } from './../music-player/music-player.component';
import { StreamState } from './../interface/stream-state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import * as moment from 'moment'

import data from '../../assets/data/music-list.json'
import { Song } from 'src/app/interface/music-list';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  curAudio = new Audio;
  constructor() {
    
  }

  ngOnInit(): void {}

  //Music Player

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

    currentSong: Song = {
      title: "Kuristic Music",
      artist: "By Vinh An",
      url: "",
      img: "",
      rank: 0,
      genre: "",
      album: ""
    };
    isPlay=false;
    newSongs = data;
    duration: string = '00:00';
    currentTime: string = '00:00';
    seek = 0;

    // openFile(){
    //   this.currentSong = this.songReceive();
    //   this.curAudio.pause();
    //   this.isPlay = false;
    // }

    fetchSong(audio: Song){
      this.currentSong.title = audio.title;
      this.currentSong.artist = audio.artist;
      this.currentSong.url = audio.url;
      this.currentSong.img = audio.img;
      this.curAudio.src = this.currentSong.url;
      console.log(this.currentSong);
      this.streamObserve(this.curAudio.src).subscribe(event => {});
      this.isPlay = true;
      localStorage.setItem('currentSong', JSON.stringify(this.currentSong));
    }

    // songReceive(){
    //   let s=localStorage.getItem('currentSong')
    //   if (s){
    //   return this.currentSong = JSON.parse(s);
    //   }
    // }

    streamObserve(url: string){
      return new Observable(observer => {
  
        this.curAudio.src = url;
        this.curAudio.load();
        this.curAudio.play();
        
        const handler = (event: Event) =>{
          this.seek = this.curAudio.currentTime;
          this.duration = this.timeFormat(this.curAudio.duration);
          this.currentTime = this.timeFormat(this.curAudio.currentTime);
        } 
  
        this.addEvent(this.curAudio, this.audioEvents, handler);
  
        return () =>{
          this.curAudio.pause();
          this.curAudio.currentTime = 0;
  
          this.removeEvent(this.curAudio, this.audioEvents, handler);
        }
      })
    }

  
    addEvent(object: any, events: any, handler: any){
      events.forEach((event: any) => {
        object.addEventListener(event, handler);
      })
    }
  
    setSeekTo(ev: any){
      this.curAudio.currentTime = ev.target.value;
    }
  
    removeEvent(object: any, events: any, handler: any) {
      events.forEach((event: any) => {
        object.removeEventListemer(event, handler);
      })
    }
  
    setVolume(ev: any){
      this.curAudio.volume = ev.target.value;
    }
  
    timeFormat(time: number, format="mm:ss"){
      const momentTime = time * 1000;
      return moment.utc(momentTime).format(format);
    }

    ngDoCheck(){
      let s = localStorage.getItem("currentSong");
      if (s){
        this.currentSong = JSON.parse(s);
      };
      this.curAudio.src = this.currentSong.url;
    }

    //Add Favorite Service
    song: any[] = [];
    favSongList : any[] = [];
    addFavSong(songAdd: any){
      this.song.push(songAdd);
      localStorage.setItem("favorite", JSON.stringify(this.song));
      console.log(songAdd);
    }

    getFavSong(){
      let s = localStorage.getItem("favorite");
      if (s) {
        this.favSongList = JSON.parse(s);
      } 
      return this.favSongList;
    }

    removeFavSong(url: any){
      let s = localStorage.getItem("favorite");
      if (s) {
        this.favSongList = JSON.parse(s);
      } else {
        this.favSongList = [];
      }
      let index = this.favSongList.findIndex(item => item.url == url);
      console.log(index);
      if (index > -1) {
      this.favSongList.splice(index, 1);
      }
      localStorage.setItem("favorite", JSON.stringify(this.favSongList));
      this.getFavSong();
    }


    //currentPlayList
    currentPlaylist: any = [];
    receiveCurrentPlaylist(list: any){
      this.currentPlaylist = list;
    }

    sendCurrentPlaylist(){
      return this.currentPlaylist;
    }

}
  