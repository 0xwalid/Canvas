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
    constantFloor: 448, //448
    jumpLimit: 220    //220
}
let globalPosition = 350; 
let keysObj = {};
let moveSpeed = 2;
let isLoading = true;
let audio = new Audio("Music/marioMusic.mp3"); //marioMusic.mp3
//audio.volume = 0.03;


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
    if (globalPosition == 580) {
       staticPosition = 0;
    }
    // !!! globalPX 
    globalPx = (staticPosition - 600) * -1;

    if (marioObj.y ==+ 448) {
        marioObj.jumpLimit = 220;
        //increaseJumpLimit = 0;
    }


    if (keysObj["ArrowRight"] && marioObj.translateX < 2940) {         
        if (marioObj.x >= 580) {            
            marioObj.translateX += moveSpeed; 
            staticPosition -= 5.35;    //statk position 
        } else if (marioObj.x < 580) {
            marioObj.x += moveSpeed; 
        } 
        globalPosition += moveSpeed; 
        marioObj.scaleRight = 1; 
                 
    } 
    if (keysObj["ArrowLeft"]) {       
        if (marioObj.translateX >= moveSpeed) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;   //statk position 
        } else if (marioObj.x <= 580 && marioObj.x >= moveSpeed){
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
            marioObj.y -= 6;  //7
            audioJump.play();
            if (marioObj.y <= marioObj.jumpLimit) {
                marioObj.jumpStart = false;
            }
        } else if (marioObj.onGround == false && marioObj.y < marioObj.constantFloor) {    //falling
           marioObj.y += 5;  //5
           jumpUpOrDown = "Down";           
        } else if (marioObj.y >= marioObj.constantFloor) {         // set mario on floor when falling
            marioObj.y = marioObj.constantFloor;
            marioObj.onGround = true; 
            jumpUpOrDown = "Up";            
        }  
}


// Bricks, Coins , Tubes
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
let cointMoveUp = 340; 
let marioHit = false;
let hitOnce = {
    coin1: false,
    coin2: false,
    coin3: false,
    coin4: false,
    coin5: false,
    coin6: false,
    coin7: false,
    coin8: false,
    coinSecFloor1: false,
    coinSecFloor2: false,
    coinSecFloor3: false,
    coinSecFloor4: false,
    coinSecFloor5: false
}
let audioJump = new Audio("Music/jump.wav"); 
let audioCoin = new Audio("Music/coin.mp3");
let increaseJumpLimit = 0; 

function targetBrickCoin(bricksX, bricksLength, setJumpLimit, name) {
    if (globalPx > bricksX && globalPx < bricksLength + bricksX ) {
        marioObj.jumpLimit = setJumpLimit + increaseJumpLimit;
        if (globalPx >=  bricksX && globalPx < bricksLength + bricksX) {
            //ctx.save();
            if (marioObj.y >= 370 && marioObj.y < 373) {
                marioHit = true; 
                if (hitOnce[name] === false){
                    audioCoin.play();  
                }
                hitOnce[name] = true;              
            }        
        }
    } else {
        marioObj.jumpLimit = 240;
        cointMoveUp = 340;
        //increaseJumpLimit = 0;
    }

    //left, right and top 
}

function targetBrickCoinForSecondFloor(bricksX, bricksLength, name) {
    if (globalPx > bricksX && globalPx < bricksLength + bricksX) {
        marioObj.jumpLimit = 200;
        if (globalPx >=  bricksX && globalPx < bricksLength + bricksX) {
            if (marioObj.y >= 200 && marioObj.y < 210) {
                marioHit = true; 
                if (hitOnce[name] === false){
                    audioCoin.play();  
                }
                hitOnce[name] = true;              
            }        
        }
    } else {
        marioObj.jumpLimit = 220;
        cointMoveUp = 340;
    }

    //left, right and top 
}

