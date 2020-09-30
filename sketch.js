var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score =0;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState=PLAY;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
 
  bananaGroup = new Group();
  obstacleGroup= new Group();
}


function draw() {
  background(220);
  
  text("Survival Time: "+survivalTime,200,50);
  text("Score: "+score,80,50);
  
  if (gameState===PLAY){
    if(keyDown("space")&& monkey.y >= 310){
        monkey.velocityY=-24;
}

  monkey.velocityY = monkey.velocityY + 1.9;    
    
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  food();
  obstacles();
  
  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+1;
  }   
    
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
} 
}
  
  else if (gameState === END) { 
    textSize(20);
    text("Game Over",150,200);
    
    bananaGroup.destroyEach();  
    obstacleGroup.destroyEach();
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
}   
  
  ground.x=ground.width/2;
  
  monkey.collide(ground);
 
  drawSprites();  
}

function food(){

 if(frameCount%80===0){
   var banana=createSprite(400,180,20,20);
   banana.addImage("moving",bananaImage);
   banana.y=Math.round(random(135,200));
   banana.velocityX=-8;
   banana.lifetime=55;
   banana.scale=0.1;
   bananaGroup.add(banana);
}
}

function obstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(400,330,202,20);
    obstacle.addImage("moving",obstacleImage);
    obstacle.velocityX=-7
    obstacle.lifetime=65;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
}
}



