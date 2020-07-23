import { Screen } from "./screen"
import { Canvas } from "./canvas"

export type GameConfig = {
  fps?: number
  clearColor: string
  width: number
  height: number
  screens: Screen[]
}

const DEFAULT_CONFIG: GameConfig = {
  fps: 60,
  clearColor: '#222',
  width: 600,
  height: 600,
  screens: []
}

class Game {
  protected ctx: CanvasRenderingContext2D

  protected screens: Screen[] = []
  protected screenIndex = 0

  protected lastTime: number = 0
  protected config: GameConfig

  protected fps = 0

  constructor(config: GameConfig = DEFAULT_CONFIG, canvas: Canvas) {
    this.config = config
    this.screens = this.config.screens
    this.screenIndex = 0
    this.ctx = canvas.ctx
  }

  loop = (timestamp: number) => {
    const delta = timestamp - this.lastTime
    const targetDelta = 1000 / this.config.fps

    // if (delta > targetDelta) {
    this.lastTime = timestamp

    this.fps = 1000 / delta

    this.update(delta)
    this.draw(this.ctx)

    // }

    window.requestAnimationFrame(this.loop)
  }

  start = () => window.requestAnimationFrame(this.loop)

  update(delta: number) {
    this.screens[this.screenIndex]?.update(delta)
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = this.config.clearColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!!this.screens[this.screenIndex]) {
      this.clear(this.ctx)
      this.screens[this.screenIndex].draw(ctx)
    }
  }

  setScreen(id: string) {
    // const foundScreen = this.screens.findIndex(screen => screen.id === id)
    // if (!foundScreen) {
    //   throw new Error(`Can't find screen with id ${id}`)
    // }

    // this.screenIndex = foundScreen
  }
}

export { Game }