function targetBrickSimple(bricksX, bricksLength, setJumpLimit) {
    if (globalPx > bricksX && globalPx < bricksLength + bricksX) {
        marioObj.jumpLimit = setJumpLimit + increaseJumpLimit;
        
    } else {
        marioObj.jumpLimit = 220;
        cointMoveUp = 340;
        marioHit = false;
    }
}
function drawCoin(staticPlace, name) {
    if (hitOnce[name] === true) {
        ctx.save();
        ctx.translate(staticPlace,0); //staticPosition
        //ctx.font = "20px sanserif";                
        //ctx.fillText("COIN",staticPosition,cointMoveUp); //staticPlace
        //ctx.fillText("coin1" + hitOnce[name], 150, 500);
        ctx.fillStyle = "red";
        //ctx.fillRect(staticPosition,343,43,43); //staticPlace
        //ctx.fillStyle = "rgba(255, 165, 0, 0.8)";
        ctx.fillRect(staticPosition + 10.75,340 + 12.75,21.5,21.5); //staticPlace
        cointMoveUp -= 1;
        ctx.restore();        
    }            
} 

function drawCoinForSecondFloor(staticPlace, y, name) {
    if (hitOnce[name] === true) {
        ctx.save();
        ctx.translate(staticPlace, 0); //staticPosition        
        ctx.fillStyle = "red";        
        ctx.fillRect(staticPosition + 10.75,y,21.5,21.5); //staticPlace
        cointMoveUp -= 1;
        ctx.restore();        
    }        
}  

function bricksObjectes() { 
    drawCoin(685, "coin1");
    drawCoin(898, "coin2");
    drawCoin(986, "coin3"); 
    drawCoin(3338, "coin4"); 
    drawCoin(4510 + 25, "coin5");
    drawCoin(4639 + 25, "coin6");
    drawCoin(4767 + 25, "coin7");
    drawCoin(7255 + 20, "coin8");
    drawCoinForSecondFloor(943, 182, "coinSecFloor1");

    //brick physics 
        if (globalPx > 655 && globalPx < 733) {         //brickCoin1 
            targetBrickCoin(660, 65, 370, "coin1");

            if (globalPx > 655 && globalPx <= 660 && 
                marioObj.y >= 276 && marioObj.y < 400) {
                marioObj.translateX -= moveSpeed;
                staticPosition += 5.35;  
                globalPosition -= moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false; 
                increaseJumpLimit = -325;              
            }
            if (globalPx > 660 && globalPx <= 728 &&  
                marioObj.y <= 274 && marioObj.y > 50) {  //<= 274 && marioObj.y > 220
                marioObj.constantFloor = 276; 
                increaseJumpLimit = -325;                
            }
            if (globalPx > 728 && globalPx < 733 && 
                marioObj.y >= 276 && marioObj.y < 400) {
                marioObj.translateX += moveSpeed;
                staticPosition -= 5.35;   
                globalPosition += moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false;
                increaseJumpLimit = -325;            
            } 
        } else if (globalPx >= 733 && globalPx <= 825 && marioObj.y < 350) {
             marioObj.constantFloor = 448;
            increaseJumpLimit = -350;
        }else if (globalPx > 825 && globalPx < 1076) { //assembly of 4 bricks coin2 & coin3
            targetBrickSimple(832,230,370);
            if (globalPx > 878 && globalPx < 920)
                targetBrickCoin(875, 60, 370, "coin2");
            else if (globalPx > 963 && globalPx < 1017)
                targetBrickCoin(963, 60, 370, "coin3");             

            if (globalPx > 825 && globalPx <= 832 && 
                marioObj.y >= 276 && marioObj.y < 400) {
                marioObj.translateX -= moveSpeed;
                staticPosition += 5.35;  
                globalPosition -= moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false;           
            }
            if (globalPx > 832 && globalPx <= 1060 && 
                marioObj.y <= 276 && marioObj.y > 220) {                
                marioObj.constantFloor = 276; 
                increaseJumpLimit = -325;
            }
            if (globalPx > 1060 && globalPx < 1076 && 
                marioObj.y >= 276 && marioObj.y < 400) {
                marioObj.translateX += moveSpeed;
                staticPosition -= 5.35; 
                globalPosition += moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false; 
            } 
        } else {
            marioObj.constantFloor = 448;
            increaseJumpLimit = 0;
            
        }


    //Second Floor !!!
        if (globalPx > 910 && globalPx < 990 && marioObj.y < 250) {  //brick 1 on Second Floor - coinSecFloor1
            targetBrickCoinForSecondFloor(915, 60, "coinSecFloor1");

            if (globalPx > 910 && globalPx <= 917 && 
                marioObj.y >= 105 && marioObj.y < 210) {
                marioObj.translateX -= moveSpeed;
                staticPosition += 5.35;  
                globalPosition -= moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false;  
                         
            }
            if (globalPx > 917 && globalPx <= 980 && 
                marioObj.y <= 173 && marioObj.y > 0) {
                marioObj.constantFloor = 105;
                marioObj.jumpLimit = 0; 
                increaseJumpLimit = -425;
            }
            if (globalPx > 980 && globalPx < 990 && 
                marioObj.y >= 105 && marioObj.y < 210) {
                marioObj.translateX += moveSpeed;
                staticPosition -= 5.35; 
                globalPosition += moveSpeed;
                marioObj.constantFloor = 448;
                marioObj.onGround = false; 
                
            } 
        }    
    


    staticBehaviour2(staticPosition, 1200); 
}

