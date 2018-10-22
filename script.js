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
    this.view_ = null;
  }
  update(steps){
    this.worldSnake_.move(steps);
    if(this.view_ !== null) this.view_.display(this);
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
  set view(setView){
    if(setView instanceof View) this.view_ = setView;
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

class View {
  constructor(){
    if(this.constructor === View) throw new Error("Cannot instantiate a View, which is an abstract base class.");
    if(!(this.display instanceof Function)) throw new Error("Base class must implement display method.");
  }
}

class CanvasView extends View {
  constructor(scale){
    super();
    this.canvas_ = document.createElement("canvas");
    document.body.appendChild(this.canvas_);
    this.context_ = this.canvas_.getContext("2d");
    this.scale_ = scale;
  }
  display(worldModel){
    this.canvas_.width = worldModel.width * this.scale_;
    this.canvas_.height = worldModel.height * this.scale_;
    this.context_.fillStyle = "red";
    this.context_.fillRect(worldModel.snake.currentPos.x, worldModel.snake.currentPos.y, 30, 10);
  }
}

class InputHandler {
  constructor(){
    if(this.constructor === InputHandler) throw new Error("Cannot instantiate an InputHandler, which is an interface.")
    if((!(this.madeLeftMove instanceof Function)) || (!(this.madeRightMove instanceof Function)) || (!(this.resetLeftMove instanceof Function)) || (!(this.resetRightMove instanceof Function))) {
      throw new Error("Base class must implement the methods madeLeftMove, madeRightMove, resetLeftMove, and resetRightMove.");
    }
  }
}

class LRKeyInputHandler extends InputHandler {
  constructor(){
    super();
    this.wasLeftArrowPushed_ = false;
    this.wasRightArrowPushed_ = false;
    window.addEventListener("keydown");
    if(event.type === "keydown") {
      if(event.keyCode === 37){
        this.wasLeftArrowPushed_ = true;
      }
      if(event.keyCode === 39){
        this.wasRightArrowPushed_ = true;
      }
    }
  }
  madeLeftMove(){
    return this.wasLeftArrowPushed_;
  }
  madeRightMove(){
    return this.wasRightArrowPushed_;
  }
  resetLeftMove(){
    this.wasLeftArrowPushed_ = false;
  }
  resetRightMove(){
    this.wasRightArrowPushed_ = false;
  }
}
class HumanPlayer extends Player {
  constructor(snakeCont, handler) {
    super(snakeCont);
    this.handler_ = handler;
  }
  makeTurn(){
    if((this.handler_.madeLeftMove) && (!(this.handler_.madeRightMove))) {
      this.sc_.turnSnakeLeft();
      this.handler_.resetLeftMove();
    }
    else if((this.handler_.madeRightMove) && (!(this.handler_.madeLeftMove))) {
      this.sc_.turnSnakeRightt();
      this.handler_.resetRightMove();
    }
    else {
      this.handler_.resetLeftMove();
      this.handler_.resetRightMove();
    }
  }
}

class GameController {
  constructor(world) {
    this.world_ = world;
    this.player1_;
    this.player2_;
  }
  set player1(player){
    if(player instanceof Player) this.player1_ = player;
  }
  set player2(player){
    if(player instanceof Player) this.player2_ = player;
  }
  run(){
    let lastTime = 0;
    let milliElapsed = 0;
    let updateFrame = milliseconds => {
      player1.makeTurn();
      player2.makeTurn();
      if((milliseconds > 250) && ((milliseconds - milliElapsed) > lastTime)){
        lastTime =+ 250;
        milliElapsed = milliseconds - lastTime;
        this.world_.update(1);
      }
    }
    requestAnimationFrame(updateFrame(milliseconds));
  }
}

