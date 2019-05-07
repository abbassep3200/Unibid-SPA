import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MainServices } from 'src/app/services/main.service';
import { SharingService } from 'src/app/services/sharing.service';
import { GetAuctions } from 'src/app/models/service/getAuctions.model';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { SuccessComponent } from 'src/app/components/success/success.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchObj;
  auctions: GetAuctions;
  subscription: any;
  productCount = 0;
  @ViewChild(LoadingComponent) loading: LoadingComponent ;
  @ViewChild(ErrorComponent) error: ErrorComponent ;
  @ViewChild(SuccessComponent) success: SuccessComponent ;
  constructor(private shared:SharingService,private service:MainServices) {
    this.subscription = this.shared.getSearchChangedEmitter().subscribe(result=>{
      console.log(result);
      this.searchObj = result;
      this.search();
    });
  }

  ngOnInit() {
    if(this.shared.search.currentId!=-1){
      this.searchObj = {"text":this.shared.search.currentText,"categoryId":this.shared.search.currentId};
    }else{
      this.searchObj = {"text":this.shared.search.currentText};
    }
    this.search();

  }

  search(){
    this.loading.show();
    this.service.SearchAuctions(this.searchObj).subscribe(result=>{
      this.auctions = result;
      this.productCount = this.auctions.lastAuctions.length;
      this.loading.hide();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
