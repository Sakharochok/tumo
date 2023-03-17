function setup() {
  createCanvas(400,400)
  Game.addCommonBalloon()
}

function draw() {
  background('#99CCFF')

  for (const balloon of Game.balloons){
      balloon.display()
      balloon.move(Game.score)

      if (balloon.y <= balloon.size/2 && balloon.color != '#99004C') {
        noLoop()
       // balloon.constructor.name != 'AgreeBalloon'
       clearInterval(interval)
        Game.balloons.length = 0
        let score = Game.score
        Game.score = '' 
         background('#CC99FF')

         textSize(64)
         fill('white')
         textAlign(CENTER, CENTER)
         text('FINISH', 200, 200)
         textSize(34)
         text('Score: ' + score, 200, 300)
      }
  }
  textSize(32)
  fill('black')
  text(Game.score, 20, 40) 

  if(frameCount % 80 == 0){
      Game.addCommonBalloon()
  }
  if(frameCount % 150 == 0){
    Game.addUniqBalloon()
  }
  if(frameCount % 70 == 0){
    Game.addAngreeBalloon()
  }

  }



function mousePressed() {
  Game.checkIfBalloonBurst()
  if (!isLooping()) {
    loop()
    Game.countOfBlack = 0;
    Game.countOfBlack = 0;
    Game.countOfGreen = 0;
    Game.countOfClick = 0;
    Game.score = 0

      interval = setInterval(() =>{
      Game.sendStatistics()
    }, 5000)
  }
  Game.countOfClick +=1
  Game.checkIfBalloonBurst()
}

let interval = setInterval(() =>{
  Game.sendStatistics()
}, 5000)

class Game{
static balloons = []
static score = 0
static countOfGreen = 0
static countOfBlue = 0
static countOfBlack = 0
static countOfClick = 0

static sendStatistics(){
  let stats = {
  score: this.score,
  countOfGreen: this.countOfGreen,
  countOfBlue: this.countOfBlue,
  countOfBlack: this.countOfBlack,
  countOfClick: this.countOfClick
  }
  fetch('/status',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stats)
  })
}

static addCommonBalloon() {
  let balloon = new CommonBalloon('#FFCCFF', 50)
  this.balloons.push(balloon)
}

static addUniqBalloon() {
  let balloon = new UniqBalloon('#CCFFFF', 30)
  this.balloons.push(balloon)
}

static addAngreeBalloon() {
  let balloon = new AngreeBalloon('#99004C', 50)
  this.balloons.push(balloon)
}

static checkIfBalloonBurst() {
  this.balloons.forEach((balloon, index) => {
      let distance = dist(balloon.x, balloon.y, mouseX, mouseY);
      if (distance <= balloon.size/2) {
          balloon.burst(index)
      }
  })
}
}

class CommonBalloon{
constructor(color, size) {
 this.x = random(width)
 this.y = random(height - 10, height + 50)
 this.color = color
 this.size = size
}

display(){
  fill(this.color)
  ellipse(this.x, this.y, this.size)
  line(this.x, this.y + this.size/2, this.x, this.y + 2 * this.size)
}
move(score) {
  if (score < 100) {
    this.y -= 1
  } else if (score > 100 && score <200) {
    this.y -= 1.5
  } else {
    this.y -= 2
  }
  
}

burst(index) {
  Game.balloons.splice(index, 1)
  Game.score += 1
  Game.countOfBlack +=1
}
}


class UniqBalloon extends CommonBalloon{
  constructor(color, size) {
      super(color, size)
  }
  burst(index) {
    Game.balloons.splice(index, 1)
    Game.score += 10
    Game.countOfGreen +=1
  }
}

class AngreeBalloon extends CommonBalloon{
  constructor(color, size) {
      super(color, size)
  }
  burst(index) {
    Game.balloons.splice(index, 1)
    Game.score -= 10
    Game.countOfBlack +=1
  }
}

