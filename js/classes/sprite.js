class Sprite {
    constructor({position, imageSrc, framerate = 1, framebuffer = 8, scale = 1}) {
        this.position = position
        this.scale = scale
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.framerate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        }
        this.image.src = imageSrc
        this.framerate = framerate
        this.currentframe = 0
        this.framebuffer = framebuffer
        this.elapsedframes = 0
        
    }

    draw(){
        if (!this.image) return

        const cropbox = {
            position: {
                x: this.currentframe * (this.image.width / this.framerate),
                y: 0,
            },
            width: this.image.width / this.framerate,
            height: this.image.height,
        }

        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        this.draw()
        this.updateFrames()
    }
    updateFrames(){
        this.elapsedframes++
        if(this.elapsedframes % this.framebuffer === 0){
        if (this.currentframe < this.framerate - 1)
        (this.currentframe++)
    else this.currentframe = 0
    }
}
}