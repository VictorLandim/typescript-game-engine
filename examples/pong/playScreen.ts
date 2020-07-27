import { Screen, randomf, Intersector, range, Game } from '../../src/index'
import { Ball } from './ball'
import { Paddle } from './paddle'
import {
  DEBUG,
  BALL_R,
  PADDLE_H,
  PADDLE_W,
  PAD,
  POINTS_TO_WIN,
  PADDLE_SPEED,
  PARTICLE_CONFIG,
  MAX_BALL_SPEED,
  MAX_PADDLE_SPEED,
  TIME_TO_RESET
} from './const'

export enum GameState {
  PLAYING,
  RESET,
  GAME_OVER
}

export enum Player {
  LEFT,
  RIGHT
}

class PlayScreen extends Screen {
  scoreLeft = 0
  scoreRight = 0

  gameWidth: number
  gameHeight: number

  winner: string

  serving: Player

  gameState = GameState.RESET
  resetTimer = 0

  constructor(id: string, game: Game) {
    super(id, game)

    this.gameWidth = game.renderer.virtual_width
    this.gameHeight = game.renderer.virtual_height

    this.serving = Math.round(Math.random())
      ? Player.LEFT
      : Player.RIGHT

    const ball = new Ball(
      'Ball',
      this.gameWidth / 2,
      this.gameHeight / 2,
      BALL_R
    )

    const paddleLeft = new Paddle(
      'PaddleLeft',
      PAD + PADDLE_W / 2,
      this.gameHeight / 2,
      PADDLE_W, PADDLE_H
    )
    const paddleRight = new Paddle(
      'PaddleRight',
      this.gameWidth - PAD - PADDLE_W / 2,
      this.gameHeight / 2,
      PADDLE_W, PADDLE_H
    )

    this
      .addEntity(paddleLeft)
      .addEntity(paddleRight)
      .addEntity(ball)

    this.resetBall()
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    const textLeft = this.scoreLeft.toString()
    const textRight = this.scoreRight.toString()
    const textOffset = 2

    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.font = '30px monospace'

    ctx.textAlign = "left"
    ctx.textBaseline = "top"

    const leftTextSize = ctx.measureText(textLeft).width
    const rightTextSize = ctx.measureText(textRight).width

    ctx.fillText(textLeft, textOffset, textOffset)
    ctx.fillText(textRight, this.gameWidth - textOffset - rightTextSize, textOffset)
  }

  drawDashLines(ctx: CanvasRenderingContext2D) {
    const width = 0.7
    const height = 2.2
    const gap = height
    const numRects = Math.round(this.gameHeight / (height + gap)) + 1

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    range(0, numRects).forEach(i => {
      ctx.fillRect(
        this.gameWidth / 2 - width / 2,
        i * height + i * gap,
        width, height
      )
    })
  }

  update(delta: number) {
    switch (this.gameState) {

      case GameState.GAME_OVER:
        if (this.input.isMouseClicked()) {
          this.scoreLeft = 0
          this.scoreRight = 0
          this.winner = ''
          this.resetBall()
          this.resetPaddles()
          this.gameState = GameState.RESET
        }
        break

      case GameState.RESET:
        if (DEBUG && this.input.isMouseClicked()) {
          this.gameState = GameState.PLAYING
        }

        this.resetTimer += delta
        this.handleInput(delta)

        if (this.resetTimer >= TIME_TO_RESET) {
          this.resetTimer = 0
          this.gameState = GameState.PLAYING
        }

        break

      case GameState.PLAYING:
        super.update(delta)
        this.handleInput(delta)
        this.handleCollision(delta)
        this.handlePoint(delta)
        break
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)

    this.drawScore(ctx)
    this.drawDashLines(ctx)

    if (this.gameState === GameState.GAME_OVER) {
      this.drawGameOver(ctx)
    }
  }

