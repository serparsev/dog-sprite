const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3
}

class State {
  constructor (state) {
    this.state = state
  }
}

export class Sitting extends State {
  constructor (player) {
    super('SITTING')
    this.player = player
  }

  enter () {
    this.frameX = 0
    this.player.maxFrame = 4
    this.player.frameY = 5
  }

  handleInput (input) {
    if (input.includes('a') || input.includes('d')) {
      this.player.setState(states.RUNNING)
    }
  }
}

export class Running extends State {
  constructor (player) {
    super('RUNNING')
    this.player = player
  }

  enter () {
    this.frameX = 0
    this.player.maxFrame = 8
    this.player.frameY = 3
  }

  handleInput (input) {
    if (input.includes('s')) {
      this.player.setState(states.SITTING)
    } else if (input.includes('w')) {
      this.player.setState(states.JUMPING)
    }
  }
}

export class Jumping extends State {
  constructor (player) {
    super('JUMPING')
    this.player = player
  }

  enter () {
    if (this.player.isOnGround()) this.player.ySpeed -= this.player.maxJumpHeight
    this.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 1
  }

  handleInput (input) {
    if (this.player.ySpeed > this.player.weight) {
      this.player.setState(states.FALLING)
    }
  }
}

export class Falling extends State {
  constructor (player) {
    super('FALLING')
    this.player = player
  }

  enter () {
    this.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 2
  }

  handleInput (input) {
    if (this.player.isOnGround()) {
      this.player.setState(states.RUNNING)
    }
  }
}
