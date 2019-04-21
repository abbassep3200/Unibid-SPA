import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MainServices } from 'src/app/_services/main.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Auction } from 'src/app/models/auction.model';
import { Links } from 'src/app/links.component';
import { ParticipationResult } from 'src/app/models/participationResult.model';

@Component({
  selector: 'app-auctionItem',
  templateUrl: './auctionItem.component.html',
  styleUrls: ['./auctionItem.component.css']
})
export class AuctionItemComponent implements OnInit {
  toggleHeart = false;
  showRegisterAuction = false;
  hideRegisterAuction = false;
  loading = false;
  errorObj = null;
  coinState = 'pallet';
  participationResult = ParticipationResult;
  Link = Links;
  remainedTime;
  timeoutId = 0;

  @Input() auction: Auction;
  @ViewChild('errorMessage') errorMessageElem: ElementRef;
  constructor(private service: MainServices,private authService:AuthenticationService) {

   }

  ngOnInit() {

    this.toggleHeart = this.auction.liked;
    if (this.auction) {
      this.remainedTime = this.ConvertMS(this.auction.remainedTime);
      setInterval(() => {
        this.auction.remainedTime = this.auction.remainedTime - 1000;
        this.remainedTime = this.ConvertMS(this.auction.remainedTime);
      }, 1000);
    }
    // $('body').css('{backgroundColor: red}');
  }

  toggleClick(eventData, auctionId) {

      this.loading = true;
      this.service.likeAuction({auctionId:auctionId}).subscribe(result => {
        this.toggleHeart = !this.toggleHeart;
        this.loading = false;
      },
      error => {
        this.authService.logout();

        this.errorObj = error;
        this.loading = false;
        this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
        }, 5000);
      });
      eventData.stopPropagation();
}

  RegisterAuctionSlideupClick() {
    this.showRegisterAuction = true;
  }

  RegisterAuctionSlideDownClick(eventData) {
    this.hideRegisterAuction = true;
    setTimeout(() => {
      this.coinState = 'pallet';
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

  registerByCoin(eventData,auctionId,planId){
    this.loading = true;
    this.service.registerByCoin({auctionId:auctionId,planId:planId}).subscribe(result => {
      this.loading = false;
    },
    error => {
      if(error.error.reason==="coins"){
        this.participationResult = error.error.details;
        this.coinState = 'gems';
      }

      this.errorObj = error;
      this.loading = false;
      this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
        if(error.status==401){
          this.authService.logout();
        }
      }, 3000);
    });
    eventData.stopPropagation();
  }

  registerByGem(eventData,auctionId,planId){
    eventData.stopPropagation();

    this.loading = true;
    this.service.registerByGem({auctionId:auctionId,planId:planId}).subscribe(result => {
      this.loading = false;
    },
    error => {
      if(error.error.reason==="coins"){
        this.participationResult = error.error.details;
        this.coinState = 'gems';
      }

      this.errorObj = error;
      this.loading = false;
      this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
        if(error.status==401){
          this.authService.logout();
        }
      }, 3000);
    });

  }
}
