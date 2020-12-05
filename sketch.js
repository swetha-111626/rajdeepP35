const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;


var dog,dog2;
var food = 30 ;
var text1;      
var database;
var position;
var gameState = "start";

function preload()
{
	 dogimg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  engine = Engine.create();
  world = engine.world;
    
  database = firebase.database();

  dog = new Dog(250,250,120,120);
 
  
  Engine.run(engine);

  var dogo = database.ref("Food");
  dogo.on("value", readPosition);
  
}


function draw() {  
  rectMode(CENTER);
  background(46,139,87);



  textSize(25);
  fill(random(0, 255), random(0, 255), random(0, 255));
  text("NOTE:press up arrow key to feed the dog",20,40);
  text("FOOD REMAINING:"+position,120,180);

  if(position == 0){
   
    fill(random(0, 255), random(0, 255), random(0, 255));
    text("oh no! the stock is finished.",100,90);

    if(keyCode === 32){
      gameState == "start";
   }  
  }

  if(keyWentDown(UP_ARROW))
  { 
   
    writePosition(position);
    
    
  }

 

  

  dog.display();
 

 
  drawSprites();
  //add styles here

}

function readPosition(data){
  position = data.val();

}


function writePosition(data){
  if(data<=0){
    data=0
  }
  else{
    data = data-1;
  }
  var v = {
       'Food': data
  }
  database.ref("/").update(v) ;
}




  
        
      
      