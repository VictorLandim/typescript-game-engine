import { Entity, Vector2, ShapeRenderer, Rect } from '../../src'
import { PADDLE_SPEED } from './const'

class Paddle extends Entity {
  position: Vector2
  speed: number = PADDLE_SPEED
  size: Vector2
  bounds: Rect

  constructor(id: string, x: number, y: number, w: number, h: number) {
    super(id)

    this.position = new Vector2(x, y)
    this.size = new Vector2(w, h)

    this.bounds = new Rect(this.position, this.size, 'white')
  }

  update(delta: number): void {
  }

  moveUp(delta: number) {
    this.position.y -= delta * this.speed
  }

  moveDown(delta: number) {
    this.position.y += delta * this.speed
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ShapeRenderer.rect(ctx, this.bounds)
  }

}

export { Paddle }