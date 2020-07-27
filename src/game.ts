import { Screen } from "./screen"
import { Canvas } from "./canvas"
import { Renderer } from "./renderer"

export type GameConfig = {
  fps?: number
  clearColor: string
  screenWidth: number
  screenHeight: number
  virtualWidth: number
  virtualHeight: number
}

const DEFAULT_CONFIG: GameConfig = {
  fps: 60,
  clearColor: '#222',
  screenWidth: 500,
  screenHeight: 500,
  virtualWidth: 5,
  virtualHeight: 5
}
class Game {
  renderer: Renderer

  protected screens: Screen[] = []
  protected screenIndex = 0

  protected lastTime: number = 0
  protected config: GameConfig

  protected fps = 0

  constructor(config: GameConfig = DEFAULT_CONFIG) {
    this.config = config
    this.screens = []
    this.screenIndex = 0

    this.renderer = new Renderer(
      this.config.virtualWidth,
      this.config.virtualHeight,
      this.config.screenWidth,
      this.config.screenHeight
    )
  }

  loop = (timestamp: number) => {
    const delta = timestamp - this.lastTime
    const targetDelta = 1000 / this.config.fps

    // if (delta > targetDelta) {
    this.lastTime = timestamp

    this.fps = 1000 / delta

    this.update(delta)
    this.draw(this.renderer.ctx)

    // }

    window.requestAnimationFrame(this.loop)
  }

  start = () => window.requestAnimationFrame(this.loop)

  update(delta: number) {
    this.screens[this.screenIndex]?.update(delta)
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.config.clearColor
    ctx.clearRect(0, 0, this.renderer.virtual_width, this.renderer.virtual_height)
    ctx.fillRect(0, 0, this.renderer.virtual_width, this.renderer.virtual_height)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!!this.screens[this.screenIndex]) {
      this.renderer.applyDefaultTransformation()
      this.clear(this.renderer.ctx)
      this.screens[this.screenIndex].draw(ctx)
    }
  }

  setScreen(id: string) {
    const foundScreenIndex = this.screens.findIndex(screen => screen.id === id)

    if (foundScreenIndex === -1) {
      throw new Error(`Can't find screen with id ${id}`)
    }

    this.screenIndex = foundScreenIndex
  }

  addScreen(screen: Screen): this {
    this.screens.push(screen)
    return this
  }
}

export { Game }