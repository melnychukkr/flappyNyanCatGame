var canvasVar = document.getElementById("canvas");
var context = canvasVar.getContext("2d");

// load images

var cat = new Image();
var background = new Image();
var footer = new Image();
var topPipe = new Image();
var bottomPipe = new Image();
var mainPage = new Image();
var gameOver = new Image();

cat.src = "images/kot.png";
background.src = "images/tlo.png";
footer.src = "images/footer.png";
topPipe.src = "images/topPipe.png";
bottomPipe.src = "images/bottomPipe.png";
mainPage.src = "images/main.png";
gameOver.src = "images/gameOver.png"; 


// some variables

var gap = 85;
var constant;

var cX = 10;
var cY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var scor = new Audio();
var nyan = new Audio();

scor.src = "sounds/score.mp3";
nyan.src = "sounds/nya.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    cY -= 25;
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : canvasVar.width,
    y : 0
};

// draw images

function draw(){
    
    context.drawImage(background,0,0);
    nyan.play();
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = topPipe.height+gap;
        context.drawImage(topPipe,pipe[i].x,pipe[i].y);
        context.drawImage(bottomPipe,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : canvasVar.width,
                y : Math.floor(Math.random()*topPipe.height)-topPipe.height
            }); 
        }

        // detect collision
        
        if( cX + cat.width >= pipe[i].x && cX <= pipe[i].x + topPipe.width && (cY <= pipe[i].y + topPipe.height || cY+cat.height >= pipe[i].y+constant) || cY + cat.height >=  canvasVar.height - footer.height){
                location.reload();
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
    }

    context.drawImage(footer,0,canvasVar.height - footer.height);
    
    context.drawImage(cat,cX,cY);
    
    cY += gravity;
    
    context.fillStyle = "#ffffff";
    context.font = "20px Courier";
    context.fillText("Score : "+score,10,canvasVar.height-20);

    requestAnimationFrame(draw);
    
}
  draw();