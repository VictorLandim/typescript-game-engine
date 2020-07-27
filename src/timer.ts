import { Entity } from "./entity"

class Timer extends Entity {
  private counter: number
  private maxTime: number
  private repeat: boolean
  private hasCounted: boolean
  private callback: () => void

  constructor(id: string, maxTime: number, repeat: boolean, callback: () => void) {
    super(id)
    this.maxTime = maxTime
    this.repeat = repeat
    this.callback = callback
  }

  update(delta: number) {
    if (this.hasCounted && !this.repeat) {
      return
    }

    this.counter += delta

    if (this.counter >= this.maxTime) {
      this.counter = 0
      this.hasCounted = true
      this.callback()
    }
  }

  draw(ctx: CanvasRenderingContext2D) { }

}

export { Timer }