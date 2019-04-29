import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shop } from '../models/shop/shop.model';
import { Links } from '../links.component';
import { MainUserInformation } from '../models/user/information/main.model'

@Injectable({ providedIn: 'root' })
export class UserService {
  getMainInfoUrl = Links.prefix+'/v2/api/user/information';

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
}
