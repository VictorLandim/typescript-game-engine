import { Entity, Vector2, ShapeRenderer, Rect } from '../../engine'
import { PADDLE_SPEED } from './const'

class Paddle extends Entity {
  speed: number = PADDLE_SPEED
  bounds: Rect

  constructor(id: string, x: number, y: number, w: number, h: number) {
    super(id)

    this.bounds = new Rect(new Vector2(x, y), new Vector2(w, h), 'white')
  }

  update(delta: number): void {
  }

  moveUp(delta: number) {
    this.bounds.position.y -= delta * this.speed
  }

  moveDown(delta: number) {
    this.bounds.position.y += delta * this.speed
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ShapeRenderer.rect(ctx, this.bounds)
  }

}

export { Paddle }