import { Component, OnInit, Input , ElementRef, ViewChild} from '@angular/core';
import { MainServices } from 'src/app/services/main.service';
import { Buy } from 'src/app/models/shop/buy.model';
import { SharingService } from 'src/app/services/sharing.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessComponent } from 'src/app/components/success/success.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() buy: Buy;
  @Input() shopWrapperElem: ElementRef;
  loaded;
  redirectToBankLink;

  @ViewChild(ErrorComponent ) error: ErrorComponent ;
  @ViewChild(SuccessComponent ) success: SuccessComponent ;
  @ViewChild(LoadingComponent ) loading: LoadingComponent ;

  constructor(public shared:SharingService,private service: MainServices) { }

  ngOnInit() {
    const shopWrapper = this.shopWrapperElem.nativeElement as HTMLElement;
    shopWrapper.style.filter = 'blur(3px)';

  }

  ngDoCheck(){
    if(!this.loaded && this.loading){
      this.loaded = true;
      if(this.loading){
        switch(this.buy.type){
          case 'coin':{
            this.loading.show();
            this.service.BuyCoin({"coinId":this.buy.Id}).subscribe(result=>{
              this.success.show(result,1000).then(()=>{
                this.service.PaymentGateway({"GUID":result.GUID}).subscribe(pay=>{
                  console.log(pay);
                  console.log('redirect to bank');
                },
                error=>{
                  this.loading.hide();
                  this.error.show(error,3000,null);
                });
              });
            },
            error =>{
              this.loading.hide();
              this.error.show(error,3000,null);
            });

            break;
          };
          case 'gem':{
            console.log('buy gem');
            break;
          };
          case 'chest':{
            console.log('buy chest');
            break;
          };
          case 'avatar':{
            console.log('buy avatar');
            break;
          };
          case 'product':{
            console.log('buy product');
            break;
          };
        }
      }
    }
  }

  close(){
    const shopWrapper = this.shopWrapperElem.nativeElement as HTMLElement;
    shopWrapper.style.filter = 'none';
    this.shared.showConfirm = false;
  }

}
