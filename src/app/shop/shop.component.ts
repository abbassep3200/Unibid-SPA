import { Component, OnInit, Input } from '@angular/core';
import { MainServices } from 'src/app/_services/main.service';
import { Shop } from 'src/app/models/shop/shop.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items : Shop;
  loading = true;
  @Input() shop: Shop;

  constructor(private mainService: MainServices) { }

  ngOnInit() {
    this.mainService.GetShop().subscribe(result => {
      this.items = result;
      this.loading = false;
    },
    error => {
    });
  }

  buyChest(chestId){
    alert(chestId);
  }

  buyGem(gemId){
    alert(gemId);
  }

  buyCoin(coinId){
    alert(coinId);
  }

  buyAvatar(avatarId){
    alert(avatarId);
  }
}
