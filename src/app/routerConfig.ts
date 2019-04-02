import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DefaultComponent } from './default/default.component';
import { VerificationComponent } from './auth/verification/verification.component';

const routerConfig: Routes = [
  {
      path: 'signin',
      component: SigninComponent
  },
  {
      path: 'signup',
      component: SignupComponent
  },
  {
    path: 'default',
    component: DefaultComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default routerConfig;
