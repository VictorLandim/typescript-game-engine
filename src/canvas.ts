class Canvas {
  element: HTMLCanvasElement

  ctx: CanvasRenderingContext2D
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    // const root = document.createElement('div')
    // root.id = "#root"

    this.element = document.createElement('canvas')

    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.position = 'relative'

    const scale = window.devicePixelRatio || 1

    this.element.width = Math.floor(width * scale)
    this.element.height = Math.floor(height * scale)

    this.ctx = <CanvasRenderingContext2D>this.element.getContext('2d')

    this.ctx.scale(scale, scale)

    // root.append(this.element)

    const body = document.querySelector('body')

    if (body) {
      body.append(this.element)
    } else {
      throw new Error('Could not append game to document body.')
    }

    document.addEventListener('resize', this.resize)
  }

  resize() {

  }
}

export { Canvas }