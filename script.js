//canvas setup
const canvas= document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=1224
canvas.height=768

let score =0;
let gameFrame= 0;
let gameOver=false;
let feetW, bodyW, bodyH;
let feetH;
let enemySpriteW, enemySpriteH;

//////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
const enemydead=new Image();
enemydead.src='zombiedeath.png';
const playerAnimationFeet=new Image();
playerAnimationFeet.src='feet\\survivor-run_0.png';

playerAnimationFeet.onload = function() {
    
    feetH=this.height;
    feetW=this.width;

  }
// console.log(playerAnimationFeet.onload.width)

const playerAnimationBody=new Image();
playerAnimationBody.onload = function() {
    
    bodyH=this.height;
    bodyW=this.width;

  }
playerAnimationBody.src='body\\survivor-move_handgun_'+0+'.png'

const enemySprite=new Image();
enemySprite.src='zombiebasic.png'
// enemySprite.onload=function(){
//     enemySpriteW=this.width;
//     enemySpriteH=this.height;
// }
//keys interactivity
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
   
    bullets.push(new Bullet(player1));
})
  


//player

class Player {
    constructor(){
        this.x=canvas.width/2;
        this.y=canvas.height/2;
        this.gunx=canvas.width/2-45;
        this.guny=canvas.height/2-15
        this.radius=30;
        this.angle=0;
        this.speed=8;
        this.Moving=false;
        
        // this.frameX=0; 
        // this.frameY=0; 
        // this.frameX=0; 
        // this.spriteWidth=498;
        // this.srpiteHeight=327; 
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

        ctx.beginPath();
        ctx.fillStyle='cyan'
        ctx.arc(0,0,this.radius, 0, Math.PI*2);
        // ctx.arc(this.x, this.y,this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle='red'
        // ctx.arc(0,0,this.radius, 0, Math.PI*2);
        ctx.arc(0-45, 0-15,5, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
      
        const temp=3
        ctx.drawImage(playerAnimationFeet, 0-150+110, 0-40+32,feetW/temp,feetH/temp)
        ctx.drawImage(playerAnimationBody, 0-155+110, 0-70+32,bodyW/temp,bodyW/temp)
        // ctx.drawImage(playerAnimationFeet, this.x-150+110, this.y-40+32,feetW/temp,feetH/temp)
        // ctx.drawImage(playerAnimationBody, this.x-155+110, this.y-70+32,bodyW/temp,bodyW/temp)
        // console.log(this.Moving)
        ctx.restore();
       
    }
}
const bullets=[];
class Bullet{
 
    constructor(player){
        this.x=player.x;
        this.y=player.y;
        // this.x=player.radius*Math.cos(player.angle)
        // this.y=player.radius*Math.sin(player.angle)
        this.speed=15;
        this.radius=5;
        this.angle=Math.atan2((mouse.y - player.y ),(mouse.x-player.x ))
        this.velX=Math.cos(Math.atan2((mouse.y - player.y  ),(mouse.x-player.x )))
        this.velY=Math.sin(Math.atan2((mouse.y - player.y ),(mouse.x-player.x)))
        this.distance
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.fillStyle='black'
        ctx.arc(0,0,this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(enemy){
        
        const dx = this.x -mouse.x;
        const dy =this.y-mouse.y;
        const angle=Math.atan2(dy, dx)
        // this.angle=angle;
        this.x+=this.speed*this.velX
        this.y+=this.speed*this.velY
        // const dx= this.x-enemy.x
        // const dy= this.y-enemy.y
        // this.distance=Math.sqrt(dx*dx+dy*dy)
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
    if (gameFrame % 10==0){
     
            for (let i=0; i<enemyArray.length;i++){
                // if (!enemyArray[i].dead){
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
                // } 
            //     else{
            //         enemyArray[i].speed=0
            //         // enemyArray[i].velY=0
            //         enemyArray[i].frame=0
            //         enemyArray[i].frameX=0
            //         enemyArray[i].frameY=0
            //         enemyArray[i].frame++
            //         enemyArray[i].frameX++

            //         if (enemyArray[i].frame>=4)
            //             enemyArray.splice(i,1) 
           
            //    }
                
            }
        
       
    }

        
}

function handleBullets(){
    if (  bullets.length>0 ){
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
                if (dist-bullets[i].radius-enemyArray[j].radius<=0){
                     bullets.splice(i,1)
                     i--;
                    
                    // enemyArray[j].dead=true; 
                    enemyArray.splice(j,1) 
                    j--; 
                     
                     score++
                    break;
                }
            
            } 
                         
        }   
    }
}

function input(player){
    if (65  in keys) {
        player.x -= player.speed;

       
        }
        if (68 in keys) {
        player.x += player.speed;

        }
        if (87 in keys) {
        player.y -= player.speed;

        }
        if (83 in keys) {
        player.y += player.speed;

        }

}

//Enemies
const enemyArray=[];

class Enemy{

    constructor(){
        this.spriteW=233/3
        this.spriteH=166/2
        //this.dw=328/4
       // this.dh=105
        this.x=-Math.random()*canvas.width +Math.random()*canvas.width*3;
      
        this.y=-Math.random()*canvas.height+Math.random()*canvas.height*3;
        this.speed=3*Math.random(); 
        this.radius=20;
        this.frameY=0;
        this.frameX=0;
        this.frame=0;
        this.angle=0
        //this.dead=false
        // this.angle=0;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle-Math.PI/-2);


        //if(this.dead)
           // ctx.drawImage(enemydead, this.frameX*this.dW/4, this.frameY*this.dh,this.dw, this.dh, 0-45,0-50, this.dw, this.dh)
        //else 
            ctx.drawImage(enemySprite, this.frameX*this.spriteW, this.frameY*this.spriteH,this.spriteW, this.spriteH, 0-45,0-50, this.spriteW, this.spriteH)

            ctx.restore()
    }

    update(player){

        const dx= player.x - this.x  
        const dy=player.y - this.y  
        const angle=Math.atan2(dy, dx)  
        this.angle=angle 
        this.x+=this.speed*Math.cos(angle)
        this.y+=this.speed*Math.sin(angle)
        if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))<=player.radius+this.radius){
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
    }
}



const player1=new Player();

function handleGameOver(){
    ctx.fillStyle='black'
    ctx.font = "50px arial";
    ctx.fillText('GAME OVER',  450,400);
    gameOver=true;

}

ctx.font = "30px arial";
//Animation loop

function animate(){ 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player1.draw();
    player1.update() 
    handleEnemies(player1);
    handleBullets(enemyArray)
    handleAnimations()
    ctx.fillStyle='black'
    ctx.fillText('score: ' + score, 10, 40)
    gameFrame++;
    if (!gameOver){
        requestAnimationFrame(animate)
    }
 }
 window.addEventListener('resize',function(){
    canvasPosition=canvas.getBoundingClientRect();
    
});

animate();

