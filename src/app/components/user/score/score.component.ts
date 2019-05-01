import { Component, OnInit, Input } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service'
import { LiveUserService } from 'src/app/services/live-user.service';
import { UserService } from 'src/app/services/user.service';
import { Score } from 'src/app/models/user/information/score.model'
import { Links } from 'src/app/links.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  scores : Score[];
  Link = Links;
  @Input() username: string;

  constructor(private shared:SharingService,private liveUser:LiveUserService,private userService:UserService) { }

  ngOnInit() {
    this.liveUser.scores.subscribe(result => {
      this.scores = result;
    });
    this.userService.GetScores().subscribe(result=>{
      this.scores = result;
    });
  }

  goBack(){
    this.shared.toggleMenu.score = false;
    this.shared.toggleMenu.profile = true;
  }
}
