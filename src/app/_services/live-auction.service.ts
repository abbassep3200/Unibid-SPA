import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuctionStatus } from '../models/auctionStatus.model';
import { LiveUser } from '../models/liveUser.model';
import { GetError } from '../models/service/getError.model';
import { SuccessMessage } from '../models/success.message.model';
import { GetAuction } from 'src/app/models/service/getAuction.model';


@Injectable({
  providedIn: 'root'
})
export class LiveAuctionService {
  connect = this.socket.fromEvent<string>('connect');
  status = this.socket.fromEvent<AuctionStatus>('status');
  joined = this.socket.fromEvent<string>('joined');
  leaved = this.socket.fromEvent<string>('leaved');
  failed = this.socket.fromEvent<GetError>('failed');
  succeed = this.socket.fromEvent<SuccessMessage>('succeed');
  accepted = this.socket.fromEvent<string>('accepted');
  bids = this.socket.fromEvent<string>('remainBids');
  users = this.socket.fromEvent<LiveUser[]>('users');
  auction = this.socket.fromEvent<GetAuction>('auction');

  constructor(private socket: Socket) {
  }

  leave(auctionId){
    this.socket.emit('leave',{'auctionId':auctionId});
  }

  join(auctionId){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('join',{'auctionId':auctionId,'authorization':token});
    }
  }

  getStatus(auctionId){
    this.socket.emit('getStatus',{'auctionId':auctionId});
  }

  getAuction(auctionId){
    this.socket.emit('getAuction',{'auctionId':auctionId});
  }

  offerBid(auctionId){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('bid',{'auctionId':auctionId,'authorization':token});
    }
  }
  getUsers(auctionId){
    this.socket.emit('getUsers',{'auctionId':auctionId});
  }

  disconnect(){
    this.socket.disconnect();
  }

}
