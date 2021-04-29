let myCircle;
let myPlayer;
let opponent;
let pitch= [-.8,.8];

function setup() {
  createCanvas(300, 300);

  myCircle = new Circle(150,
    150,
    50,
    random(pitch),
    random(pitch));

  myPlayer = new Player(50,
    height/2,
    40,
    'Blue');
  
  Opponent = new Player(250, height/2, 50, 'red');
  
}

function draw() {
  background(50);
  fill(255);
  text('WRONG PONG', 70,30)

  // update and show circle
  myCircle.move(myPlayer.x, myPlayer.y, Opponent.x, Opponent.y);
  myCircle.display();

  handleKeyboard();
  
  // update and show player
  myPlayer.collide(myCircle.x, myCircle.y, myCircle.r);
  Opponent.collide(myCircle.x, myCircle.y, myCircle.r);
  myPlayer.display();
  Opponent.display();
}

class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.score = 0;
    this.color = color;
  }

  move(xinc, yinc) {
    this.x += xinc;
    this.y += yinc;
  }

  collide(otherx, othery, otherr) {
    if (dist(this.x, this.y, otherx, othery) < (otherr)+10) {
      
      
      // take 1 point off of the counter
      this.score+=1.0;
      
      
      
      }
    } 
  

  display() {
    // draw shape
    strokeWeight(10);
    stroke(this.color);
    line(this.x, this.y - this.size, this.x, this.y + this.size);
    strokeWeight(1);
    
    // draw life
    fill(255);
    textSize(24);
    text(this.score, this.x, 50);
  }
}


class Circle {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color(255, 255, 255);
  }

  move(playerx, playery,opponentx,opponenty) {
    this.x += this.xSpeed;
    if (this.x < 0) {
    
      fill(128, 0, 0, 32);
        rect(0, 0, width, height);
        textAlign(CENTER);
        textSize(32);
        fill('yellow');
        text("GAME OVER", width/2, height/2);
        noLoop();
    }
    if (this.x > width) {
      
      fill(128, 0, 0, 32);
        rect(0, 0, width, height);
        textAlign(CENTER);
        textSize(32);
        fill('yellow');
        text("GAME OVER", width/2, height/2);
        noLoop();
    }
    if (dist(myCircle.x+myCircle.r, myCircle.y+myCircle.r, playerx, playery+25)<=20){
      this.xSpeed *= -1;
      this.color = color(random(255),
        random(255),
        random(255));
    }
if (dist(myCircle.x+myCircle.r, myCircle.y+myCircle.r, opponentx, opponenty+25)<=15){
      this.xSpeed *= -1;
      this.color = color(random(255),
        random(255),
        random(255));
    }
    this.y += this.ySpeed;
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= random(-1.5,-1);
      this.color = color(255, 255, 255);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r);
  }
}

function handleKeyboard() {
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      Opponent.move(0, -5);
    } else if (keyCode === DOWN_ARROW) {
      Opponent.move(0, 5);
    } else if (keyCode == CONTROL) {
      myPlayer.move(0, 5);
    } else if (keyCode == SHIFT) {
      myPlayer.move(0, -5);
    }
  }
}