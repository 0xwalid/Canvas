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
let audio = new Audio("Music/marioMusic.mp3");
audio.volume = 0.03;

//Loading
let loadingCounter = 0;
function loading() { 
    if (loadingCounter < 5) {
        draw();
        ctx.font = "55px serif";
        ctx.fillStyle = "white";
        ctx.fillText("You can Start to Play",80,250); 
        ctx.font ="35px serof";
        ctx.fillText("Use ArrowRight, ArrowLeft and Space",80,300);  
        loadingCounter++;
    }
}
setInterval(loading,200);

window.addEventListener("keydown", eventHandler);
window.addEventListener("keyup", eventHandler);

function eventHandler(event) {
    if (event.type == "keydown") {
        keysObj[event.code] = true;
    }
    if (event.type == "keyup") {
        delete keysObj[event.code];
        isMove = false; 
    }
    updateContlos();
}

function updateContlos() {
    if (keysObj["ArrowRight"] && marioObj.translateX < 2940) {         
        if (marioObj.x >= 580) {            
            marioObj.translateX += 10;
            isMove = true;  
            globalPosition += 10;      
        } else if (marioObj.x < 580) {
            marioObj.x += 10;
            isMove = true; 
            globalPosition += 10;
        }  
        marioObj.scaleRight = 1;           
    } 
    if (keysObj["ArrowLeft"]) {       
        if (marioObj.translateX >= 10) {
            marioObj.translateX -= 10;
            isMove = true;
            globalPosition -= 10;
        } else if (marioObj.x >= 10){
             marioObj.x -= 10;
             isMove = true;
             globalPosition -= 10;
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
    draw();
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
        x += 80;
    }
    ctx.translate(x,y);
    ctx.scale(scaleRight,1)
    if (globalPosition % 20 == 0) {
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
function mainGameLoop() {
    draw();
    audio.play();
    

    //requestAnimationFrame(mainGameLoop);  
}
mainGameLoop();

//setInterval(mainGameLoop, 10);




/*

draw background
keyboard hendler 
keys movement 
draw mario
move background and mario 


 */