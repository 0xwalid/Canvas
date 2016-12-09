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
    constantFloor: 448,
    jumpLimit: 220
}
let globalPosition = 350; 
let keysObj = {};
let moveSpeed = 2;
let isLoading = true;
let audio = new Audio("Music/marioMusic.mp3"); //marioMusic.mp3
audio.volume = 0.03;


window.addEventListener("keydown", eventHandler);
window.addEventListener("keyup", eventHandler);




//Start Loading Animation 
///////////////////////////////////////////////////////////////////////////////////////////////


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

    
////////////////////////////////////////////////////////////////////////////////////////////

function controlsInstructions() {
    ctx.font = "45px monospace";
    ctx.fillStyle = "white";
    ctx.fillText("You can Start to Play",80,250); 
    ctx.font ="30px monospace";
    ctx.fillText("Use Left, Right Arrow and Space.",80,300);  
    loadingCounter++;

    if (globalPosition > 405) {
        loadingCounter = 2000;
    }
}

function eventHandler(event) {
    if (event.type == "keydown") {
        keysObj[event.code] = true;
    }
    if (event.type == "keyup") {
        delete keysObj[event.code];
    }
}

function updateContlos() { 
    if (keysObj["ArrowRight"] || keysObj["ArrowLeft"]) {        
        isMove = true;
    } else {
        isMove = false;
    }

    if (keysObj["ArrowRight"] && marioObj.translateX < 2940) {         
        if (marioObj.x >= 580) {            
            marioObj.translateX += moveSpeed; 
        } else if (marioObj.x < 580) {
            marioObj.x += moveSpeed;   
        } 
        globalPosition += moveSpeed; 
        marioObj.scaleRight = 1;           
    } 
    if (keysObj["ArrowLeft"]) {       
        if (marioObj.translateX >= moveSpeed) {
            marioObj.translateX -= moveSpeed;
        } else if (marioObj.x >= moveSpeed){
            marioObj.x -= moveSpeed;            
        }
        if (globalPosition > 0) {
            globalPosition -= moveSpeed;
        }
        marioObj.scaleRight = -1; 
    } 
    if (keysObj["Space"]) {           
        if (marioObj.y == marioObj.constantFloor ) { 
            marioObj.jumpStart = true; 
        }           
        if (marioObj.y < marioObj.constantFloor ) { 
            marioObj.onGround = false;
        }
    }
}

//Background
function drawBackground(x,y){
        ctx.drawImage(gameBackground,x,y,3392,224,0,0,(3392*2.68),(224*2.68));
        ctx.fillRect(0,0,50,50);
}

function marioStepsAndRotate() {
    ctx.save();
    let x = marioObj.x;
    if (marioObj.scaleRight == -1) {
        x += 68;
    }
    ctx.translate(x, marioObj.y);
    ctx.scale(marioObj.scaleRight,1)
    if (marioObj.onGround == false) {
        ctx.drawImage(marioImg1,0,0,34,34,0,0,(34*2),(34*2));
    } else if (globalPosition % 4 == 0 && isMove == true) {
        ctx.drawImage(marioImg1,0,0,34,34,0,0,(34*2),(34*2));
    } else if (globalPosition % 2 == 0) {
        ctx.drawImage(marioImg,0,0,34,34,0,0,(34*2),(34*2));
    }    

    ctx.restore();
}

let jumpUpOrDown = "up"; 
function marioPhysics() {    
        if (marioObj.jumpStart == true && keysObj["Space"] == true && jumpUpOrDown == "Up") {   //jump
            marioObj.y -= 7;
            if (marioObj.y <= marioObj.jumpLimit) {
                marioObj.jumpStart = false;
            }
        } else if (marioObj.onGround == false && marioObj.y < marioObj.constantFloor) {    //falling
           marioObj.y += 5; 
           jumpUpOrDown = "Down";
        } else if (marioObj.y >= marioObj.constantFloor) {         // set mario on floor when falling
            marioObj.y = marioObj.constantFloor;
            marioObj.onGround = true; 
            jumpUpOrDown = "Up";
        }       
}


// BricksCoin , kasichki, trabnaPregrada, talbi, vragove
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
  

 let cointMoveUp = 340; 
 let marioHit = false;
 function targetBrickCoin(bricksX, bricksLength, setJumpLimit) {
    if (globalPosition > bricksX && globalPosition < bricksLength + bricksX) {
        marioObj.jumpLimit = setJumpLimit;
        if (globalPosition >=  bricksX && globalPosition < bricksLength + bricksX) {
            ctx.save();
            if (marioObj.y >= 400 && marioObj.y < 410) {
                marioHit = true; 
            }
            if ( marioHit == true && cointMoveUp > 280) {
                ctx.font = "20px sanserif";
                ctx.fillText("COIN", marioObj.x , cointMoveUp);
                cointMoveUp -= 1;
            }            
            ctx.restore();
        }
    } else {
        marioObj.jumpLimit = 220;
        cointMoveUp = 340;
        marioHit = false;
    }
}

function jbricksObjectes() {
    if (globalPosition > 0 && globalPosition <= 630)
        targetBrickCoin(600, 30, 370);
    if (globalPosition > 630 && globalPosition <= 710)
        targetBrickCoin(690,20,370);
    if (globalPosition > 710 && globalPosition <= 750) {
        targetBrickCoin(720,20,370);

        // if() rof second floor
    }    
    
}


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function draw() { 
    ctx.beginPath();
    ctx.clearRect(0,0,1200,600);
    //ctx.translate(0,0);
    drawBackground(marioObj.translateX, marioObj.translateY);
    marioStepsAndRotate();
    marioPhysics();
    ctx.fillText("globalPosition:" + globalPosition, 70,50);
    ctx.fillText("MarioObj.x : " + marioObj.x, 70, 80);
    ctx.fillText("MarioObj.translateX : " + marioObj.x, 70, 110);
    jbricksObjectes();

    ctx.closePath();
}
//Main Game Loop
let loadingCounter = 0;

function mainGameLoop() {    
    updateContlos();
    draw();
    if (isLoading == false && loadingCounter < 2000) {
        controlsInstructions();
        clearInterval(startLoading);
    }  
    audio.play(); //for mario music
    //second part 
    


    //requestAnimationFrame(mainGameLoop);  
}
//mainGameLoop();

let startLoading = setInterval(drawAnimationLoading, 50);
setTimeout(function() {setInterval(mainGameLoop, 10);}, 5000);



/*

draw background
keyboard hendler 
keys movement 
draw mario
move background and mario 


 */