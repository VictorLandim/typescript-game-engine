import { Screen, Game, Timer } from "../../src"

class StartScreen extends Screen {
  gameWidth: number
  gameHeight: number

  textTimer: Timer
  showText = true

  constructor(id: string, game: Game) {
    super(id, game)

    this.gameWidth = game.renderer.virtual_width
    this.gameHeight = game.renderer.virtual_height

    this.textTimer = new Timer('textTimer', 500, true, () => {
      this.showText = !this.showText
    })

    this.addEntity(this.textTimer)
  }

  update(delta: number) {
    if (this.input.isMouseClicked()) {
      this.game.setScreen('PlayScreen')
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = '35px monospace'
    ctx.fillStyle = "white"

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const offset = 8

    ctx.fillText('PONG', this.gameWidth / 2, this.gameHeight / 2 - offset)

    if (this.showText) {
      ctx.font = "6px monospace"
      ctx.fillText('click to start', this.gameWidth / 2, this.gameHeight / 2 + offset * 2)
    }
  }

}

export { StartScreen }