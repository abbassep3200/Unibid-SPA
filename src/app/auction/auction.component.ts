import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServices } from 'src/app/_services/main.service';
import { GetAuction } from 'src/app/models/service/getAuction.model';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  auction: GetAuction;
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private mainService: MainServices
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

        this.mainService.GetAuction(params['id']).subscribe(result => {
          this.auction = result;
          console.log(result);
          this.loading = false;
        },
        error => {
        });

    });

  }

}
