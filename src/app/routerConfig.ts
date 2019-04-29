import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuctionComponent } from './components/auction/auction.component';
import { DefaultComponent } from './components/default/default.component';
import { VerificationComponent } from './components/auth/verification/verification.component';

const appRoutes: Routes = [
  {
      path: 'auction/:id',
      component: AuctionComponent
  },
  {
      path: 'shop',
      component: ShopComponent
  },
  {
      path: 'signin',
      component: SigninComponent
  },
  {
      path: 'signup',
      component: SignupComponent
  },
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/default'
  }
];
export const routing = RouterModule.forRoot(appRoutes);
