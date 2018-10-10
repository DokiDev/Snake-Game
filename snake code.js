class Point {
  constructor(a,b) {
    this.x_ = a;
    this.y_ = b;
  }
  get x(){
    return this.x_;
  }
  get y(){
    return this.y_;
  }
}
class Snake {
  constructor() {
    this.position_ = new Point(0,0);
    this.direction_ = "left";
  }
  move(amount){
    if(this.direction_ === "left") {
      this.position_ = new Point(this.position_.x - amount, this.position_.y);
    }
    else if(this.direction_ === "right") {
      this.position_ = new Point(this.position_.x + amount, this.position_.y);
    }
    else if(this.direction_ === "up") {
      this.position_ = new Point(this.position_.x, this.position_.y - amount);
    }
    else if(this.direction_ === "down") {
      this.position_ = new Point(this.position_.x, this.position_.y + amount);
    }
  }
  turnLeft(){
    if(this.direction_ === "left") this.direction_ = "down";
    else if(this.direction_ === "down") this.direction_ = "right";
    else if(this.direction_ === "right") this.direction_ = "up";
    else this.direction === "left";
    console.log("Now facing " + this.direction_);
  }
  turnRight(){
    if(this.direction_ === "left") this.direction_ = "up";
    else if(this.direction_ === "up") this.direction_ = "right";
    else if(this.direction_ === "right") this.direction_ = "down";
    else this.direction === "left";
    console.log("Now facing " + this.direction_);
  }
  get currentPos(){
    return this.position_;
  }
  get direction(){
    return this.direction_;
  }
}

class World {
  constructor(assignSnake){
    this.worldSnake_ = assignSnake;
    this.width_ = 320;
    this.height_ = 480;
  }
  update(steps){
    this.worldSnake_.move(steps);
  }
  get snake(){
    return this.worldSnake_;
  }
  get width(){
    return this.width_;
  }
  get height(){
    return this.height_;
  }
}

class SnakeController {
  constructor(world, snake){
    this.snakeWorld_ = world;
    this.slitherer_ = snake;
  }
  turnSnakeLeft(){
    this.slitherer_.turnLeft();
  }
  turnSnakeRight(){
    this.slitherer_.turnRight();
  }
  get snakePos(){
    return this.slitherer_.currentPos;
  }
  get snakeDir(){
    return this.slitherer_.direction;
  }
  get worldWidth(){
    return snakeWorld_.width;
  }
  get worldHeight(){
    return snakeWorld_.height;
  }
}

class Player {
  constructor(snakeCont){
    if(this.constructor === Player) throw new Error("Cannot instantiate a Player, which is an abstract base class.");
    if(!(this.makeTurn instanceof Function)) throw new Error("Base class must implement makeTurn method.");
    this.sc_ = snakeCont;
  }
}

class AvoidWallsPlayer extends Player {
  constructor(snakeCont){
    super(snakeCont);
  }
  makeTurn(){
    if((this.sc_.snakeDir === "left") && (this.sc_.snakePos.x === 0)) {
      this.sc_.turnSnakeLeft();
    }
  }
}

