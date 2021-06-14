var balloon,balloonImage1,balloonImage2;
var database , position;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;
  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError)
  
}

// function to display UI
function draw() {
  background(bg);
 if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale =  balloon.scale- 0.003
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale =  balloon.scale+ 0.003
  }

  drawSprites();
  fill(0);
  stroke(100);
  textSize(25);
  textFont("bold")
  text("Use the arrow keys to move Hot Air Balloon!",40,40);
}
}
function showError(){
  console.log('There is an error in writing the code')
}
function readPosition(data){
position = data.val()
balloon.x  = position.x
balloon.y = position.y
}
function writePosition(x,y){
database.ref('balloon/position').set({
  x : position.x + x,
  y : position.y + y 
})


}