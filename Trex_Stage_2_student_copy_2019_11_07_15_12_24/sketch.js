var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup, cloudImage;
var obstacleGroup, Ob1, Ob2, Ob3, Ob4, Ob5, Ob6;
var score



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  Ob1 = loadImage("obstacle1.png");
  Ob2 = loadImage("obstacle2.png");
  Ob3 = loadImage("obstacle3.png");
  Ob4 = loadImage("obstacle4.png");
  Ob5 = loadImage("obstacle5.png");
  Ob6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  score=0;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  
}

function draw() {
  background('blue');
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  score = score+Math.round(getFrameRate()/60);
  text("SCORE "+ score,500,50);
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1:obstacle.addImage(Ob1);
     break;
     case 2:obstacle.addImage(Ob2);
     break;
     case 3:obstacle.addImage(Ob3);
     break;
     case 4:obstacle.addImage(Ob4);
     break;
     case 5:obstacle.addImage(Ob5);
     break;
     case 6:obstacle.addImage(Ob6);
     break;
     default:break;
   }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
  }
}