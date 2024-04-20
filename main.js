import { InputHandler } from './input.js'
import { Player } from './player.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  // Resize canvas
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor (width, height) {
      this.width = width
      this.height = height
      this.player = new Player(this)
      this.input = new InputHandler()
    }

    update (deltaTime) {
      this.player.update(this.input.keys, deltaTime)
    }

    draw (context) {
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  function animate (timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp

    context.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(context)

    requestAnimationFrame(animate)
  }

  animate(0)
})
