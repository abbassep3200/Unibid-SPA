import { Component, OnInit,ViewChildren, ElementRef, QueryList, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent implements OnInit {

  @Input() current: number;
  @Input() total: number;
  @ViewChildren('progresses') progresses:QueryList<ElementRef>

  numbers;

  constructor() {

  }

  ngOnInit() {
    // console.log('progress comp')
    // this.numbers = Array(10).fill().map((x,i)=>i); // [0,1,2,3,4]
    // this.numbers = Array(10).fill().map((x,i)=>i); // [0,1,2,3,4]
    this.numbers = Array.apply(null, {length: this.total}).map(Number.call, Number);


  }




  ngAfterViewInit(){

    console.log(this.progresses);

    function update() {
      var progresses = document.getElementsByClassName('progress')[0];
      for(var i = 0 ; i < progresses.children.length; i++)
      {
        progresses.children.item(i).classList.remove('progressItem-empty');
        progresses.children.item(i).classList.replace('progressItemNone','progressItem');
      }
    }

    function init() {

      for(var i = progresses.length -1 ; i >= current; i--)
      {
        progresses.item(i).classList.replace('progressItem','progressItemNone');
      }
    }

    var current = this.current;
    var time = current+1;

    var progresses = document.getElementsByClassName('progressItem');

    init();

    var timer =  setInterval(function () {

      time -= 1;
      if(time===0){
        console.log('auction finished');
        clearInterval(timer);
      }
      else{

        var current_element = document.getElementsByClassName('progressItem-empty')[0];
        if(current_element){
          current_element.previousElementSibling.classList.add('progressItem-empty');
        }else{
          current_element = document.getElementsByClassName('progressItem')[current+1];
          if(current_element){
            current_element.previousElementSibling.classList.add('progressItem-empty');
          }else{
            progresses = document.getElementsByClassName('progressItem');
            progresses.item(progresses.length-1).classList.add('progressItem-empty');
          }
        }

      }
    }, 1000);

    function resetProgress() {

      event.preventDefault();
      var childs = document.getElementsByClassName('progress')[0].children;
      if(childs.length>10)
      childs.item(childs.length-1).remove();

      if(time===0){
        console.log('auction finished');
        clearInterval(timer);
        return;
      }

      current = document.getElementsByClassName('progress')[0].children.length;
      time = current+1;

      for(var i = 0; i < progresses.length; i++)
      {
        progresses.item(i).classList.replace('progressItemNone','progressItem');
        progresses.item(i).classList.remove('progressItem-empty');
      }
      this.update();
    }
  }



}
