import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { VerificationGet } from 'src/app/models/auth/verificationGet';
import { VerificationPut } from 'src/app/models/auth/verificationPut';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  submitted = false;
  loading = false;
  errorObj = '';
  timeoutId;
  verficationGet: VerificationGet;
  verificationPut: VerificationPut;
  disabled = false;
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
    }

  ngOnInit() {
    this.verificationForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.authenticationService.verifyGet().subscribe(result => {
      this.verficationGet = result;
      this.verficationGet.verificationTTL = 10;
      this.timeoutId = setInterval(() => {
        this.verficationGet.verificationTTL--;
        if (this.verficationGet.verificationTTL === 0) {
          clearInterval(this.timeoutId);
          this.disabled = true;
        }
      }, 1000);
    },
    error => {
      // this.errorObj = error;
      // this.loading = false;
      // this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      // clearTimeout(this.timeoutId);
      // this.timeoutId = setTimeout(() => {
      //   this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
      // }, 5000);
    });

  }

  onSubmit() {
    
  }

  resendActivationCodeClick(eventData) {
    eventData.stopPropagation();
    this.authenticationService.verifyPut().subscribe(result => {
      this.verificationPut = result;
      this.timeoutId = setInterval(() => {
        this.verificationPut.remained_to_expire--;
        if (this.verificationPut.remained_to_expire === 0) {
          clearInterval(this.timeoutId);
          this.disabled = true;
        }
      }, 1000);
    },
    error => {
      // this.errorObj = error;
      // this.loading = false;
      // this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      // clearTimeout(this.timeoutId);
      // this.timeoutId = setTimeout(() => {
      //   this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
      // }, 5000);
    });
  }

}
