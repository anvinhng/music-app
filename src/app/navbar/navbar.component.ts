import { SearchService } from './../service/search.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interface/music-list';
import data from '../../assets/data/music-list.json';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: []
})
export class NavbarComponent implements OnInit {
  searchStr: string ='';
  filteredArray: any = [];
  displayItems: any = [];
  songList = data;
  titles: any = [];
  artists: any = [];
  albums: any = [];

  private history: string[] = []
  
  constructor( private searchService: SearchService, private location: Location, private router: Router,) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
   }

   //Previous - Next in History
   back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  ngOnInit(): void {
  }

  returnSearch(){
    if (this.searchStr != ''){
      console.log(this.searchStr);
      let filterAlbum = this.songList.filter(song => song.album.toLowerCase().startsWith(this.searchStr));
      let filterArtist = this.songList.filter(song => song.artist.toLowerCase().startsWith(this.searchStr));
      let filterTitle = this.songList.filter(song => song.title.toLowerCase().startsWith(this.searchStr));

      this.filteredArray = filterArtist.concat(filterAlbum, filterTitle);
      console.log(this.filteredArray);
      this.displayItems = this.filteredArray.title;
    }
    
}

  sendSearchString(string: string){
    this.searchService.getSearchString(string);
    this.searchStr = "";
  }
  

  
    
}

