import { Component, OnInit, Input} from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';
import { Links } from 'src/app/links.component';


@Component({
  selector: 'app-auction-participants',
  templateUrl: './auction-participants.component.html',
  styleUrls: ['./auction-participants.component.css']
})
export class AuctionParticipantsComponent implements OnInit {
  @Input() auction: BaseAuction;
  Link = Links;
  listRendered = false;
  participants;

  constructor() { }

  ngOnInit() {
  }
  ngDoCheck(){
    if(!this.listRendered){
      if(this.auction && this.auction.participants){
        this.listRendered = true;
        this.participants = this.auction.participants;
      }
    }
  }

}
