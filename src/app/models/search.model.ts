export class Search {
  constructor(){
    this.currentIndex = -1;
    this.currentText = "";
    this.visible = false;
    this.max = 0;
    this.min = 0;
  }
  reset(){
    this.currentIndex = -1;
    this.currentText = "";
    this.visible = false;
    this.max = 0;
    this.min = 0;
  }
  inc(){
    if(this.currentIndex < this.max -1 ){
      this.currentIndex ++;
    }
  }
  dec(){
    if(this.currentIndex > this.min){
      this.currentIndex --
    }
  }
  setText(text){
    this.currentText = text;
  }
  currentIndex: number;
  max: number;
  min: number;
  currentText: string;
  visible: boolean;
}