function tubes() {
    //first Tube     
    if (globalPx > 1170 && globalPx < 1284) {
        if (globalPx > 1170 && globalPx <= 1177 && marioObj.y > 362) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        } 
        if (globalPx > 1177 && globalPx <= 1258) {
            marioObj.constantFloor = 362;
            marioObj.jumpLimit = 160;
        } else {
            marioObj.constantFloor = 448;
            marioObj.onGround = false;
        }
        if (globalPx > 1258 && globalPx < 1284 && marioObj.y > 362) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448;
            marioObj.onGround = false;     
        }        
    } 
    //second Tube
    if (globalPx > 1605 && globalPx < 1715) {
        if (globalPx > 1605 && globalPx <= 1607 && marioObj.y > 321 ) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        }
        if (globalPx > 1607 && globalPx <= 1710) {
            marioObj.constantFloor = 321;
            marioObj.jumpLimit = 120;
        } else { 
            marioObj.constantFloor = 448;
            marioObj.onGround = false;             
        }
        if (globalPx > 1710 && globalPx <= 1715 && marioObj.y > 321) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448;
            marioObj.onGround = false;   
        }
    }
    //third Tube 
    if (globalPx > 1945 && globalPx < 2060) {
        if (globalPx > 1945 && globalPx <= 1950 && marioObj.y > 276) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        }
        if (globalPx > 1950 && globalPx <= 2052) {
            marioObj.constantFloor = 276;
            marioObj.jumpLimit = 80;
        } else {
            marioObj.constantFloor = 448;
            marioObj.onGround = false;
        }
        if (globalPx > 2052 && globalPx <= 2060 && marioObj.y > 276) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448;
            marioObj.onGround = false; 
        }
    }
    //fourth Tube
    if (globalPx > 2415 && globalPx < 2531) {
        if (globalPx > 2415 && globalPx <= 2420 && marioObj.y > 276) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        }
        if (globalPx > 2420 && globalPx <= 2525 ) {
            marioObj.constantFloor = 276;
            marioObj.jumpLimit = 80;
        } else {
            marioObj.constantFloor = 448;
            marioObj.onGround = false;
        }
        if (globalPx > 2525 && globalPx <= 2531 && marioObj.y > 276) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448;
            marioObj.onGround = false; 
        }
    }
    //fifth Tube 
    if (globalPx > 6950 && globalPx < 7068) {
        if (globalPx > 6950 && globalPx <= 6955 && marioObj.y > 362) { 
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        }
        if (globalPx > 6955 && globalPx <= 7060) {
            marioObj.constantFloor = 362;
        } else {
            marioObj.constantFloor = 448;
            marioObj.onGround = false;
        }
        if (globalPx > 7060 && globalPx <= 7068 && marioObj.y > 362) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448;
            marioObj.onGround = false; 
        }
    }
    //sixth Tube
    if ( globalPx > 7635 && globalPx < 7750) {
        if (globalPx > 7635 && globalPx <= 7640 && marioObj.y > 362) {
            marioObj.translateX -= moveSpeed;
            staticPosition += 5.35;  
            globalPosition -= moveSpeed;
        }
        if (globalPx > 7640 && globalPx <= 7725) {
            marioObj.constantFloor = 362;
        } else {
            marioObj.constantFloor = 448;
            marioObj.onGround = false;
        }
        if (globalPx > 7725 && globalPx <= 7750 && marioObj.y > 362) {
            marioObj.translateX += moveSpeed;
            staticPosition -= 5.35; 
            globalPosition += moveSpeed;
            marioObj.constantFloor = 448 - 43;
            marioObj.onGround = false;
        }
    }
}


