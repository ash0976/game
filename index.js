const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

var jump = 0;

let dashCooldown = 0;
let dashtime = 0;

let imgwidth = 1088;
let imgheight = 960;

let deathcounter = 0;
//timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}


function respawnbox(){
    document.getElementById("respawn").style.display="flex"
}

const scaledcanvas = {
    width: canvas.width / 2,
    height: canvas.height / 2
}

const floorCollisions2d = []
for(let i = 0; i < floorCollisions.length; i += 34) {
    floorCollisions2d.push(floorCollisions.slice(i, i + 34))
}

const CollisionsBlocks = []
floorCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 202) {
            console.log('draw a block')
            CollisionsBlocks.push(
                new CollisionsBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                })
            )
        }
    })
})

const spikeCollisions2d = []
for(let i = 0; i < SpikeCollisions.length; i += 36) {
    spikeCollisions2d.push(SpikeCollisions.slice(i, i + 36))
}

const spikeCollisionsBlocks = []
spikeCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 203) {
            console.log('draw a block')
            spikeCollisionsBlocks.push(
                new CollisionsBlock({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    
                })
            )
        }
    })
})

console.log(spikeCollisions2d)


const gravity = 0.315 ;


const player = new Player({
    position: {
    x: 100,
    y: 840,
    },
    CollisionsBlocks,
    spikeCollisionsBlocks,
    imageSrc: 'img/pc/idle.png',
    framerate: 8,
    animations: {
        idle:{
        imageSrc: 'img/pc/idle.png',
        framerate: 8,
        framebuffer: 8
        },
        run:{
            imageSrc: 'img/pc/run.png',
            framerate: 8,
            framebuffer: 6
            },
        jump:{
            imageSrc: 'img/pc/jump.png',
            framerate: 2,
            framebuffer: 4
            },
        fall:{
            imageSrc: 'img/pc/fall.png',
            framerate: 2,
            framebuffer: 4
            },
        fallLeft:{
            imageSrc: 'img/pc/fallLeft.png',
            framerate: 2,
            framebuffer: 4
            },
        idleLeft:{
            imageSrc: 'img/pc/idleLeft.png',
            framerate: 8,
            framebuffer: 6
            },
        runLeft:{
            imageSrc: 'img/pc/runLeft.png',
            framerate: 8,
            framebuffer: 6
            },
        jumpLeft:{
            imageSrc: 'img/pc/jumpLeft.png',
            framerate: 2,
            framebuffer: 4
                },
                
    }
});

 const keys = {
   d: {
    pressed: false,
   }, 
   a: {
    pressed: false,
   },
   Shift: {
    pressed: false,
   }
 }

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/Background.png',
})

const backgroundimageheight = 960;

const camera = {
    position: {
        x: 0,
        y: -imgwidth + scaledcanvas.height + 130,
    },
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = ('white')
    c.fillRect(0,0,canvas.width,canvas.height)

    c.save()
    c.scale (2, 2)
    c.translate(camera.position.x, camera.position.y) 
    background.update()
    CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    spikeCollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    player.checkForHorizontalCanvasCollision()
    player.update()
    

    if (alive === false){
        keys.d.pressed = false
        keys.a.pressed = false
        keys.Shift.pressed = false
        respawnbox()
    }

    player.velocity.x = 0
    if (keys.d.pressed) {
        player.switchSprite('run')
        player.velocity.x = 3
        player.lastDiraction = 'right'
        player.shouldPanCamraToTheLeft({canvas, camera})
    }
        else if (keys.a.pressed) {
            player.switchSprite('runLeft')
            player.velocity.x = -3
            player. lastDiraction = 'left'
            player.shouldPanCamraToTheRight({canvas, camera})
        }
    else if (player.velocity.y === 0){

        if (player.lastDiraction === 'right')player.switchSprite('idle')
            else player.switchSprite('idleLeft')
    }

    if (player.velocity.y < 0) {
        player.shouldPanCamraToTheDown({canvas, camera})
        if(player.lastDiraction === 'right') player.switchSprite('jump')
            else player.switchSprite('jumpLeft')
    }
        else if (player.velocity.y > 0) {
            player.shouldPanCamraToTheUp({canvas, camera})
            if(player.lastDiraction === 'right') player.switchSprite('fall')
            else player.switchSprite('fallLeft')        
        }
        if (keys.Shift.pressed) {
            if (player.lastDiraction === 'right')
            {
            player.velocity.x = 15
            player.shouldPanCamraToTheLeft({canvas, camera}),
            setTimeout(() => {
                keys.Shift.pressed = false;
              }, 100);
            }
            if (player.lastDiraction === 'left')
            {
            player.velocity.x = -7
            player.shouldPanCamraToTheRight({canvas, camera}),
            setTimeout(() => {
                keys.Shift.pressed = false;
              }, 200);
            }
        }
    

    c.restore()

    
    

}


animate()


function respawn(){
    alive = true;
    player.position.x = 100;
    player.position.y = 850;
    camera.position.x =0;
    camera.position.y = -imgwidth + scaledcanvas.height + 130
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
}




window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
        break
    }
    switch (event.key) {
        case 'a':
            keys.a.pressed = true
        break
    }
    switch (event.key) {
        case 'w':
            if(jump < 1 && alive === true){
            player.velocity.y = -7.25;
            jump ++;
            }
            else if(jump == 1  && alive === true){
            player.velocity.y = -6.5;
            jump ++;
            }
            
        break
    }
    switch (event.key) {
        case 'D':
            keys.d.pressed = true
        break
    }
    switch (event.key) {
        case 'A':
            keys.a.pressed = true
        break
    }
    switch (event.key) {
        case 'W':
            if(jump < 1  && alive === true){
            player.velocity.y = -7.25;
            jump ++;
            }
            else if(jump == 1  && alive === true){
            player.velocity.y = -6.5;
            jump ++;
            }
            
        break
    }
    switch (event.key) {
        case 'E':
            console.log('attack')
        break
    }
   
    switch (event.key) {
        case ' ':
            if (dashCooldown == 0){
                keys.Shift.pressed = true
                dashCooldown = 8}
        break
        }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
    }
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
        break
    }
    switch (event.key) {
        case 'D':
            keys.d.pressed = false
        break
    }
    switch (event.key) {
        case 'A':
            keys.a.pressed = false
        break
    }
})
setInterval(function(){
    if (dashCooldown > 0){
    dashCooldown = dashCooldown - 1;
    dashtime = 1;
    console.log(dashCooldown)
    
    
    }
    console.log(alive)
    console.log(deathcounter)
}, 500);

