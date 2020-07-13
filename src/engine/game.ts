import { Screen } from "./screen"
import { Canvas } from "./canvas"
import { Singleton } from "./util/singleton"

type GameConfig = {
  fps?: number
}

class Game extends Singleton<Game> {
  ctx: CanvasRenderingContext2D

  screens: Screen[]
  screen: Screen

  lastTime: number = 0
  config: GameConfig

  fps = 0

  constructor(config: GameConfig = { fps: 60 }) {
    super()

    this.config = config
    this.ctx = Canvas.ctx
  }

  start = () => window.requestAnimationFrame(this.loop)

  loop = (timestamp: number) => {
    const delta = timestamp - this.lastTime
    const targetDelta = 1000 / this.config.fps

    // if (delta > targetDelta) {
    this.lastTime = timestamp

    this.fps = 1000 / delta

    this.update(delta)
    this.clear(this.ctx)
    this.draw(this.ctx)
    // }

    window.requestAnimationFrame(this.loop)
  }

  update(delta: number) {
    this.screen.update(delta)
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.screen.draw(ctx)
  }

  setScreen(s: Screen) {
    this.screen = s
  }
}

export { Game }