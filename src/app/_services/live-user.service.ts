import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GetError } from '../models/service/getError.model';
import { SuccessMessage } from '../models/success.message.model';


@Injectable({
  providedIn: 'root'
})
export class LiveUserService {
  connect = this.socket.fromEvent<string>('connect');
  joined = this.socket.fromEvent<string>('joined');
  leaved = this.socket.fromEvent<string>('leaved');
  failed = this.socket.fromEvent<GetError>('failed');
  succeed = this.socket.fromEvent<SuccessMessage>('succeed');

  constructor(private socket: Socket) {
  }

  leave(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('leave',{'authorization':token});
    }
  }

  join(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('join',{'authorization':token});
    }
  }

  disconnect(){
    this.leave();
    this.socket.disconnect();
  }

}
