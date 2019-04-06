import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VerificationGet } from '../models/auth/verificationGet';
import { VerificationPut } from '../models/auth/verificationPut';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;
    loginUrl = 'http://dev.unibid.ir/v2/api/auth/login';
    registerUrl = 'http://dev.unibid.ir/v2/api/auth/register';
    verificationUrl = 'http://dev.unibid.ir/v2/api/auth/verify';

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    login(username: string, password: string) {
        return this.http.post(this.loginUrl, { username, password });
    }

    register(username: string, password: string, confirmPassword: string, mobile: string, invitor: string) {
      mobile = '0' + mobile.toString();
      let registerObj;
      if (invitor !== '') {
        registerObj = {
          username,
          password,
          confirmPassword,
          mobile,
          invitor
        };
      } else {
        registerObj = {
          username,
          password,
          confirmPassword,
          mobile
        };
      }
      return this.http.post(this.registerUrl, registerObj);
    }

    verifyGet() {
      return this.http.get<VerificationGet>(this.verificationUrl);
    }

    verifyPut() {
      const verifyPutObj = {
        resend: true
      }
      return this.http.put<VerificationPut>(this.verificationUrl, JSON.stringify(verifyPutObj));
    }
    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }
}
