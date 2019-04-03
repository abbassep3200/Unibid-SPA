import { Component, OnInit, Input } from '@angular/core';
import { MainServices } from 'src/app/_services/main.service';
import { Auction } from 'src/app/models/auction.model';

@Component({
  selector: 'app-auctionItem',
  templateUrl: './auctionItem.component.html',
  styleUrls: ['./auctionItem.component.css']
})
export class AuctionItemComponent implements OnInit {
  toggleHeart = false;
  toggleRegisterAuction = false;
  @Input() auction: Auction;
  constructor() {

   }

  ngOnInit() {
    if (this.auction.liked === true) {
      this.toggleHeart = true;
    }
    // $('body').css('{backgroundColor: red}');
  }

  toggleClick(eventData) {
    this.toggleHeart = !this.toggleHeart;
    eventData.stopPropagation();
  }

  RegisterAuctionSlideupClick() {
    this.toggleRegisterAuction = true;
  }

  RegisterAuctionSlideDownClick() {
    this.toggleRegisterAuction = false;
  }


}
