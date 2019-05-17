import { Component, OnInit ,Input ,ViewChild, ElementRef } from '@angular/core';
import { LoadingComponent } from 'src/app/components/loading/loading.component'
import { ErrorComponent } from 'src/app/components/error/error.component'
import { SuccessComponent } from 'src/app/components/success/success.component'
import { Coin } from 'src/app/models/auction/coin.model';
import { Cart } from 'src/app/models/cart.model';
import { MainServices } from 'src/app/services/main.service';
import { GetParticipation } from 'src/app/models/auction/getParticipation.model';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit {
  @Input() coins: Coin[];
  @Input() auctionId: number;
  @Input() cart: Cart;
  @Input() getParticipation: GetParticipation;
  @ViewChild(ErrorComponent ) error: ErrorComponent ;
  @ViewChild(SuccessComponent ) success: SuccessComponent ;
  @ViewChild(LoadingComponent ) loading: LoadingComponent ;

  constructor(private el: ElementRef, private service: MainServices) {
  }

  ngOnInit() {
    this.el.nativeElement.getElementsByClassName('registerAuction')[0].classList.add('cfnAnimation-slideup');
  }

  close(){
    this.el.nativeElement.getElementsByClassName('registerAuction')[0].classList.add('cfnAnimation-slidedown');
  }

  registerByCoin(eventData,auctionId,planId){
    this.loading.show();
    this.service.registerByCoin({auctionId:auctionId,planId:planId}).subscribe(result => {
      this.loading.hide();
      this.getParticipation = <any>result;
      this.cart.state = 'confirmed';
      this.cart.participated = true;
    },
    error => {
      if(error.error.reason==="coins"){
        this.getParticipation = error.error;
        this.cart.state = 'gems';
        this.cart.participated = false;
      }
      this.loading.hide();
      this.error.show(error,2000,null);
    });
    eventData.stopPropagation();
  }

}
