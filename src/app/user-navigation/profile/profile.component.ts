import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { UserService } from 'src/app/_services/user.service';
import { Links } from 'src/app/links.component';
import { MainUserInformation } from 'src/app/models/user/information/main.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild(LoadingComponent) loading: LoadingComponent ;
  @ViewChild(ErrorComponent) error: ErrorComponent ;
  userMainInfo:MainUserInformation;
  Link = Links;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.loading.show();

    this.userService.GetMainInformation().subscribe(result => {
      console.log(result)
      this.userMainInfo = result;
      this.loading.hide();
    },
    error => {
      this.error.show(error,2000,'/signin');
    });
  }

}
