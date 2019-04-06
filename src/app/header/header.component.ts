import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch: ElementRef;
  @ViewChild('searchToolbarSuggestion') searchToolbarSuggestion: ElementRef;

  constructor() { }

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

}
