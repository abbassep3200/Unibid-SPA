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
  showRegisterAuction = false;
  hideRegisterAuction = false;
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
    this.showRegisterAuction = true;
  }

  RegisterAuctionSlideDownClick(eventData) {
    this.hideRegisterAuction = true;
    setTimeout(() => {
      this.showRegisterAuction = false;
      this.hideRegisterAuction = false;
    }, 1000);
    eventData.stopPropagation();
  }


}
