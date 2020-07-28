import { Screen, Game, Timer, AssetManager } from "../../src"

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

    AssetManager.loadAudio('click', 'click2.wav')
  }

  async update(delta: number) {
    this.textTimer.update(delta)

    if (this.input.isMouseClicked()) {
      this.game.setScreen('PlayScreen')

      try {
        console.log(AssetManager.assets)

        await AssetManager.get<HTMLAudioElement>('click').play()
      } catch (e) {
        console.log(e)
      }
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