  drawGameOver(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)'
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)

    ctx.fillStyle = "white"
    ctx.font = "20px consolas"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const SPACING = 21

    ctx.fillText(
      'Game over!',
      this.gameWidth / 2,
      this.gameHeight / 2 - SPACING / 2
    )

    ctx.font = "10px consolas"

    ctx.fillText(
      `${this.winner} wins!`,
      this.gameWidth / 2,
      this.gameHeight / 2 + SPACING / 2
    )
  }

  resetBall() {
    const ball = this.getEntity<Ball>('Ball')

    ball.bounds.position.set(this.gameWidth / 2, this.gameHeight / 2)
    ball.particleEmitter.clear()
    ball.particleEmitter.config = {
      ...PARTICLE_CONFIG,
      x: ball.bounds.position.x,
      y: ball.bounds.position.y,
      xOffset: ball.bounds.radius / 2,
      yOffset: ball.bounds.radius / 2,
    }

    let angle = randomf(0, Math.PI / 2) - Math.PI / 4

    if (this.serving === Player.LEFT) {
      angle += Math.PI
    }

    ball.velocity.set(
      Math.cos(angle),
      Math.sin(angle)
    )
  }

  resetPaddles() {
    const paddleLeft = this.getEntity<Paddle>('PaddleLeft')
    const paddleRight = this.getEntity<Paddle>('PaddleRight')

    paddleLeft.position.set(
      PAD + PADDLE_W / 2,
      this.gameHeight / 2,
    )
    paddleRight.position.set(
      this.gameWidth - PAD - PADDLE_W / 2,
      this.gameHeight / 2,
    )
  }

  handleInput(delta: number) {
    const paddleLeft = this.getEntity<Paddle>('PaddleLeft')
    const paddleRight = this.getEntity<Paddle>('PaddleRight')

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
    const paddleLeft = this.getEntity<Paddle>('PaddleLeft')
    const paddleRight = this.getEntity<Paddle>('PaddleRight')
    const ball = this.getEntity<Ball>('Ball')

    const randomAngleOffset = 0

    if (
      ball.bounds.position.y - ball.bounds.radius < 0 ||
      ball.bounds.position.y + ball.bounds.radius > this.gameHeight) {
      ball.velocity.y *= -1
    }

    if (ball.bounds.position.y + ball.bounds.radius > paddleLeft.position.x + paddleLeft.bounds.size.y / 2) {
      // debugger
      // return
    }

    // const randomAngleOffset = randomf(0.2, 0.5)

    //clamp angle:

    if (
      Intersector.rectCircle(paddleLeft.bounds, ball.bounds) ||
      Intersector.rectCircle(paddleRight.bounds, ball.bounds)) {
      ball.velocity.x *= -1

      ball.velocity.x *= ball.velocity.x >= MAX_BALL_SPEED
        ? 1
        : 1.05

      ball.velocity.y *= ball.velocity.y >= MAX_BALL_SPEED
        ? 1
        : 1.05

      ball.particleEmitter.config.lifespan *= 1.01
      ball.particleEmitter.config.frequency *= 0.95

      paddleLeft.speed *= paddleLeft.speed >= MAX_PADDLE_SPEED
        ? 1
        : 1.05
      paddleRight.speed *= paddleRight.speed >= MAX_PADDLE_SPEED
        ? 1
        : 1.05
    }
  }

  handlePoint(delta: number) {
    const ball = this.getEntity<Ball>('Ball')
    const paddleLeft = this.getEntity<Paddle>('PaddleLeft')
    const paddleRight = this.getEntity<Paddle>('PaddleRight')

    const OFFSET = 20

    const ballWentLeft = ball.bounds.position.x + OFFSET < 0
    const ballWentRight = ball.bounds.position.x > this.gameWidth + ball.bounds.radius + OFFSET

    if (ballWentLeft || ballWentRight) {

      this.resetBall()
      // this.resetPaddles()
      paddleLeft.speed = PADDLE_SPEED
      paddleRight.speed = PADDLE_SPEED

      this.gameState = GameState.RESET
    }

    if (ballWentLeft) {
      this.scoreRight++
      this.serving = Player.RIGHT
    }

    if (ballWentRight) {
      this.scoreLeft++
      this.serving = Player.LEFT
    }

    if (this.scoreRight === POINTS_TO_WIN) {
      this.gameState = GameState.GAME_OVER
      this.winner = 'Player 1'
    }

    if (this.scoreLeft === POINTS_TO_WIN) {
      this.gameState = GameState.GAME_OVER
      this.winner = 'Player 2'
    }
  }
}

export { PlayScreen }