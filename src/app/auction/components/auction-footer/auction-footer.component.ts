import { Component, OnInit, Input } from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';

@Component({
  selector: 'app-auction-footer',
  templateUrl: './auction-footer.component.html',
  styleUrls: ['./auction-footer.component.css']
})
export class AuctionFooterComponent implements OnInit {
  @Input() auction: BaseAuction;
  constructor() { }

  ngOnInit() {
  }

}
