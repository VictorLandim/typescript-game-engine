import { Screen, Canvas, Input, randomf, Intersector, range } from '../../src/index'
import Ball from './ball'
import Paddle from './paddle'

const BALL_R = 20
const PADDLE_W = 20
const PADDLE_H = 100
const PAD = 20

enum GameState {
  PLAYING,
  RESET,
  END
}

class MainScreen extends Screen {
  scoreLeft = 0
  scoreRight = 0

  gameWidth: number
  gameHeight: number

  gameState = GameState.RESET

  constructor(id: string, ctx: CanvasRenderingContext2D) {
    super(id, ctx)

    this.gameWidth = Number(ctx.canvas.style.width.split('px')[0])
    this.gameHeight = Number(ctx.canvas.style.height.split('px')[0])

    const ball = new Ball(
      this.gameWidth / 2,
      this.gameHeight / 2,
      BALL_R
    )

    const paddleLeft = new Paddle(
      PAD + PADDLE_W / 2,
      this.gameHeight / 2,
      PADDLE_W, PADDLE_H
    )
    const paddleRight = new Paddle(
      this.gameWidth - PAD - PADDLE_W / 2,
      this.gameHeight / 2,
      PADDLE_W, PADDLE_H
    )

    this
      .addEntity('paddleLeft', paddleLeft)
      .addEntity('paddleRight', paddleRight)
      .addEntity('ball', ball)

    this.resetBall()
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    const textLeft = this.scoreLeft.toString()
    const textRight = this.scoreRight.toString()
    const textOffset = 50
    const textOffsetTop = 150

    ctx.save()
    ctx.fillStyle = "rgba(255,255,255,0.25)"
    ctx.font = '150px monospace'

    const leftTextSize = ctx.measureText(textLeft).width
    const rightTextSize = ctx.measureText(textRight).width

    ctx.fillText(textLeft, textOffset, textOffsetTop)
    ctx.fillText(textRight, this.gameWidth - textOffset - rightTextSize, textOffsetTop)
    ctx.restore()
  }

  drawDashLines(ctx: CanvasRenderingContext2D) {
    const width = 5
    const height = 10
    const gap = 20
    const numRects = Math.round(this.gameHeight / (height + gap)) + 1

    ctx.save()
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    range(0, numRects).forEach(i => {
      ctx.fillRect(
        this.gameWidth / 2 - width / 2,
        i * height + i * gap,
        width, height
      )
    })
    ctx.restore()
  }

  update(delta: number) {
    switch (this.gameState) {
      case GameState.RESET:
        if (this.input.isMouseClicked()) {
          this.gameState = GameState.PLAYING
        }

        break;
      case GameState.PLAYING:
        super.update(delta)
        this.handleInput(delta)
        this.handleCollision(delta)
        this.handlePoint(delta)

        break;
      case GameState.END:
        break;
    }

  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)

    this.drawScore(ctx)
    this.drawDashLines(ctx)
  }

  resetBall() {
    const ball = <Ball>this.entities['ball']

    ball.position.set(this.gameWidth / 2, this.gameHeight / 2)

    // const angle = randomf(0, Math.PI / 2)
    const angle = randomf(0, Math.PI * 2)
    // const angle = Math.PI
    ball.angle = angle
  }

  handleInput(delta: number) {
    const paddleLeft = <Paddle>this.entities['paddleLeft']
    const paddleRight = <Paddle>this.entities['paddleRight']
    const ball = <Ball>this.entities['ball']

    if (this.input.isMouseDown()) {
      this.resetBall()
    }

    if (this.input.isKeyDown(this.input.keys.UP)) paddleRight.moveUp(delta)
    if (this.input.isKeyDown(this.input.keys.W)) paddleLeft.moveUp(delta)
    if (this.input.isKeyDown(this.input.keys.S)) paddleLeft.moveDown(delta)
    if (this.input.isKeyDown(this.input.keys.DOWN)) paddleRight.moveDown(delta)

    // bounds

    if (paddleLeft.position.y - paddleLeft.size.y / 2 < 0) {
      paddleLeft.position.y = paddleLeft.size.y / 2
    }
    if (paddleRight.position.y - paddleRight.size.y / 2 < 0) {
      paddleRight.position.y = paddleRight.size.y / 2
    }

    if (paddleLeft.position.y + paddleLeft.size.y / 2 > this.gameHeight) {
      paddleLeft.position.y = this.gameHeight - paddleLeft.size.y / 2
    }
    if (paddleRight.position.y + paddleRight.size.y / 2 > this.gameHeight) {
      paddleRight.position.y = this.gameHeight - paddleRight.size.y / 2
    }
  }

  handleCollision(delta: number) {
    const paddleLeft = <Paddle>this.entities['paddleLeft']
    const paddleRight = <Paddle>this.entities['paddleRight']
    const ball = <Ball>this.entities['ball']

    const randomAngleOffset = 0

    if (
      ball.position.y - ball.bounds.radius < 0 ||
      ball.position.y + ball.bounds.radius > this.gameHeight) {
      ball.angle = ((Math.PI * 2) - ball.angle + randomAngleOffset)
    }

    if (ball.position.y + ball.bounds.radius > paddleLeft.position.x + paddleLeft.bounds.size.y / 2) {
      // debugger;
      // return;
    }

    // const randomAngleOffset = randomf(0.2, 0.5)

    //clamp angle:

    if (
      Intersector.rectCircle(paddleLeft.bounds, ball.bounds) ||
      Intersector.rectCircle(paddleRight.bounds, ball.bounds)) {
      ball.angle = ((Math.PI) - ball.angle + randomAngleOffset)
    }


  }

  handlePoint(delta: number) {
    const ball = <Ball>this.entities['ball']

    const OFFSET = 20

    if (ball.bounds.position.x + OFFSET < 0) {
      this.scoreRight++
      this.resetBall()
    }

    if (ball.bounds.position.x > this.gameWidth + ball.bounds.radius + OFFSET) {
      this.scoreLeft++
      this.resetBall()
    }
  }
}

export default MainScreen