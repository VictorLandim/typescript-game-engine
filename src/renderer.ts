import { Camera } from "./camera"

class Renderer {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  camera: Camera // virtual width and height

  virtual_width: number
  virtual_height: number

  screen_width: number
  screen_height: number

  constructor(virtual_width: number, virtual_height: number, screen_width: number, screen_height: number) {
    this.screen_width = screen_width
    this.screen_height = screen_height

    this.virtual_width = virtual_width
    this.virtual_height = virtual_height

    this.camera = new Camera(virtual_width, virtual_height, 0, 0)

    this.createCanvas()

    document.addEventListener('resize', this.resize)
  }

  createCanvas() {
    const root = document.createElement('div')
    root.id = "#root"

    this.canvas = document.createElement('canvas')
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')

    root.style.width = `${this.screen_width}px`
    root.style.height = `${this.screen_height}px`
    root.style.position = 'relative'

    this.canvas.style.width = `${this.screen_width}px`
    this.canvas.style.height = `${this.screen_height}px`
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'

    // Crisp canvas
    const pixelScale = window.devicePixelRatio || 1

    this.canvas.width = Math.floor(this.screen_width * pixelScale)
    this.canvas.height = Math.floor(this.screen_height * pixelScale)

    this.applyDefaultTransformation()

    const body = document.querySelector('body')

    if (body) {
      root.append(this.canvas)
      body.append(root)
    } else {
      throw new Error('Could not append game to document body.')
    }
  }

  resize() { }

  applyDefaultTransformation() {
    const pixelScale = window.devicePixelRatio || 1

    const worldScreenRatioWidth = this.screen_width / this.camera.width
    const worldScreenRatioHeight = this.screen_height / this.camera.height

    this.ctx.setTransform(
      worldScreenRatioWidth * pixelScale,    // scaleX
      0,                                     // skewX
      0,                                     // skewY
      worldScreenRatioHeight * pixelScale,   // scaleY
      -this.camera.x,                        // translateX
      -this.camera.y                         // translateY
    )
  }
}

export { Renderer }