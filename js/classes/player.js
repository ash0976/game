class Player {
    constructor({ position, CollisionsBlocks }){
        this.position = position
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 100 / 4
        this.height = 100 / 4
        this.CollisionsBlocks = CollisionsBlocks
    }

    draw() {
        c.fillStyle = ('red')
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()

        this.position.x+= this.velocity.x
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.checkForVerticalCollision()
    }

    checkForHorizontalCollision(){
        for (let i = 0; i < this.CollisionsBlocks.length; i++) {
            const collisionBlock = this.CollisionsBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ){
                if(this.velocity.x > 0){
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                }
                if(this.velocity.x < 0){
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01 
                }
            }

            }
    }

    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }

    checkForVerticalCollision(){
        for (let i = 0; i < this.CollisionsBlocks.length; i++) {
            const collisionBlock = this.CollisionsBlocks[i]

            if(
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ){
                if(this.velocity.y > 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01 
                    jump = 0
                }
                if(this.velocity.y < 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + this.height - 0.01 
                }
            }

            }
    }
}