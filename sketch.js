var tower,towerImage;
var ghost,ghost_running;
var gameState="play";
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invinsibleBlock,invisibleBlockGroup;
var spookYSound;

function preload(){
towerImage=loadImage("tower.png");
ghost_running=loadAnimation("ghost-jumping.png","ghost-standing.png");
doorImg=loadImage("door.png");
climberImg=loadImage("climber.png");
spookeySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
spookYSound.loop();
tower=createSprite(300,300,10,10);
tower.addImage(towerImage);
tower.x=tower.width/2;
tower.velocityY=1;

ghost=createSprite(300,300,10,10);
ghost.addAnimation("running",ghost_running);
ghost.scale=0.5;

doorsGroup=new Group();
climbersGroup=new Group();
invisibleBlockGroup=new Group();
}

function draw(){
background("black");

if(gameState==="play"){

if(tower.y>400){
     tower.y=300;
}

if(keyDown("space")){
    ghost.velocityY=-10;
}

ghost.velocityY=ghost.velocityY+0.5;

if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
}

if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
}
spawnDoors();

if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
    gameState="end";
    ghost.destroy();
}

if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0;
}

drawSprites();
}

if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over",230,250);
}
}


function spawnDoors(){
 if(frameCount%240===0){

    var door = createSprite(200, -50); 
    var climber = createSprite(200,10);
     var invisibleBlock = createSprite(200,15);

     
     invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
       door.x = Math.round(random(120,400));
        climber.x = door.x;
         invisibleBlock.x = door.x; 
         door.addImage(doorImg);
          climber.addImage(climberImg);
           door.velocityY = 1;
            climber.velocityY = 1;
             invisibleBlock.velocityY = 1;
              ghost.depth = door.depth;
      ghost.depth +=1;

 door.lifetime = 800;
  climber.lifetime = 800;
   invisibleBlock.lifetime = 800;

   doorsGroup.add(door);
    invisibleBlock.debug = true;
     climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock);

 }
}