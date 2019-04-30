import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GetError } from '../models/service/getError.model';
import { SuccessMessage } from '../models/success.message.model';
import { BasicUserInformation } from 'src/app/models/user/information/basic.model'
import { MainUserInformation } from 'src/app/models/user/information/main.model'
import { Avatar } from 'src/app/models/user/avatar.model'



@Injectable({
  providedIn: 'root'
})
export class LiveUserService {
  connect = this.socket.fromEvent<string>('userConnect');
  joined = this.socket.fromEvent<string>('userJoined');
  leaved = this.socket.fromEvent<string>('userLeaved');
  status = this.socket.fromEvent<BasicUserInformation>('userStatus');
  profileStatus = this.socket.fromEvent<MainUserInformation>('profileStatus');
  avatars = this.socket.fromEvent<Avatar[]>('avatars');
  failed = this.socket.fromEvent<GetError>('userFailed');
  succeed = this.socket.fromEvent<SuccessMessage>('userSucceed');

  constructor(private socket: Socket) {
  }

  leave(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('leaveUser',{'authorization':token});
    }
  }

  join(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('joinUser',{'authorization':token});
    }
  }

  getStatus(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('userStatus',{'authorization':token});
    }
  }

  getAvatars(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('getAvatars',{'authorization':token});
    }
  }

  getProfileStatus(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      this.socket.emit('userProfileStatus',{'authorization':token});
    }
  }

  disconnect(){
    this.leave();
    this.socket.disconnect();
  }

}
