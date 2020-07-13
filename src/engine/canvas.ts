import { Singleton } from "./util/singleton"

class CanvasSingleton extends Singleton<CanvasSingleton>{
  private element: HTMLCanvasElement

  ctx: CanvasRenderingContext2D
  width: number
  height: number

  constructor(width = 600, height = 600) {
    super()

    this.width = width
    this.height = height

    // const root = document.createElement('div')
    // root.id = "#root"

    this.element = document.createElement('canvas')

    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`

    const scale = window.devicePixelRatio || 1

    this.element.width = Math.floor(width * scale)
    this.element.height = Math.floor(height * scale)

    this.ctx = this.element.getContext('2d')

    this.ctx.scale(scale, scale)

    // root.append(this.element)
    document.querySelector('body').append(this.element)
  }
}

const Canvas = CanvasSingleton.Instance(CanvasSingleton)

export { Canvas }