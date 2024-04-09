const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

var jump = 0;

let dashCooldown = 0;

const scaledcanvas = {
    width: canvas.width / 3,
    height: canvas.height / 3
}

const floorCollisions2d = []
for(let i = 0; i < floorCollisions.length; i += 34) {
    floorCollisions2d.push(floorCollisions.slice(i, i + 34))
}

const CollisionsBlocks = []
floorCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 202) {
            //console.log('draw a block')
            CollisionsBlocks.push(
                new CollisionsBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})

const platformCollisions2d = []
for(let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2d.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionsBlocks = []
platformCollisions2d.forEach((row, y) => {
    row.forEach((Symbol, x) => {
        if(Symbol === 202) {
            console.log('draw a block')
            platformCollisionsBlocks.push(
                new CollisionsBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                    height: 8,
                })
            )
        }
    })
})

//console.log(floorCollisions2d)


const gravity = 0.325 ;


const player = new Player({
    position: {
    x: 180,
    y: 0,
    },
    CollisionsBlocks,
    platformCollisionsBlocks,
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
    imageSrc: './img/proto.png',
})

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = ('white')
    c.fillRect(0,0,canvas.width,canvas.height)

    c.save()
    c.scale (3, 3)
    c.translate(0, -background.image.height + scaledcanvas.height) 
    background.update()
    CollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    platformCollisionsBlocks.forEach((CollisionsBlock) => {
        CollisionsBlock.update()
    })
    player.update()

    player.velocity.x = 0
    if (keys.d.pressed) {
        player.switchSprite('run')
        player.velocity.x = 3
        player.lastDiraction = 'right'
        player.shouldPanCamraToTheLeft
    }
        else if (keys.a.pressed) {
            player.switchSprite('runLeft')
            player.velocity.x = -3
            player. lastDiraction = 'left'
        }
    else if (player.velocity.y === 0){

        if (player.lastDiraction === 'right')player.switchSprite('idle')
            else player.switchSprite('idleLeft')
    }

    if (player.velocity.y < 0) {
        if(player.lastDiraction === 'right') player.switchSprite('jump')
            else player.switchSprite('jumpLeft')
    }
        else if (player.velocity.y > 0) {
            if(player.lastDiraction === 'right') player.switchSprite('fall')
            else player.switchSprite('fallLeft')        
        }
            

    c.restore()

}


animate()

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
            if(jump <= 1){
            player.velocity.y = -8;
            jump ++;
            }
        break
    }
    switch (event.key) {
        case ' ':
            console.log('attack')
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
})


