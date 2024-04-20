export class InputHandler {
  constructor () {
    const allowedKeys = ['w', 'a', 's', 'd']
    this.keys = []

    window.addEventListener('keydown', (event) => {
      if (allowedKeys.includes(event.key) && !this.keys.includes(event.key)) {
        this.keys.push(event.key)
      }
    })

    window.addEventListener('keyup', (event) => {
      if (allowedKeys.includes(event.key) && this.keys.includes(event.key)) {
        this.keys.splice(this.keys.indexOf(event.key), 1)
      }
    })
  }
}
