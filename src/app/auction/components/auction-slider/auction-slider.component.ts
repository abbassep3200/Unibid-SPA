import { Component, OnInit, Input } from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';

@Component({
  selector: 'app-auction-slider',
  templateUrl: './auction-slider.component.html',
  styleUrls: ['./auction-slider.component.css']
})
export class AuctionSliderComponent implements OnInit {
  @Input() auction: BaseAuction;

  constructor() { }

  ngOnInit() {
  }

}
