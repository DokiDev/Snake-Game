class Snake {
  constructor(startPos) {
    this.moveForward_ = true;
    this.x = startPos;
  }
  move(dist){
    if(this.moveForward_) this.x += dist;
    else this.x -= dist;
  }
  turn(){
    if(this.moveForward_) this.moveForward_ = false;
    else this.moveForward_ = true;
  }
  get currentPos(){
    return this.x;
  }
}

let boa = new Snake(0);

boa.move(1);
boa.turn();
boa.move(3);
console.log(boa.x);
