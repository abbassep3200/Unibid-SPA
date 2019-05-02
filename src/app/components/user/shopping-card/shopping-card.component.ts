import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SharingService } from 'src/app/services/sharing.service';
import { LiveUserService } from 'src/app/services/live-user.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessComponent } from 'src/app/components/success/success.component';
import { Cart } from 'src/app/models/user/information/cart.model'
import { Links } from 'src/app/links.component';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  @ViewChild(LoadingComponent) loading: LoadingComponent ;
  @ViewChild(ErrorComponent) error: ErrorComponent ;
  @ViewChild(SuccessComponent) success: SuccessComponent ;
  Link = Links;
  userSyncTimer;
  carts:Cart[];
  totalPrice = 0;
  constructor(private userService:UserService,private shared:SharingService,private liveUser:LiveUserService) { }


  ngOnInit() {
    this.userSyncTimer = setInterval(() => {
      this.liveUser.getCarts();
    }, 1000);

    this.userService.GetShoppingCarts().subscribe(result => {
      this.carts = result;
      var costs = 0;
      var discounts = 0;
      this.carts.forEach(item =>{
        costs += item.price;
        discounts += item.discount;
      });
      this.totalPrice = costs - discounts;
      this.loading.hide();
    },
    error => {
      this.error.show(error,2000,'/signin');
    });

    this.liveUser.carts.subscribe(result=>{
      this.carts = result;
      var costs = 0;
      var discounts = 0;
      this.carts.forEach(item =>{
        costs += item.price;
        discounts += item.discount;
      });
      this.totalPrice = costs - discounts;
    });
  }

  goBack(){
    this.shared.toggleMenu.shoppingCart = false;
    this.shared.toggleMenu.profile = true;
  }

  deleteOrder(eventData,orderId){
    eventData.preventDefault();
    this.userService.DeleteOrder({"orderId":orderId}).subscribe(result=>{
      console.log(result);
      this.success.show(result,2000);
    },
    error => {
      this.error.show(error,3000);
    });
  }

  togglePreview(){
    this.shared.toggleMenu.reset();
    this.shared.toggleMenu.preview = true;
  }

}
