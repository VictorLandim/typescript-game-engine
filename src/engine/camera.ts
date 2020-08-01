const LERP_FACTOR = 0.2

class Camera {
  width: number
  height: number
  x: number
  y: number

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }

  lerp(targetX: number, targetY: number) {

  }
}

export { Camera }