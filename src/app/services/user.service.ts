import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shop } from '../models/shop/shop.model';
import { Links } from '../links.component';
import { MainUserInformation } from '../models/user/information/main.model'
import { Avatar } from '../models/user/avatar.model'

@Injectable({ providedIn: 'root' })
export class UserService {
  getMainInfoUrl = Links.prefix+'/v2/api/user/information';
  getAvatarsUrl = Links.prefix+'/v2/api/user/avatars';

  constructor(private http: HttpClient) {}

  GetMainInformation() {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return this.http.get<MainUserInformation>(this.getMainInfoUrl , httpOptions);
    } else {
      return this.http.get<MainUserInformation>(this.getMainInfoUrl);
    }

  }

  GetAvatars() {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return this.http.get<Avatar[]>(this.getAvatarsUrl , httpOptions);
    } else {
      return this.http.get<Avatar[]>(this.getAvatarsUrl);
    }

  }

  SaveAvatar(avatarObj) {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return this.http.post(this.getAvatarsUrl , avatarObj,httpOptions);
    } else {
      return this.http.post(this.getAvatarsUrl , avatarObj);
    }

  }
}
