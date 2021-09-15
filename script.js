//canvas setup
const canvas= document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const gameOverScreen=document.getElementById('game-over');
const playAgainBtn=document.getElementById("play-again")


canvas.width=1224
canvas.height=768

let score =0;
let gameFrame= 0;
let gameOver=false;
let feetW, bodyW, bodyH,dW,dH;
let feetH;
let enemySpriteW, enemySpriteH;
let paused=false;


const enemydead=new Image();
enemydead.src='blood.png';
enemydead.onload=function(){
    dW=this.width;
    dH=this.height;
    return true
}
const playerAnimationFeet=new Image();
playerAnimationFeet.src='feet\\survivor-run_0.png';

playerAnimationFeet.onload = function() {
    
    feetH=this.height;
    feetW=this.width;
    return true
  }


const playerAnimationBody=new Image();
playerAnimationBody.onload = function() {
    
    bodyH=this.height;
    bodyW=this.width;
    return true

  }
playerAnimationBody.src='body\\survivor-move_handgun_'+0+'.png'

const enemySprite=new Image();
enemySprite.src='zombiebasicwhole.png'
enemySprite.onload=function(){
    enemySpriteW=this.width;
    enemySpriteH=this.height;
    return true
}
//keys interactivity
window.addEventListener('keydown', function (e) {
    var key = e.keyCode;
    if (key === 27)// esc key
    {
        paused=!paused
    }
    });

var keys = {};
window.addEventListener('keydown', function (e) {
keys[e.keyCode] = true;
e.preventDefault();
});
window.addEventListener('keyup', function (e) {
delete keys[e.keyCode];
});


let canvasPosition=canvas.getBoundingClientRect();
const mouse={
    x:canvas.width/2,
    y:canvas.height/2,
    click:false
}

canvas.addEventListener('mousedown', function(event){
    mouse.x=event.x -canvasPosition.left;
    mouse.y=event.y-canvasPosition.top;
})

canvas.addEventListener('mousemove', function(e){
    mouse.click = true;
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('click',function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
   if (!paused)
    bullets.push(new Bullet(player1));
})
  


//player

class Player {
    constructor(){
        this.x=canvas.width/2;
        this.y=canvas.height/2;
        this.gunx=canvas.width/2;
        this.guny=canvas.height/2
        this.radius=30;
        this.angle=0;
        this.speed=8;
        this.Moving=false;
    }

    
    update(){
        const dx = this.x -mouse.x;
        const dy =this.y-mouse.y;
        const angle=Math.atan2(dy, dx)
        this.angle=angle;
        input(this)
        
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 50) this.y = 50;
        if (this.y > canvas.height) this.y = canvas.height;
        this.Moving=false
    }

    draw(){

        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.rotate(this.angle);
        
        const temp=3
        ctx.drawImage(playerAnimationFeet, 0-150+110, 0-40+32,feetW/temp,feetH/temp)
        if (playerAnimationBody.onload() )
            ctx.drawImage(playerAnimationBody, 0-155+110, 0-70+32,bodyW/temp,bodyW/temp)
        ctx.restore();
        
    }
}
var bullets=[];
class Bullet{
 
    constructor(player){
        this.x=player.x+(-player.radius)*Math.cos(player.angle+Math.PI/5.5);
        this.y=player.y+(-player.radius)*Math.sin(player.angle+Math.PI/5.5);
        // this.x=(player.radius)*Math.cos(-player.angle)+player.x-65;
        // this.y=(player.radius)*Math.sin(-player.angle)+player.y-15;
        this.speed=15;
        this.radius=5;
        this.angle=0//Math.atan2((mouse.y - player.y ),(mouse.x-player.x ))
        this.velX=Math.cos(Math.atan2((mouse.y - player.y  ),(mouse.x-player.x )))
        this.velY=Math.sin(Math.atan2((mouse.y - player.y ),(mouse.x-player.x)))
        this.distance
    }

