import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service'

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  constructor(private shared:SharingService) { }

  ngOnInit() {
  }

  goBack(){
    this.shared.toggleMenu.finance = false;
    this.shared.toggleMenu.profile = true;
  }
}
