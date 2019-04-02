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
    if (event.target.className === 'search-toolbar-list-item') {
     this.txtSearch.nativeElement.value = event.target.textContent;
     this.txtSearch.nativeElement.focus();
     this.searchToolbarSuggestion.nativeElement.classList.remove('search-toolbar-suggestion-show');
    }

      this.searchToolbarSuggestion.nativeElement.classList.add('search-toolbar-suggestion-show');
  }

}
