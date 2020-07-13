import {
  Game as GameBase,
  Screen,
  Entity,
  Vector2,
  IVector2,
  Canvas,
  randomf,
  range,
  Input
} from '../engine'

class Box extends Entity {
  position: IVector2
  velocity: IVector2
  size = new Vector2(20, 20)

  constructor(id: string, position: IVector2, velocity: IVector2) {
    super(id)

    this.position = new Vector2(position.x, position.y)
    this.velocity = new Vector2(velocity.x, velocity.y)
  }

  update(delta: number) {
    this.position.x += delta * this.velocity.x
    this.position.y += delta * this.velocity.y

    if (this.position.x >= Canvas.width - this.size.x) {
      this.velocity.x *= -1
      this.position.x = Canvas.width - this.size.x
    }

    if (this.position.x <= 0) {
      this.velocity.x *= -1
      this.position.x = 0
    }

    if (this.position.y >= Canvas.height - this.size.y) {
      this.velocity.y *= -1
      this.position.y = Canvas.height - this.size.y
    }

    if (this.position.y <= 0) {
      this.velocity.y *= -1
      this.position.y = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rebeccapurple"
    ctx.beginPath()
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
      0, 0, Math.PI * 2)
    ctx.fill()
  }

}

class MyScreen extends Screen {
  constructor(id: string) {
    super(id)

    range(0, 10).forEach(i => {

      const position = new Vector2(
        randomf(0, Canvas.width - 20),
        randomf(0, Canvas.height - 20),
      )

      const velocity = new Vector2(
        randomf(0.005, 0.2),
        randomf(0.005, 0.2),
        // 0, 0
      )

      console.log(position, velocity)

      const box = new Box(`Box_${i}`, position, velocity)
      this.entities.push(box)
    })
  }
}

class MyGame extends GameBase {
  constructor() {
    super()

    this.screen = new MyScreen('MY_SCREEN')
  }

  update(delta: number) {
    super.update(delta)

    Input.update()
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)

    this.ctx.fillStyle = "white"
    this.ctx.font = "20px arial"

    this.ctx.fillText(`a: ${Input.isKeyDown(Input.keys.A)}`, 20, 20)
  }
}

const Game = MyGame.Instance(MyGame)

window.addEventListener('DOMContentLoaded', () => Game.start())