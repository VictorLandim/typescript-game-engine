import { Game, Screen, AssetManager } from '../../engine';
import { HitSound, ScoreSound, ButtonPressSound, SpriteSheet } from './assetPaths';

class LoadScreen extends Screen {

  constructor(id: string, game: Game) {
    super(id, game)
  }

  init() {
    AssetManager
      .loadAudio('hit', HitSound)
      .loadAudio('score-reached', ScoreSound)
      .loadAudio('button-press', ButtonPressSound)
      .loadImage('spritesheet', SpriteSheet)
  }

  update(delta: number) {
    if (AssetManager.finishedLoading()) {
      this.game.setScreen('PlayScreen')
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const progress = AssetManager.progress()

    ctx.fillStyle = '#666'

    ctx.font = "20px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = 'middle'

    ctx.fillText(`${progress * 100}%`,
      this.game.renderer.virtual_width / 2,
      this.game.renderer.virtual_height / 2)
  }
}

export { LoadScreen }