//try static position !
let staticPosition = 0;
let globalPx;

//let staticPlace = 0;
    function staticBehaviour(staticPosition, staticPlace, img) {
        ctx.save();
        ctx.translate(staticPosition,200);
        ctx.drawImage(img,0,0,100,100,staticPlace,-150,100,100);
        ctx.fillRect(staticPlace,200,240,100);
        ctx.fillStyle = "black";
        ctx.fillText("Бяла Слатина",staticPlace + 20,250);
        ctx.restore();
    }

    function staticBehaviour2(staticPosition, staticPlace) {
        ctx.save();
        ctx.translate(staticPosition,200);
        ctx.fillRect(staticPlace,0,50,50);
        ctx.restore();

    }

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//ENEMIES

let enemyMouse = new Image(); 
enemyMouse.src = "Images/enemy.png";

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

function draw() { 
    ctx.beginPath();
    ctx.clearRect(0,0,1200,600);
    //ctx.translate(0,0);
    drawBackground(marioObj.translateX, marioObj.translateY);
    staticBehaviour(staticPosition,1380, enemyMouse);
    marioStepsAndRotate();
    marioPhysics();

    bricksObjectes();
    tubes();


    //counters 
    ctx.fillText("globalPosition:" + globalPosition, 70,50);
    ctx.fillText("MarioObj.x : " + marioObj.x, 70, 80);
    ctx.fillText("MarioObj.y : " + marioObj.y, 70,110);
    //ctx.fillText("MarioObj.translateX : " + marioObj.x, 70, 110);
    ctx.fillText("staticPosition: " + staticPosition, 70,150 );
    ctx.fillText("globalPx : " + globalPx, 800, 20);

   

    //600px line
    ctx.moveTo(625,0);
    ctx.lineTo(625,600);
    ctx.stroke();
    ctx.fillText("625px",645,30); 

    //X 215px  line
    ctx.moveTo(0, 215);
    ctx.lineTo(1200, 215);
    ctx.stroke();
    ctx.fillText("210px", 30, 235);

    //X 173px  line
    ctx.moveTo(0, 173);
    ctx.lineTo(1200, 173);
    ctx.stroke();
    ctx.fillText("173px", 30, 200);

    //X 344px  line
    //ctx.moveTo(0, 344);
    //ctx.lineTo(1200, 344);
    //ctx.stroke();
    //ctx.fillText("344px", 30, 370);

    //X 385px  line
    ctx.moveTo(0, 385);
    ctx.lineTo(1200, 385);
    ctx.stroke();
    ctx.fillText("385px", 30, 410);
    
    

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
    //audio.volume = 0.3;
    audio.play(); //for mario music    


    //requestAnimationFrame(mainGameLoop);  
}
//mainGameLoop();

var startLoading = setInterval(drawAnimationLoading, 50);
setTimeout(function() {setInterval(mainGameLoop, 10);}, 5000);
