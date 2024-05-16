const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

var jump = 0;

let dashCooldown = 0;
let dashtime = 0;

let imgwidth = 8192;
let imgheight = 8192;

let alive = true;
let deathcounter = 0;

let win = false;
let winner = 0;

let cheackpoint1 = false
let cheackpoint2 = false
let cheackpoint3 = false
let cheackpoint4 = false
let cheackpoint5 = false
let cheackpoint6 = false
let cheackpoint7 = false

var winaudio = new Audio ('sound/win.mp3')

window.onload=getcheckpointload;

function getcheckpointload() {
    document.getElementById("getcheckpoint1").onclick=Fungetcheckpoint1;
    document.getElementById("getcheckpoint2").onclick=Fungetcheckpoint2;
    document.getElementById("getcheckpoint3").onclick=Fungetcheckpoint3;
    document.getElementById("getcheckpoint4").onclick=Fungetcheckpoint4;
    document.getElementById("getcheckpoint5").onclick=Fungetcheckpoint5;
    document.getElementById("getcheckpoint6").onclick=Fungetcheckpoint6;
    document.getElementById("getcheckpoint7").onclick=Fungetcheckpoint7;
}
function Fungetcheckpoint1() {
    cheackpoint1 = true
    cheackpoint2 = false
    cheackpoint3 = false
    cheackpoint4 = false
    cheackpoint5 = false
    cheackpoint6 = false
    cheackpoint7 = false
}
function Fungetcheckpoint2() {
    cheackpoint1 = false
    cheackpoint2 = true
    cheackpoint3 = false
    cheackpoint4 = false
    cheackpoint5 = false
    cheackpoint6 = false
    cheackpoint7 = false
}
function Fungetcheckpoint3() {
    cheackpoint1 = false
    cheackpoint2 = false
    cheackpoint3 = true
    cheackpoint4 = false
    cheackpoint5 = false
    cheackpoint6 = false
    cheackpoint7 = false
}
function Fungetcheckpoint4() {
    cheackpoint1 = false
    cheackpoint2 = false
    cheackpoint3 = false
    cheackpoint4 = true
    cheackpoint5 = false
    cheackpoint6 = false
    cheackpoint7 = false
}
function Fungetcheckpoint5() {
    cheackpoint1 = false
    cheackpoint2 = false
    cheackpoint3 = false
    cheackpoint4 = false
    cheackpoint5 = true
    cheackpoint6 = false
    cheackpoint7 = false
}
function Fungetcheckpoint6() {
    cheackpoint1 = false
    cheackpoint2 = false
    cheackpoint3 = false
    cheackpoint4 = false
    cheackpoint5 = false
    cheackpoint6 = true
    cheackpoint7 = false
}
function Fungetcheckpoint7() {
    cheackpoint1 = false
    cheackpoint2 = false
    cheackpoint3 = false
    cheackpoint4 = false
    cheackpoint5 = false
    cheackpoint6 = false
    cheackpoint7 = true
}
//timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime()
{
    if (alive === true){
        if (win === false){
     ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
    }
    else{
        return
    }
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

function winbox(){
    document.getElementById("win").style.display="flex"
    winaudio.play();
    document.getElementById("winsecond").innerHTML = pad(totalSeconds%60);
    document.getElementById("winminutes").innerHTML = pad(parseInt(totalSeconds/60));
    document.getElementById("timedeaths").innerHTML = deathcounter;
}

const scaledcanvas = {
    width: canvas.width / 1.5,
    height: canvas.height / 1.5
}

const floorCollisions2d = []
for(let i = 0; i < floorCollisions.length; i += 256) {
    floorCollisions2d.push(floorCollisions.slice(i, i + 256))
}

const CollisionsBlocks = []
floorCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 1) {
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
console.log(floorCollisions2d)
const spikeCollisions2d = []
for(let i = 0; i < SpikeCollisions.length; i += 256) {
    spikeCollisions2d.push(SpikeCollisions.slice(i, i + 256))
}

const spikeCollisionsBlocks = []
spikeCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 193) {
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

const winCollisions2d = []
for(let i = 0; i < winCollisions.length; i += 256) {
    winCollisions2d.push(winCollisions.slice(i, i + 256))
}

const winCollisionsBlocks = []
winCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 161) {
            winCollisionsBlocks.push(
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

const cheackpointCollisions2d = []
for(let i = 0; i < cheackpointCollisions.length; i += 256) {
    cheackpointCollisions2d.push(cheackpointCollisions.slice(i, i + 256))
}

const cheackpointCollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 321) {
            cheackpointCollisionsBlocks.push(
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


const cheackpoint2CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 322) {
            cheackpoint2CollisionsBlocks.push(
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

const cheackpoint3CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 323) {
            cheackpoint3CollisionsBlocks.push(
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

const cheackpoint4CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 324) {
            cheackpoint4CollisionsBlocks.push(
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

const cheackpoint5CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 353) {
            cheackpoint5CollisionsBlocks.push(
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

const cheackpoint6CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 354) {
            cheackpoint6CollisionsBlocks.push(
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
const cheackpoint7CollisionsBlocks = []
cheackpointCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 355) {
            cheackpoint7CollisionsBlocks.push(
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




const gravity = 0.315 ;


const player = new Player({
    position: {
    x: 300,
    y: 7040,
    },
    CollisionsBlocks,
    spikeCollisionsBlocks,
    winCollisionsBlocks,
    cheackpointCollisionsBlocks,
    cheackpoint2CollisionsBlocks,
    cheackpoint3CollisionsBlocks,
    cheackpoint4CollisionsBlocks,
    cheackpoint5CollisionsBlocks,
    cheackpoint6CollisionsBlocks,
    cheackpoint7CollisionsBlocks,
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

const backgroundimageheight = 8192;

const camera = {
    position: {
        x: 0,
        y: -imgwidth + scaledcanvas.height +100,
    },
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = ('white')
    c.fillRect(0,0,canvas.width,canvas.height)

    c.save()
    c.scale (1.5, 1.5)
    c.translate(camera.position.x, camera.position.y) 
    background.update()
    CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    spikeCollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    winCollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpointCollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint2CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint3CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint4CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint5CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint6CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    cheackpoint7CollisionsBlocks.forEach((CollisionsBlock) => {
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

    if (win === true){
        keys.d.pressed = false
        keys.a.pressed = false
        keys.Shift.pressed = false
        if(winner == 0){
        winner ++
        winbox()}

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
            player.velocity.x = 13
            player.shouldPanCamraToTheLeft({canvas, camera}),
            setTimeout(() => {
                keys.Shift.pressed = false;
              }, 100);
            }
            if (player.lastDiraction === 'left')
            {
            player.velocity.x = -13
            player.shouldPanCamraToTheRight({canvas, camera}),
            setTimeout(() => {
                keys.Shift.pressed = false;
              }, 100);

            }
        setTimeout(() => {
            keys.Shift.pressed = false;
        },100);
        }
    

    c.restore()

    setInterval(function(){
        if(dashCooldown > 0){
            document.getElementById('dash').innerHTML = dashCooldown;
        }
        else if (dashCooldown == 0) {
            document.getElementById('dash').innerHTML = "dash";
        }
    }, 1000);

}


animate()


function respawn(){
    if(cheackpoint1 == true){
        alive = true;
    player.position.x = 3800;
    player.position.y = 6784;
    camera.position.x =-3461;
    camera.position.y = -imgwidth + scaledcanvas.height + 1250
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint2 == true) {
        alive = true;
    player.position.x = 5870;
    player.position.y = 5056;
    camera.position.x =-5586;
    camera.position.y = -4865
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint3 == true) {
        alive = true;
    player.position.x = 1500;
    player.position.y = 5820;
    camera.position.x =-1209;
    camera.position.y = -imgwidth + scaledcanvas.height + 2200
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint4 == true) {
        alive = true;
    player.position.x = 3384;
    player.position.y = 4768;
    camera.position.x =-2994;
    camera.position.y = -4535
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint5 == true) {
        alive = true;
    player.position.x = 7880;
    player.position.y = 7968;
    camera.position.x =-7509;
    camera.position.y = -7731
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint6 == true) {
        alive = true;
    player.position.x = 2464;
    player.position.y = 3290;
    camera.position.x =-2130;
    camera.position.y = -3133;
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else if (cheackpoint7 == true) {
        alive = true;
    player.position.x = 5760;
    player.position.y = 2400;
    camera.position.x =-5373;
    camera.position.y = -2157;
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter
    }
    else {
    alive = true;
    player.position.x = 300;
    player.position.y = 7040;
    camera.position.x =0;
    camera.position.y = -imgwidth + scaledcanvas.height + 100
    document.getElementById("respawn").style.display="none"
    deathcounter ++
    document.getElementById('death').innerHTML = "death: "+deathcounter}
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
            if(jump < 1 && alive === true && win === false){
            player.velocity.y = -7.25;
            jump ++;
            }
            else if(jump == 1  && alive === true && win === false){
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
            if(jump < 1  && alive === true && win === false){
            player.velocity.y = -7.25;
            jump ++;
            }
            else if(jump == 1  && alive === true && win === false){
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
                dashCooldown = 4
                keys.Shift.pressed = true
                dashtime = 1
                }
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
    }
}, 1000);

