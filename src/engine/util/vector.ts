export type IVector2 = {
  x: number
  y: number
}

class Vector2 implements IVector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public get() {
    return { x: this.x, y: this.y }
  }

  toString() {
    return `x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}`
  }
}

export { Vector2 }