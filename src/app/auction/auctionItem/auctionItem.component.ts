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
  remainedTime;
  @Input() auction: Auction;
  constructor() {

   }

  ngOnInit() {
    if (this.auction.liked === true) {
      this.toggleHeart = true;
    }
    if (this.auction) {
      this.remainedTime = this.ConvertMS(this.auction.remainedTime);
      setInterval(() => {
        this.auction.remainedTime = this.auction.remainedTime - 1000;
        this.remainedTime = this.ConvertMS(this.auction.remainedTime);
      }, 1000);
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

  ConvertMS(ms) {
    let day,
        hour,
        minute,
        seconds;
    seconds = Math.floor(ms / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
  }
}
