var bg, bg_image;
var fg, fg_image;
var bird, bird_image;
var pipe1,pipeDown_image;
var pipe2,pipeUp_image;
var pipe1Group,pipe2Group;
var gameOverImg;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,r;
var PlayButtonImg;

function preload() {
bg_image=loadImage("background.png");
fg_image=loadImage("ground.png");
bird_image=loadImage("bluebird.png");
pipeDown_image=loadImage("PipeDown.png");
pipeUp_image=loadImage("PipeUp.png");
r = loadImage("restart.jpg");
gameOverImg=loadImage("GameOver.png");

}

function setup() {
  createCanvas(800,800);

  bg=createSprite(10, 200, 0, 0);
  bg.addImage(bg_image);

  fg=createSprite(144,800,20,20);
  fg.addImage(fg_image);

  bird=createSprite(50,300,10,10);
  bird.addImage(bird_image);

  pipe1Group=new Group();
  pipe2Group=new Group();

  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1;

  restart = createSprite(420,400,10,10);
  restart.addImage(r);
  restart.visible=false;
  restart.scale = 0.15;

  score=0;
}

function draw() {
  background(0,151,157); 
 
   if(gameState===PLAY) {

    bird.visible = true;
    gameOver.visible = false;
    restart.visible = false;

    fg.velocityX=-5;

    if(fg.x<100) {
      fg.x=fg.width/2;
    }
  
     if(keyDown("space")) {
       bird.y=bird.y - 15;
     }
      else{
       bird.velocityY=3;
    }
    
    pipe_move();
    pipe2Group.collide(fg);
    
  
    if(frameCount%10===0) {
      score++;
    }

    if(bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
      gameState = END;
    }
    if(bird.isTouching(fg)){
      gameState = END;
    }
  }
    else if(gameState===END){

    gameOver.visible = true;
      restart.visible = true;
      
    fg.velocityX =0;
    bird.visible = false;
    pipe1Group.depth = restart.depth;
    restart.depth = restart.depth + 1;
    pipe2Group.depth = restart.depth;
    restart.depth = restart.depth + 1;
    bird.x =50;
    bird.y =300;
    pipe1Group.setVelocityXEach(0);
    pipe2Group.setVelocityXEach(0);
    pipe1Group.setLifetimeEach(-1);
    pipe2Group.setLifetimeEach(-1);
    restart.visible=true;
    
    
  }
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    
  drawSprites();
   textSize(30);
   text("Score:" + score, 350,750);
  
  
  }


function pipe_move() {
  if(frameCount%75===0) {
    pipe1=createSprite(700,500,10,0);
    pipe1.addImage(pipeDown_image);
    pipe1.y=random(0,100);
    pipe1.velocityX=-6;
    pipe1.scale= 0.6;
    pipe1Group.add(pipe1);
    pipe1Group.setLifetimeEach(144);

    pipe2=createSprite(700,100,10,0);
    pipe2.addImage(pipeUp_image);
    pipe2.y=random(700,800);
    pipe2.velocityX=-6;
    pipe2.scale= 0.6;
    pipe2Group.add(pipe2);
    pipe2Group.setLifetimeEach(144);
    

  }
}

function reset() {
  gameState=PLAY;
  bird.visible=true;
  gameOver.visible=false;
  restart.visible=false;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
}