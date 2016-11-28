let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameBackground = new Image();
gameBackground.src = "Images/gameBackground.png";
let marioImg = new Image();
marioImg.src = "Images/mario0.png";

//Background
function drawBackground() {	
    ctx.beginPath();
    ctx.clearRect(0,0,1200,600);
    ctx.translate(0,0);
    setInterval(function(){
    	ctx.drawImage(gameBackground,0,0,3392,224,0,0,(3392*2.68),(224*2.68));
    	ctx.drawImage(marioImg,0,0,34,34,200,448,(34*2),(34*2));  //mario 
    	ctx.fillRect(0,0,50,50);}
    	,50);    
    ctx.closePath();
}


//Main Game Loop
function mainGameLoop() {
	drawBackground();


	requestAnimationFrame();
}
mainGameLoop();


/*

draw background
keyboard hendler 
keys movement 
draw mario
move background and mario 


 */