    draw(){
        
        ctx.beginPath();
        ctx.fillStyle='black'
        ctx.arc(this.x,this.y,this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();       
    }

    update(enemy){
        
        const dx = this.x -mouse.x;
        const dy =this.y-mouse.y;
        const angle=Math.atan2(dy, dx)
        this.angle=angle;
        
        this.x+=this.speed*this.velX
        this.y+=this.speed*this.velY
        
    }

}
let ia=0
function handleAnimations(){
   
    if (65 in keys || 68 in keys|| 87 in keys|| 83 in keys){
      
        if (ia==19){
            ia =0
        }      

        ia++
        playerAnimationFeet.src= 'feet\\survivor-run_'+ia+'.png' 
        playerAnimationBody.src='body\\survivor-move_handgun_'+ia+'.png'
   
    }
     
            for (let i=0; i<enemyArray.length;i++){
                if (!enemyArray[i].dead){
                    if (gameFrame % 10==0){
                        enemyArray[i].frame++;
                        if (enemyArray[i].frameX==2 ){
                            enemyArray[i].frameX=0 
                        }else enemyArray[i].frameX++;
            
            
                    
                        if (enemyArray[i].frame==4){
                            enemyArray[i].frameY=1
                        }else enemyArray[i].frameY=0
                        if(enemyArray[i].frame>=5){
                            enemyArray[i].frame=0
                        }
                    }
                    
                } 
                else{
                    if (gameFrame % 3==0){
                        enemyArray[i].frame++;
                        if (enemyArray[i].frameX==3 ){
                            enemyArray[i].frameX=0 
                        }else enemyArray[i].frameX++;
            
            
                    
                        if (enemyArray[i].frame==4){
                            enemyArray[i].frameY=1
                        }else if (enemyArray[i].frame==8){
                            enemyArray[i].frameY=2
                        }
                        // else
                        //     enemyArray[i].frameY=3
                        if(enemyArray[i].frame>=11){
                            enemyArray.splice(i,1) 
                            i--
                        }
                    }

           
               }
                
            }
  
}

function handleBullets(){
    if (  bullets.length>0  ){
        //Bullet colide with enemies
        for (let i=0 ;i< bullets.length;i++){
            if (bullets[i].x>canvas.width || bullets[i].x<0 ||bullets[i].y>canvas.height || bullets[i].y<0){
                bullets.splice(i,1)
                i--  
                break 
            }  
            bullets[i].update()
            bullets[i].draw()
            for(let j=0;j<enemyArray.length; j++){
                let dist=Math.sqrt(Math.pow(bullets[i].x -enemyArray[j].x, 2) + Math.pow(bullets[i].y - enemyArray[j].y, 2))
                if (dist-bullets[i].radius-enemyArray[j].radius<=0 && !enemyArray[j].dead){
                     bullets.splice(i,1)
                     i--;
                    
                     if(!enemyArray[j].dead){
                        score++
                        enemyArray[j].dead=true; 
                        enemyArray[j].frame=0
                        enemyArray[j].frameX=0
                        enemyArray[j].frameY=0
                     }
                    
                    //  enemyArray[j].radius=0;
                    // enemyArray.splice(j,1) 
                    // j--; 
                     
                    
                    break;
                }
            
            } 
                         
        }   
    }
}

function input(player){
    if (65  in keys) {
        player.x -= player.speed;
        // player.gunx -= player.speed;
       
        }
        if (68 in keys) {
        player.x += player.speed;
        // player.gunx += player.speed;
        }
        if (87 in keys) {
        player.y -= player.speed;
        // player.guny -= player.speed;            
        }
        if (83 in keys) {
        player.y += player.speed;
        // player.guny += player.speed;
        }
        // if (27 in keys)
        //     paused=!paused

}

//Enemies
var enemyArray=[];

class Enemy{

    constructor(){
        this.spriteW=303/4
        this.spriteH=(254/4)+16
        // athis.dw=this.dh=300
       // this.dh=105
    //    temp=x=-Math.random()*canvas.width +Math.random()*canvas.width*3
    //    tempy=-Math.random()*canvas.height+Math.random()*canvas.height*3;
       do {
        var tempx=-Math.random()*canvas.width +Math.random()*canvas.width*3
        var tempy=-Math.random()*canvas.height+Math.random()*canvas.height*3;
       }while((tempx>=0 && tempx<=canvas.width) && (tempy>=0 && tempy<=canvas.height));
        this.x=tempx//-Math.random()*canvas.width +Math.random()*canvas.width*3;
      
        this.y=tempy//-Math.random()*canvas.height+Math.random()*canvas.height*3;
        this.speed=3.5*Math.random()+1; 
        this.radius=25;
        this.frameY=0;
        this.frameX=0;
        this.frame=0;
        this.angle=0
        this.dead=false
        // this.angle=0;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle-Math.PI/-2);

        if (!this.dead)
            ctx.drawImage(enemySprite, this.frameX*this.spriteW, this.frameY*this.spriteH,this.spriteW, this.spriteH, 0-35,0-50, this.spriteW, this.spriteH)
        ctx.restore()
        if (this.dead)
            if (enemydead.onload)
                ctx.drawImage(enemydead, this.frameX*dW/4, this.frameY*dH/4,dW/4, dH/4, this.x-65,this.y-40, dW/4, dH/4)
        
    }

    update(player){

        const dx= player.x - this.x  
        const dy=player.y - this.y  
        const angle=Math.atan2(dy, dx)  
        this.angle=angle 
        if (!this.dead){
            this.x+=this.speed*Math.cos(angle)
            this.y+=this.speed*Math.sin(angle)
        }
       
        
        if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))<=player.radius+this.radius && !this.dead){
            handleGameOver();
        }
    }

}



function handleEnemies(player){
    enemiestospawn=8
    if (score>10 && score%10==0) enemiestospawn =(score)*2
    // if (score>=40) enemiestospawn=18
    if (  enemyArray.length<enemiestospawn && gameFrame % 10 == 0){
        enemyArray.push(new Enemy())
    }
    
    for (let i=0 ;i< enemyArray.length;i++){
        enemyArray[i].draw()
        enemyArray[i].update(player)
        // if (score%10==0)
        //     enemyArray[i].speed+=0.15
    }
}



var player1=new Player();

function handleGameOver(){
    gameOver=true;
    ctx.fillStyle='black'
    ctx.font = "50px arial";
    // ctx.fillText('GAME OVER',  450,400);
    gameOverScreen.style.display = "block";
    document.getElementById("points").innerHTML=score
   }


playAgainBtn.onclick= function(){
    console.log("play again")
    score=0
    player1=new Player();
    bullets=[]
    enemyArray=[];
    gameFrame= 0;
    gameOver=false
    gameOverScreen.style.display = "none";
    paused=false;
    animate();
}//playAgain()//function(){console.log("clicked")}
ctx.font = "30px arial";
//Animation loop

function animate(){ 
    if(!paused){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        player1.draw();
        player1.update() 
        handleEnemies(player1);
        handleBullets(enemyArray)
        handleAnimations()
        ctx.fillStyle='black'
        ctx.fillText('score: ' + score, 10, 40)
        gameFrame++;
    }else if (paused){
        
        ctx.fillStyle='black'
        ctx.fillText('PAUSED' , canvas.width/2-70,100,)
        // ctx.strokeText()
    }
    if (!gameOver ){
        
        requestAnimationFrame(animate)
    }
   
 }
 window.addEventListener('resize',function(){
    canvasPosition=canvas.getBoundingClientRect();
    
});


    animate();





