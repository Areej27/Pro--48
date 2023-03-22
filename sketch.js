var thief, thiefrunning, edges;
var ground, invground;
var bg, bgimg;
var barricade, bimg;
var obstaclesgroup;
var jump;
var crash;
var score = 0;

var PLAY= 1;
var END = 0;
var gameState = PLAY;
var gameover, oimg;

function preload(){
  thiefrunning = loadAnimation("boy1.png","boy2.png", "boy3.png", "boy4.png");
  bimg= loadImage("barricade.png");
  oimg= loadImage("gameover.png");
  bgimg= loadImage ("background.png");
  jump = loadSound("cartoonjump.mp3");
  crash = loadSound("fast-collision.mp3")
}

function setup(){
  createCanvas(1200,400);
  
  // creating trex
  thief = createSprite(90,180,20,50);
  thief.addAnimation("running", thiefrunning);
  thief.scale = 0.4;
  
  edges = createEdgeSprites();

  ground= createSprite(0, 385, 1200, 15);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  //adding scale and position to trex
  invground= createSprite(0, 398, 2000, 15);

  gameover = createSprite(600, 150, 200, 80);
  gameover.visible = false;
  gameover.addImage("boo", oimg);
  gameover.scale= 0.25;

  obstaclesgroup= createGroup();
}


function draw(){
  if (gameState == PLAY){
  
  //set background color 
  background(bgimg);

 // thief.debug = true;
  thief.setCollider("circle", 0, 0, 200);
  
  console.log(thief.y);

  ground.visible= false;
  invground.visible= false;
  
  if (ground.x <0){
  ground.x= ground.width/2
  }
  
  score = score + Math.round(getFrameRate()/60);

  if (obstaclesgroup.isTouching(thief)){
    crash.play();
    gameState = END;
    gameover.visible= true;
  }

  //jump when space key is pressed
  if(keyDown("space") && thief.y> 287){
    thief.velocityY = -10;
    jump.play();
  }

  
  thief.velocityY = thief.velocityY + 0.5;
  
  //stop trex from falling down
  thief.collide(invground);
  
  spawnObstacles(); 

  drawSprites();
  
   }

   else if (gameState == END) {

    thief.velocityX = 0;
    ground.velocityX = 0;
    obstaclesgroup.setVelocityXEach(0);

   }
   
   textSize (30);
   stroke("pink");
   strokeWeight(5);
   text ("Score: " + score, 1050, 27);

}

function spawnObstacles(){

  if (frameCount % 60 == 0){
    barricade = createSprite(1100, 360, 10, 10);
    barricade.velocityX = -8;
    barricade.addImage("obstacleb", bimg)
    barricade.scale = 0.17;
    obstaclesgroup.add(barricade);
  }


}
