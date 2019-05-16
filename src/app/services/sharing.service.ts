import { Injectable , EventEmitter} from '@angular/core';
import { ToggleMenu } from 'src/app/models/toggleMenu.model'
import { Search } from 'src/app/models/search.model'
import { AutoBid } from 'src/app/models/auction/autobid.model'

@Injectable({ providedIn: 'root' })
export class SharingService {
  searchChanged: EventEmitter<string> = new EventEmitter();
  emitSearchChanged(string) {
    this.searchChanged.emit(string);
  }
  getSearchChangedEmitter() {
    return this.searchChanged;
  }

  toggleMenu = new ToggleMenu();
  search = new Search();
  autobid = new AutoBid();
  lastClass = "myCfnAnimation-fadeIn";
  basketClass = "myCfnAnimation-slideright";
  shop = false;
  extraBid = false;
  showConfirm = false;
  productDetails = false;
  constructor() {}

}
