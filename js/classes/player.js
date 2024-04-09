class Player extends Sprite {
    constructor({ 
        position, 
        CollisionsBlocks,
        platformCollisionsBlocks,
        imageSrc, 
        framerate, 
        scale = 0.7, 
        animations,
    }){
        super({ imageSrc, framerate, scale });
        this.position = position
        this.velocity = {
            x: 0,
            y: 0,
        }


        this.CollisionsBlocks = CollisionsBlocks
        this.platformCollisionsBlocks = platformCollisionsBlocks
        this.hitbox = {
            position: {
                x:this.position.x, 
                y:this.position.y,
            },
            width: 10,
            height: 10
        }

        this.animations = animations
        this.lastDiraction = 'right'

        for(let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image

        }

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    switchSprite(key){
        if(this.image === this.animations[key].image || !this.loaded) return

        this.currentframe = 0
        this.image = this.animations[key].image
        this.framebuffer = this.animations[key].framebuffer
        this.framerate = this.animations[key].framerate
    }

    updatecamerabox(){
        this.camerabox = {
            position: {
                x: this.position.x - 65,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    shouldPanCamraToTheLeft(){
        const cameraboxRightSide = this.camrabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width / 4

        if(cameraboxRightSide >= scaledDownCanvasWidth) {
            console.log('panleft')
        } 
    }

    update(){ 
        this.updateFrames()
        this.updatehitbox()
        
        this.updatecamerabox()
        c.fillStyle = 'rgba(0,0,255,0.2'
        c.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height)

        //drawout image
        /* c.fillStyle = 'rgba(0,255,0,0.2'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.fillStyle = 'rgba(255,0,0,0.2'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height) */

        this.draw()

        

        this.position.x+= this.velocity.x
        this.updatehitbox()
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.updatehitbox()
        this.checkForVerticalCollision()
    }

    updatehitbox(){
        this.CollisionsBlocks = CollisionsBlocks
        this.hitbox = {
            position: {
                x: this.position.x + 26.5, 
                y: this.position.y + 31,
            },
            width: 16,
            height: 36.5
        }

        
    }

    

    checkForHorizontalCollision(){
        for (let i = 0; i < this.CollisionsBlocks.length; i++) {
            const collisionBlock = this.CollisionsBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ){
                if(this.velocity.x > 0){
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                }
                if(this.velocity.x < 0){
                    this.velocity.x = 0;

                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01 
                }
            }

            }
    }

    applyGravity(){
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    checkForVerticalCollision(){
        for (let i = 0; i < this.CollisionsBlocks.length; i++) {
            const collisionBlock = this.CollisionsBlocks[i]

            if(
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ){
                if(this.velocity.y > 0){
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01 
                    jump = 0
                }
                if(this.velocity.y < 0){
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01 
                }
            }

        }

         //platform collision block
         for (let i = 0; i < this.platformCollisionsBlocks.length; i++) {
            const platformCollisionsBlock = this.platformCollisionsBlocks[i]

            if(
                paltformcollision({
                    object1: this.hitbox,
                    object2: platformCollisionsBlock,
                })
            ){
                if(this.velocity.y > 0){
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = platformCollisionsBlock.position.y - offset - 0.01 
                    jump = 0
                }
                if(this.velocity.y < 0){
                    
                   
                }
            }

        }
    }
}