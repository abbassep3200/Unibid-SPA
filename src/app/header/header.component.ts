import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchItems } from '../models/service/searchItems.model';
import { MainServices } from '../_services/main.service';
import { Links } from 'src/app/links.component';
import { BasicUserInformation } from '../models/user/information/basic.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch: ElementRef;
  @ViewChild('searchToolbarSuggestion') searchToolbarSuggestion: ElementRef;
  searchItems: SearchItems;
  isLoggedIn = false;
  Link = Links;
  toggleProfile = false;
  userInfo:BasicUserInformation;

  constructor(private service: MainServices) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.isLoggedIn = true;
    }

    this.service.GetSearchItems().subscribe(result => {
      this.searchItems = result;
    },
    error => {
    });

    this.service.GetBasicInformation().subscribe(result => {
      this.userInfo = result;
    },
    error => {
    });

   }

  ngOnInit() {
  }

  searchBoxBehaviour(event) {
      this.searchToolbarSuggestion.nativeElement.classList.add('search-toolbar-suggestion-show');
  }

  searchItemClick(eventData) {
    this.txtSearch.nativeElement.value = eventData.target.textContent + ' ';
    this.txtSearch.nativeElement.focus();
    this.searchToolbarSuggestion.nativeElement.classList.remove('search-toolbar-suggestion-show');
  }
  toggleProfileMenu(){
    this.toggleProfile = !this.toggleProfile;
  }

}
