import { Sitting, Running, Jumping, Falling } from './playerState.js'

export class Player {
  constructor (game) {
    this.game = game
    this.width = 100
    this.height = 91.3
    this.x = 0
    this.y = this.game.height - this.height
    this.image = document.getElementById('player')
    this.frameX = 0
    this.maxFrame = 5
    this.fps = 20
    this.frameRate = 1000 / this.fps
    this.frameTimer = 0
    this.frameY = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.maxSpeed = 10
    this.maxJumpHeight = 30
    this.weight = 1
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
    this.currentState = this.states[0]

    this.currentState.enter()
  }

  update (input, deltaTime) {
    this.currentState.handleInput(input)

    // Horizontal movement.
    this.x += this.xSpeed
    if (input.includes('d')) this.xSpeed = this.maxSpeed
    else if (input.includes('a')) this.xSpeed = -this.maxSpeed
    else this.xSpeed = 0

    // Vertical movement.
    this.y += this.ySpeed
    if (!this.isOnGround()) this.ySpeed += this.weight
    else this.ySpeed = 0

    // Avoid leaving the canvas.
    if (this.x < 0) this.x = 0
    if (this.x > (this.game.width - this.width)) this.x = this.game.width - this.width

    // Sprite animation.

    if (this.frameTimer > this.frameRate) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else {
      this.frameTimer += deltaTime
    }
  }

  draw (context) {
    const image = this.image

    const sx = this.width * this.frameX
    const sy = this.height * this.frameY
    const sWidth = this.width
    const sHeight = this.height

    const dx = this.x
    const dy = this.y
    const dWidth = this.width
    const dHeight = this.height

    context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  }

  isOnGround () {
    return this.y >= this.game.height - this.height
  }

  setState (state) {
    this.currentState = this.states[state]

    console.info(this.currentState)
    this.currentState.enter()
  }
}
