import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';
import { Links } from 'src/app/links.component';
import { LiveAuctionService } from 'src/app/services/live-auction.service';


@Component({
  selector: 'app-auction-slider',
  templateUrl: './auction-slider.component.html',
  styleUrls: ['./auction-slider.component.css']
})
export class AuctionSliderComponent implements OnInit {
  @Input() auction: BaseAuction;
  Link = Links;
  status;
  swiper;

  constructor(private el:ElementRef, private auctionSocket:LiveAuctionService) {
    this.auctionSocket.connectToServer();
  }
  config: SwiperOptions = {
    autoplay: 3000, // Autoplay option having value in milliseconds
    initialSlide: 1, // Slide Index Starting from 0
    // slidesPerView: 1, // Slides Visible in Single View Default is 1
    nextButton: '.swiper-button-next', // Class for next button
    prevButton: '.swiper-button-prev', // Class for prev button
    spaceBetween: 30, // Space between each Item,
    slidesPerView: 'auto',
    centeredSlides: true,

  };

  // config: SwiperOptions = {
  //   navigation: {
  //         nextEl: '.swiper-button-next',
  //         prevEl: '.swiper-button-prev',
  //         spaceBetween: 30
  //       },
  // };


  ngOnInit() {



    this.auctionSocket.status.subscribe(result =>{
      this.status = result;
    });
  }
}
