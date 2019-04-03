import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auction } from '../models/auction.model';
import { GetAuctions } from '../models/service/getAuctions.model';

@Injectable({ providedIn: 'root' })
export class MainServices {
  getAuctionsUrl = 'http://dev.unibid.ir/v2/api/site/last/auctions';
  constructor(private http: HttpClient) {

  }

  GetAuctions() {
    const headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('currentUser'))['accessToken'];
    console.log(token);
    headers.set('Authorization', token);
    return this.http.get<GetAuctions>(this.getAuctionsUrl , {headers});
  }
}