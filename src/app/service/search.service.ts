import { Injectable } from '@angular/core';
import data from '../../assets/data/music-list.json'
import { Song } from 'src/app/interface/music-list';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // servSearchString: string = '';
  songList = data;
  searchResultList: any = [];

  constructor() { }

  getSearchString(str: string){
    localStorage.setItem('searchWord', str);
    console.log(str);
  }

  returnSearchSongArray(){
    let resultStr = localStorage.getItem('searchWord')!;
    let filterTitle = this.songList.filter(song => song.title.toLowerCase().startsWith(resultStr));
   
    let filterAlbum = this.songList.filter(song => song.album.toLowerCase().startsWith(resultStr));
    
    let filterArtist = this.songList.filter(song => song.artist.toLowerCase().startsWith(resultStr));
 
    this.searchResultList = filterArtist.concat(filterAlbum, filterTitle);


    return this.searchResultList;
  }

}


