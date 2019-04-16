import { Component, OnInit, Input } from '@angular/core';
import { MainServices } from 'src/app/_services/main.service';
import { Shop } from 'src/app/models/shop/shop.model';
import { Buy } from 'src/app/models/shop/buy.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items : Shop;
  buy =new Buy();
  loading = true;
  dialog = false;

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

  buyItem(Id,type,title,pic,price){
    this.buy.Id = Id;
    this.buy.type = type;
    this.buy.title = title;
    this.buy.picture = pic;
    this.buy.price = price;
    this.dialog = true;
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
