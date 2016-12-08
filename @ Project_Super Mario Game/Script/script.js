let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameBackground = new Image();
gameBackground.src = "Images/gameBackground.png";
let marioImg = new Image();
marioImg.src = "Images/mario0.png";
let marioImg1 = new Image();
marioImg1.src = "Images/mario1.png";
let counterSteps = 0; 
let isMove = false; 
let marioObj = {
    x:350,
    y:448,
    translateX: 0,
    translateY: 0,
    scaleRight: 1,
    jumpStart: false,
    onGround: true,
    constantFloor: 448
}
let globalPosition = 200; 
let keysObj = {};
let moveSpeed = 2;
let isLoading = true;
let audio = new Audio("Music/marioMusic.mp3");
audio.volume = 0.03;


window.addEventListener("keydown", eventHandler);
window.addEventListener("keyup", eventHandler);


//Start Loading Animation 
/////////////////////////////////////////////////////////////////////


let loadingSign = "Loading";
let percentage = 0;
let imgMarioLoading = new Image();
imgMarioLoading.src = "Images/marioLoading.png";
let progress = 0;

    function fillLoadingRect() {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 1200, 600);
    }       
    function drawLoadingPic() {

        ctx.drawImage(imgMarioLoading,0,0,600,606,850,150,400,400);
    } 
    function innerRect() {
        //fill red color
        ctx.fillStyle = 'red';
        ctx.fillRect(206 , 556, 20 + progress * 15.7, 18);
        //drawLoadingPic();

        //draw Loading sign
        ctx.fillStyle = 'white';    
        ctx.textAlign = "left";
        ctx.fillText(loadingSign, 200, 540);
        if (progress % 20 == 0)
            loadingSign += ".";
        progress++;

        //draw % value
        percentage += 2;
        if (percentage < 100  ) {
          ctx.fillStyle = 'blue';
          ctx.fillRect(350, 505, 100, 40);
          ctx.fillStyle = 'white';
          ctx.fillText(percentage + " %", 405, 540);
          ctx.save();
          ctx.font = "70px monospace";
          ctx.fillText("Super Mario Game", 250,200);
          ctx.font = "30px monospace";
          ctx.fillStyle = "#FEE40D";
          ctx.fillText("Edition Petyo Mitkov 2016", 370,250);
          ctx.restore();
        } else {
          ctx.fillStyle = 'blue';
          ctx.fillRect(350, 505, 100, 40);
          ctx.fillStyle = 'white';
          ctx.fillText("100%", 405, 540);
          ctx.save();
          ctx.font = "70px monospace";
          ctx.fillText("Super Mario Game", 250,200);
          ctx.font = "30px monospace";
          ctx.fillStyle = "#FEE40D";
          ctx.fillText("Edition Petyo Mitkov 2016", 370,250);
          ctx.restore();
        }
        //end loop
        if (progress == 50) {
            isLoading = false; 
            progress = 51;
            clearInterval(timer);
        }
    }   
    function drawAnimationLoading() {
        if (isLoading) {
            fillLoadingRect();
            ctx.fillStyle = "black";    
            ctx.fillRect(200, 550, 800, 30);
            ctx.fillStyle = "white";
            ctx.fillRect(205, 555, 791, 20);
            ctx.fillStyle = 'red';      
            ctx.font = "25px monospace";
            drawLoadingPic();
            innerRect();  
        }      
    }

    
/////////////////////////////////////////////////////////////////



function eventHandler(event) {
    if (event.type == "keydown") {
        keysObj[event.code] = true;
    }
    if (event.type == "keyup") {
        delete keysObj[event.code];
        isMove = false; 
    }
    //updateContlos();
}

function updateContlos() {
    if (keysObj["ArrowRight"] && marioObj.translateX < 2940) {         
        if (marioObj.x >= 580) {            
            marioObj.translateX += moveSpeed;
            isMove = true;  
            globalPosition += moveSpeed;      
        } else if (marioObj.x < 580) {
            marioObj.x += moveSpeed;
            isMove = true; 
            globalPosition += moveSpeed;
        }  
        marioObj.scaleRight = 1;           
    } 
    if (keysObj["ArrowLeft"]) {       
        if (marioObj.translateX >= moveSpeed) {
            marioObj.translateX -= moveSpeed;
            isMove = true;
            globalPosition -= moveSpeed;
        } else if (marioObj.x >= moveSpeed){
             marioObj.x -= moveSpeed;
             isMove = true;
             globalPosition -= moveSpeed;
        }
        marioObj.scaleRight = -1; 
    } 
    //under construction 
    if (keysObj["Space"]) {   
        if (marioObj.y == marioObj.constantFloor ) { 
            marioObj.jumpStart = true;            
        }
        if (marioObj.y < marioObj.constantFloor ) { 
            marioObj.onGround = false;
        }
    }
    //mainGameLoop(); 
    //draw();
}

//Background
function drawBackground(x,y){
        ctx.drawImage(gameBackground,x,y,3392,224,0,0,(3392*2.68),(224*2.68));
        ctx.fillRect(0,0,50,50);
}

function drawMario(x,y) {
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(-1,1);
    ctx.drawImage(marioImg,0,0,34,34,x,y,(34*2),(34*2));  //mario 
    ctx.restore();
}

function marioStepsAndRotate(scaleRight,x,y) {
    ctx.save();
    if (scaleRight == -1) {
        x += 70;
    }
    ctx.translate(x,y);
    ctx.scale(scaleRight,1)
    if (globalPosition % 4 == 0) {
        ctx.drawImage(marioImg1,0,0,34,34,0,0,(34*2),(34*2));
    } else {
        ctx.drawImage(marioImg,0,0,34,34,0,0,(34*2),(34*2));
    }
    ctx.restore();
}

//under construction 
function marioPhysics() {    
    if (marioObj.jumpStart == true && keysObj["Space"] == true) {   //jump
        marioObj.y -= 15;
        if (marioObj.y <= 300) {
            marioObj.jumpStart = false;
        }
    } else if (marioObj.onGround == false && marioObj.y < 448) {    //falling
        marioObj.y += 10;          
    } else if (marioObj.y >=448) {         // set mario on floor when falling
        marioObj.y = marioObj.constantFloor;
        marioObj.onGround = true; 
    }         
}

function draw() { 
    ctx.beginPath();
    ctx.clearRect(0,0,1200,600);
    ctx.translate(0,0);
    drawBackground(marioObj.translateX, marioObj.translateY);
    marioStepsAndRotate(marioObj.scaleRight, marioObj.x, marioObj.y);
    ctx.closePath();
}

//Main Game Loop
let loadingCounter = 0;

function mainGameLoop() {  
    clearInterval(startLoading);
    if (isLoading == false && loadingCounter < 1000) {
        draw();
        ctx.font = "55px serif";
        ctx.fillStyle = "white";
        ctx.fillText("You can Start to Play",80,250); 
        ctx.font ="35px serof";
        ctx.fillText("Use ArrowRight, ArrowLeft and Space",80,300);  
        loadingCounter++;

        if (globalPosition > 350)
            loadingCounter = 1000;
    } else {
        draw();
    }   
    updateContlos();
    audio.play();
    
    //requestAnimationFrame(mainGameLoop);  
}
//mainGameLoop();

let startLoading = setInterval(drawAnimationLoading, 50);
setTimeout(function() {setInterval(mainGameLoop, 10);}, 4000);






/*

draw background
keyboard hendler 
keys movement 
draw mario
move background and mario 


 */