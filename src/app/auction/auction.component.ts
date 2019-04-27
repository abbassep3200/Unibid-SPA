import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServices } from 'src/app/_services/main.service';
import { GetAuction } from 'src/app/models/service/getAuction.model';
import { Router } from '@angular/router';
import { LiveAuctionService } from 'src/app/_services/live-auction.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  auction: GetAuction;
  loading = true;
  errorObj = null;
  timeoutId;
  @ViewChild('errorMessage') errorMessageElem: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainServices,
    private router:Router,
    private auctionSocket:LiveAuctionService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

        this.mainService.GetAuction(params['id']).subscribe(result => {
          this.auction = result;
          this.loading = false;
        },
        error => {
          this.errorObj = error;
          this.loading = false;
          this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
          clearTimeout(this.timeoutId);
          this.timeoutId = setTimeout(() => {
            this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
              this.router.navigate(['/']);
          }, 2000);
        });

    });

    this.auctionSocket.auction.subscribe(result=>{
      this.auction = result;
    });

    this.auctionSocket.remained.subscribe(result=>{
      console.log(result);
    });



  }

}
