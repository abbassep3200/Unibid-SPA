import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auction } from '../models/auction.model';
import { GetAuctions } from '../models/service/getAuctions.model';
import { GetSliderAuctions } from '../models/service/sliderAuctions.model';

@Injectable({ providedIn: 'root' })
export class MainServices {
  getAuctionsUrl = 'http://dev.unibid.ir/v2/api/site/last/auctions';
  sliderAuctionUrl = 'http://dev.unibid.ir/v2/api/site/slider/auctions';
  constructor(private http: HttpClient) {

  }

  GetAuctions() {

    const currentUser = localStorage.getItem('currentUser');
    debugger;
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return this.http.get<GetAuctions>(this.getAuctionsUrl , httpOptions);
    } else {
      return this.http.get<GetAuctions>(this.getAuctionsUrl);
    }
   
  }

  GetSliderAuctions() {
    const headers = new HttpHeaders();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      headers.set('Authorization', token);
    }
    return this.http.get<GetSliderAuctions>(this.sliderAuctionUrl , {headers});
  }
}