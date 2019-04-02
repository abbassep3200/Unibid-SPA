import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import routerConfig from './routerConfig';
import { HttpClientModule } from '@angular/common/http';
import { DefaultComponent } from './default/default.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { VerificationInputKeyupDirective } from './directives/verification-input-keyup.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuctionComponent,
    AuctionListComponent,
    SignupComponent,
    SigninComponent,
    DefaultComponent,
    VerificationComponent,
    VerificationInputKeyupDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
