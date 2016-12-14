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
            marioObj.y -= 1;  //7
            audioJump.play();
            if (marioObj.y <= marioObj.jumpLimit) {
                marioObj.jumpStart = false;
            }
        } else if (marioObj.onGround == false && marioObj.y < marioObj.constantFloor) {    //falling
           marioObj.y += 2;  //5
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
    coin9: false,
    cloin10: false
}
let audioJump = new Audio("Music/jump.wav"); 
let audioCoin = new Audio("Music/coin.mp3");

function targetBrickCoin(bricksX, bricksLength, setJumpLimit, name) {
    if (globalPx > bricksX && globalPx < bricksLength + bricksX) {
        marioObj.jumpLimit = setJumpLimit;
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
        marioObj.jumpLimit = 220;
        cointMoveUp = 340;
    }

    //left, right and top 
}

function targetBrickSimple(bricksX, bricksLength, setJumpLimit) {
    if (globalPx > bricksX && globalPx < bricksLength + bricksX) {
        marioObj.jumpLimit = setJumpLimit;
        if (globalPx >=  bricksX && globalPx < bricksLength + bricksX) {
            ctx.save();
                
        }
        ctx.restore();
    } else {
        marioObj.jumpLimit = 220;
        cointMoveUp = 340;
        marioHit = false;
    }
}

function drawCoin(staticPlace, name) {
    if (hitOnce[name] === true) {
        ctx.save();
        ctx.translate(staticPosition,0);
        ctx.font = "20px sanserif";                
        ctx.fillText("COIN",staticPlace,cointMoveUp);
        ctx.fillText("coin1" + hitOnce[name], 150, 500);
        ctx.fillStyle = "blue";
        ctx.fillRect(staticPlace,343,43,43);
        ctx.fillStyle = "rgba(255, 165, 0, 0.8)";
        ctx.fillRect(staticPlace + 10.75,340 + 12.75,21.5,21.5);
        cointMoveUp -= 1;
        ctx.restore();        
    }            
}   

function bricksObjectes() { 
    if (globalPx > 0 && globalPx <= 728) {
        targetBrickCoin(660, 80, 370, "coin1"); 
    } else if (globalPx > 830 && globalPx <= 875) {
        targetBrickSimple(832,80,370);
    } else if (globalPx >875 && globalPx <= 935) { 
        targetBrickCoin(875, 80, 370, "coin2");       
    } else if (globalPx > 935 && globalPx <= 963) {
        targetBrickSimple(915,80,370);
        
        // if() rof second floor
    } else if (globalPx > 963 && globalPx <= 1021) {
        targetBrickCoin(963, 80, 370, "coin3");
        
    } else if (globalPx > 1021 && globalPx <= 1085) {
        targetBrickSimple(1001,80,370);
    } else if (globalPx > 3269 && globalPx <= 3315) {
        targetBrickSimple(3269, 80, 370);
    } else if (globalPx > 3315 && globalPx <= 3370 ) {
        targetBrickCoin(3315, 80, 370, "coin4");
    } else if (globalPx > 3370 && globalPx <= 3420 ) {
        targetBrickSimple(3370, 80, 370);
    } else if (globalPx > 3997 && globalPx <= 4066) {
        targetBrickSimple(3997, 80, 370);
    } else if (globalPx > 4254 && globalPx <+ 4324) {
        targetBrickSimple(4254, 80, 370);
    } else if (globalPx > 4510 && globalPx <= 4580) {
        targetBrickCoin(4510, 80, 370, "coin5");
    } else if (globalPx > 4639 && globalPx <= 4708) {
        targetBrickCoin(4639, 80, 370, "coin6");
    } else if (globalPx > 4767 && globalPx <= 4840) {
        targetBrickCoin(4767, 80, 370, "coin7");
    } else if (globalPx > 5025 && globalPx <= 5093) {
        targetBrickSimple(5025, 80, 370);
    } else if (globalPx > 5495 && globalPx <= 5612) {
        targetBrickSimple(5495, 120, 370);
    } else if (globalPx > 7164 && globalPx <= 7362) {
        targetBrickSimple(7164, 200, 370);
        if (globalPx > 7255 && globalPx <= 7305)
            targetBrickCoin(7255, 80, 370, "coin8");
    }else {
        marioObj.jumpLimit = 220;
    }


    drawCoin(685, "coin1");
    drawCoin(898, "coin2");
    drawCoin(986, "coin3"); 
    drawCoin(3338, "coin4"); 
    drawCoin(4510 + 25, "coin5");
    drawCoin(4639 + 25, "coin6");
    drawCoin(4767 + 25, "coin7");
    drawCoin(7255 + 20, "coin8");


    
    


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
    //ctx.fillText("MarioObj.translateX : " + marioObj.x, 70, 110);
    ctx.fillText("staticPosition: " + staticPosition, 70,120 );
    ctx.fillText("globalPx : " + globalPx, 70, 320);

   

    //600px line
    ctx.moveTo(625,0);
    ctx.lineTo(625,600);
    ctx.stroke();
    ctx.fillText("625px",645,30); 

    //X 385px  line
    ctx.moveTo(0, 344);
    ctx.lineTo(1200, 344);
    ctx.stroke();
    ctx.fillText("344px", 30, 370);


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

let startLoading = setInterval(drawAnimationLoading, 50);
setTimeout(function() {setInterval(mainGameLoop, 10);}, 5000);
