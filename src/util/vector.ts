class Vector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.set(x, y)
  }

  set(x: number, y: number) {
    this.x = x
    this.y = y
  }

  clear() {
    this.x = 0
    this.y = 0
  }

  toString() {
    return `x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}`
  }
}

export { Vector2 }