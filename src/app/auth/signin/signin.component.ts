import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorObj = '';
  timeoutId;
  @ViewChild('errorMessage') errorMessageElem: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.formFields.username.value, this.formFields.password.value).subscribe(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/default']);
    },
    error => {
      this.errorObj = error;
      this.loading = false;
      this.errorMessageElem.nativeElement.classList.add('cfnAnimation-fadeIn');
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.errorMessageElem.nativeElement.classList.remove('cfnAnimation-fadeIn');
      }, 5000);
    });
  }

  get formFields() {
    return this.loginForm.controls;
  }

}
