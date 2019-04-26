import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';
import { LiveAuctionService } from 'src/app/_services/live-auction.service';
import { ProgressComponent } from 'src/app/progress/progress.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';



@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit {
  @Input() auction: BaseAuction;
  remainedTime;
  timer;
  timeoutId;
  auctionTimer;
  joined = false;
  loading = false;
  errorObj = null;

  @ViewChild(ProgressComponent ) progress: ProgressComponent ;
  @ViewChild('errorMessage') errorMessageElem: ElementRef;

  constructor(
    private auctionSocket:LiveAuctionService,
    private router:Router,
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
  }
  ngDoCheck(){

    if (this.auction) {

      if(!this.timer){
        this.remainedTime = this.ConvertMS(this.auction.remainedTime);
        this.timer = setInterval(() => {
          this.auction.remainedTime = this.auction.remainedTime - 1000;
          this.remainedTime = this.ConvertMS(this.auction.remainedTime);
        }, 1000);
      }

      if(this.auction.remainedTime > 60000 && !this.auctionTimer){
        this.auctionTimer = setInterval(() => {
          console.log('getAuction status');
          this.auctionSocket.getAuction(this.auction.auctionId);
        }, 1000);
      }

      if(this.auction.remainedTime <= 60000 && !this.joined){
        clearInterval(this.auctionTimer);
        this.joined = true;
        this.auctionSocket.join(this.auction.auctionId);
      }

    }
  }
  ngAfterViewInit(){
    this.auctionSocket.connect.subscribe(result => console.log(result));

    this.auctionSocket.joined.subscribe(result => {
      console.log(result);
      this.auctionSocket.getStatus(this.auction.auctionId);
    });

    this.auctionSocket.bids.subscribe(result => {
      this.auction.bids = parseInt(result);
    });

    this.auctionSocket.accepted.subscribe(result => {
      var remainingTime = parseInt(result);
      this.auction.remainedTime = remainingTime;
      if (this.auction.remainedTime <= 11000){
        this.progress.reset();
      }
      this.auctionSocket.getStatus(this.auction.auctionId);
      this.auctionSocket.getUsers(this.auction.auctionId);
    });

    this.auctionSocket.failed.subscribe(result => {
      this.errorObj = result;
      this.loading = false;
      this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
        if(result.error.status===401){
          this.authService.logout();
          this.router.navigate(['/signin']);
        }
      }, 2000);
    });

  }

  handleBid(eventData,auctionId){
    console.log('try bid for : ',auctionId);

    this.auctionSocket.offerBid(auctionId);

    eventData.stopPropagation();
  }

  ngOnDestroy(){
    this.auctionSocket.disconnect();
    clearInterval(this.timer);
  }

  tryParseInt(number){
    return parseInt(Math.floor(number).toString());
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
