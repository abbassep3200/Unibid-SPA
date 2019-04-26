import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServices } from 'src/app/_services/main.service';
import { GetAuction } from 'src/app/models/service/getAuction.model';
import { Router } from '@angular/router';

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
    private mainService: MainServices,
    private router:Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

        this.mainService.GetAuction(params['id']).subscribe(result => {
          this.auction = result;
          this.loading = false;
        },
        error => {
          this.router.navigate(['/']);
        });

    });
    
  }

}
