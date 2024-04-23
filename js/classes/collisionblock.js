class CollisionsBlock {
    constructor({position, height = 32}) {
        this.position = position
        this.width = 32
        this.height = height
        
    }

    draw(){
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }

    
}