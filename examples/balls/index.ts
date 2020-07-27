import {
  Game as GameBase,
  Screen,
  Entity,
  Vector2,
  Canvas,
  randomf,
  range,
  Input,
  Debug,
  Intersector,
  Rect
} from '../../src/index'

class Box extends Entity {
  position: Vector2
  velocity: Vector2
  size = new Vector2(30, 30)

  constructor(id: string, position: Vector2, velocity: Vector2) {
    super(id)

    this.position = new Vector2(position.x, position.y)
    this.velocity = new Vector2(velocity.x, velocity.y)
  }

  update(delta: number) {
    this.position.x += delta * this.velocity.x
    this.position.y += delta * this.velocity.y

    this.events.emit('box_moved', this)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rebeccapurple"
    ctx.beginPath()
    ctx.ellipse(
      this.position.x + this.size.x / 2,
      this.position.y + this.size.y / 2,
      this.size.x / 2,
      this.size.y / 2,
      0, 0, Math.PI * 2)
    ctx.fill()

    // ctx.fillStyle = "blue"
    // ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.x,
    //   this.size.y
    // )

    // ctx.fillStyle = "red"
    // ctx.beginPath()
    // ctx.ellipse(
    //   this.position.x,
    //   this.position.y,
    //   2,
    //   2,
    //   0, 0, Math.PI * 2)
    // ctx.fill()
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

      const box = new Box(`{$i}`, position, velocity)

      box.events.on('box_moved', (box: Box) => {
        const newVelocityFactor = -1 + randomf(0, 0.05)

        // right
        if (box.position.x >= Canvas.width - box.size.x) {
          box.velocity.x *= newVelocityFactor
          box.position.x = Canvas.width - box.size.x
        }

        // left
        if (box.position.x <= 0) {
          box.velocity.x *= newVelocityFactor
          box.position.x = 0
        }

        // bottom
        if (box.position.y >= Canvas.height - box.size.y) {
          box.velocity.y *= newVelocityFactor
          box.position.y = Canvas.height - box.size.y
        }

        // top
        if (box.position.y <= 0) {
          box.velocity.y *= newVelocityFactor
          box.position.y = 0
        }
      })
      this.entities.push(box)
    })

    Input.events.on('mousedown', (mouseData) => {
      const bounds = new Rect(new Vector2(0, 0), new Vector2(0, 0))

      this.entities = this.entities.map((box: Box) => {
        bounds.set(box.position, box.size)

        if (Intersector.pointRect(mouseData.position, bounds)) {
          return null
        }
        return box
      }).filter(e => !!e)
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

    // this.ctx.fillStyle = "white"
    // this.ctx.font = "20px arial"

    // this.ctx.fillText(`a: ${Input.isKeyDown(Input.keys.A)}`, 20, 20)
    if (Input.isMouseDown()) {

      ctx.fillStyle = 'red'
      ctx.fillRect(Input.mouse.x - 2, Input.mouse.y - 2, 4, 4)
    }
  }
}

const Game = MyGame.Instance(MyGame)

window.addEventListener('DOMContentLoaded', () => Game.start())