import { Screen, Game, Timer, AssetManager } from '../../engine'
import { clickAudio, downloadImage } from './assetPaths'

class StartScreen extends Screen {
  gameWidth: number
  gameHeight: number

  textTimer: Timer
  showText = true

  constructor(id: string, game: Game) {
    super(id, game)
  }

  init() {
    this.gameWidth = this.game.renderer.virtual_width
    this.gameHeight = this.game.renderer.virtual_height

    this.textTimer = new Timer('textTimer', 500, true, () => {
      this.showText = !this.showText
    })

    this.addEntity(this.textTimer)

    AssetManager
      .loadImage('img', downloadImage)
      .loadAudio('audio', clickAudio)
  }

  async update(delta: number) {
    this.textTimer.update(delta)

    if (this.input.isMouseClicked()) {
      await AssetManager.get<HTMLAudioElement>('audio').play()

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