import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SliderAuction } from 'src/app/models/auction/sliderAuction.model';
import { Links } from 'src/app/links.component';
import { MainServices } from 'src/app/services/main.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessComponent } from 'src/app/components/success/success.component';
import { LiveAuctionService } from 'src/app/services/live-auction.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @Input() slider: SliderAuction;
  Link = Links;
  remainedTime;
  timer;
  joined;
  toggleHeart = false;

  @ViewChild(ErrorComponent ) error: ErrorComponent ;
  @ViewChild(SuccessComponent ) success: SuccessComponent ;
  @ViewChild(LoadingComponent ) loading: LoadingComponent ;
  constructor(private service: MainServices,private auctionSocket:LiveAuctionService) {this.auctionSocket.connectToServer();}

  ngOnInit() {

    if(!this.joined){
      this.joined = true;
      this.auctionSocket.join(this.slider.auctionId);
    }

    this.auctionSocket.auctionItem.subscribe(result=>{
      
      if(this.slider.auctionId===result.auctionId){
        this.slider = result;
      }
    });


    if (this.slider) {
      this.toggleHeart = this.slider.liked;

      this.remainedTime = this.ConvertMS(this.slider.remainedTime);
      this.timer = setInterval(() => {
        this.slider.remainedTime = this.slider.remainedTime - 1000;
        this.remainedTime = this.ConvertMS(this.slider.remainedTime);
      }, 1000);
    }
  }

  ngOnDestroy() {
    // this.auctionSubscription.unsubscribe();
    this.auctionSocket.disconnect();
    clearInterval(this.timer);
  }

  toggleClick(eventData, auctionId) {

      this.loading.show();
      this.service.likeAuction({auctionId:auctionId}).subscribe(result => {
        this.toggleHeart = !this.toggleHeart;
        this.loading.hide();
      },
      error => {
        this.loading.hide();
        this.error.show(error,2000,null);
      });
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
