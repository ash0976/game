const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

var jump = 0;

const scaledcanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
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
                })
            )
        }
    })
})

console.log(platformCollisions2d)


const gravity = 0.3 ;


const player = new Player({
    position: {
    x: 100,
    y: 0,
    },
    CollisionsBlocks,
});

 const keys = {
   d: {
    pressed: false,
   }, 
   a: {
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
    if (keys.d.pressed) player.velocity.x = 5
        else if (keys.a.pressed) player.velocity.x = -5

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
            player.velocity.y = -5;
            jump ++;
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
})