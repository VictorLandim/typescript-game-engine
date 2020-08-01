import { Game, Screen, AssetManager } from "../../engine"
import { Player } from "./player"

class PlayScreen extends Screen {
  gameWidth: number
  gameHeight: number

  player: Player

  constructor(id: string, game: Game) {
    super(id, game)
  }

  init() {
    this.gameWidth = this.game.renderer.virtual_width
    this.gameHeight = this.game.renderer.virtual_height

    const spriteSheet = AssetManager.getImg('spritesheet')

    this.player = new Player('Player', spriteSheet)

    this.addEntity(this.player)
  }

  update(delta: number) {
    super.update(delta)
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx)
  }
}


export { PlayScreen }