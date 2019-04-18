import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auction } from '../models/auction.model';
import { GetAuctions } from '../models/service/getAuctions.model';
import { Shop } from '../models/shop/shop.model';
import { GetSliderAuctions } from '../models/service/sliderAuctions.model';
import { SearchItems } from '../models/service/searchItems.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MainServices {
  getAuctionsUrl = environment.prefix+'/v2/api/site/last/auctions';
  getShopUrl = environment.prefix+'/v2/api/shop';
  sliderAuctionUrl = environment.prefix+'/v2/api/site/slider/auctions';
  searchItemsUrl =  environment.prefix+'/v2/api/site/categories';
  likeUrl = environment.prefix+'/v2/api/auction/like';
  constructor(private http: HttpClient) {

  }

  GetAuctions() {

    const currentUser = localStorage.getItem('currentUser');
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

  GetShop() {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      };
      return this.http.get<Shop>(this.getShopUrl , httpOptions);
    } else {
      return this.http.get<Shop>(this.getShopUrl);
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

  GetSearchItems() {
    return this.http.get<SearchItems>(this.searchItemsUrl);
  }

  likeAuction() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const token = JSON.parse(currentUser)['accessToken'];
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post(this.likeUrl ,null,httpOptions);
    }else{
      return this.http.post(this.likeUrl);
    }
  }
}
