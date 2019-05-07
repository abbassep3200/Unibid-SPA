import { Injectable } from '@angular/core';
import { ToggleMenu } from 'src/app/models/toggleMenu.model'
import { Search } from 'src/app/models/search.model'
import { AutoBid } from 'src/app/models/autobid.model'

@Injectable({ providedIn: 'root' })
export class SharingService {
  toggleMenu = new ToggleMenu();
  search = new Search();
  autobid = new AutoBid();
  lastClass = "myCfnAnimation-fadeIn";
  basketClass = "myCfnAnimation-slideright";
  shop = false;
  extraBid = false;
  constructor() {}
}
