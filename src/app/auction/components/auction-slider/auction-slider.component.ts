import { Component, OnInit, Input } from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';
import { Links } from 'src/app/links.component';
import { LiveAuctionService } from 'src/app/_services/live-auction.service';

@Component({
  selector: 'app-auction-slider',
  templateUrl: './auction-slider.component.html',
  styleUrls: ['./auction-slider.component.css']
})
export class AuctionSliderComponent implements OnInit {
  @Input() auction: BaseAuction;
  Link = Links;
  status;

  constructor(private auctionSocket:LiveAuctionService) { }

  ngOnInit() {
    this.auctionSocket.status.subscribe(result => this.status = status)
  }

}
