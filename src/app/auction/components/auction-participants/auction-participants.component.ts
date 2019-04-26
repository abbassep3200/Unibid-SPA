import { Component, OnInit, Input} from '@angular/core';
import { BaseAuction } from 'src/app/models/auction/baseAuction.model';

@Component({
  selector: 'app-auction-participants',
  templateUrl: './auction-participants.component.html',
  styleUrls: ['./auction-participants.component.css']
})
export class AuctionParticipantsComponent implements OnInit {
  @Input() auction: BaseAuction;

  constructor() { }

  ngOnInit() {
  }

}
