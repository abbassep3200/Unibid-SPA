import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { StartedAuction } from '../models/startedAuction.model';
import { FailMessage } from '../models/fail.message.model';
import { SuccessMessage } from '../models/success.message.model';


@Injectable({
  providedIn: 'root'
})
export class LiveAuctionService {
  connect = this.socket.fromEvent<string>('connect');
  started = this.socket.fromEvent<StartedAuction>('started');
  joined = this.socket.fromEvent<string>('joined');
  leaved = this.socket.fromEvent<string>('leaved');
  failed = this.socket.fromEvent<FailMessage>('failed');
  succeed = this.socket.fromEvent<SuccessMessage>('succeed');

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

  start(auctionId){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('start',{'auctionId':auctionId,'authorization':token});
    }
  }
  disconnect(){
    this.socket.disconnect();
  }

}
