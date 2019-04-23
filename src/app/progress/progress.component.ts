import { Component, OnInit,ViewChildren, ElementRef, QueryList, Input,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent implements OnInit {

  @Input() current: number;
  @Input() total: number;
  @ViewChildren('progresses') progresses:QueryList<ElementRef>;

  timer;
  time;

  numbers;

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  ngOnInit() {
    this.numbers = Array.apply(null, {length: this.total}).map(Number.call, Number);
    // console.log(this.el.nativeElement.getElementsByClassName('progressItem'));
    // console.log(document);
    // console.log(this.el.nativeElement.querySelector('.progressItem-empty'));
    console.log(this.el.nativeElement.getElementsByClassName('progressItem'));
  }

  update() {
    this.progresses.forEach(progressItem => {
      progressItem.nativeElement.classList.remove('progressItem-empty');
      progressItem.nativeElement.classList.replace('progressItemNone','progressItem');
    });
  }

  reset() {

    if(this.progresses.length>10)
      this.progresses.toArray()[this.progresses.length-1].nativeElement.remove();

    if(this.time===0){
      console.log('auction finished');
      clearInterval(this.timer);
      return;
    }

    this.current = this.progresses.length;
    this.time = this.current+1;

    this.progresses.forEach(progressItem => {
      progressItem.nativeElement.classList.replace('progressItemNone','progressItem');
      progressItem.nativeElement.classList.remove('progressItem-empty');
    });

    this.update();
  }

  ngAfterViewInit(){

    for(var i = this.progresses.length -1 ; i >= this.current; i--)
    {
      this.progresses.toArray()[i].nativeElement.classList.replace('progressItem','progressItemNone');
    }

    this.time = this.current+1;

    this.timer =  setInterval(()=> {

      console.log(this.time);

      this.time -= 1;
      if(this.time===0){
        console.log('auction finished');
        clearInterval(this.timer);
      }
      else{
        // debugger;
        var current_element = this.el.nativeElement.getElementsByClassName('progressItem-empty')[0];
        if(current_element){
          current_element.previousElementSibling.classList.add('progressItem-empty');
        }else{
          current_element = this.el.nativeElement.getElementsByClassName('progressItem')[this.current-1];
          if(current_element){
            current_element.classList.add('progressItem-empty');
          }else{
            this.progresses.toArray()[this.progresses.length-1].nativeElement.classList.add('progressItem-empty');
          }
        }
    }
    }, 1000);

  }

}
