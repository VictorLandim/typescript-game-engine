import { ShapeRenderer } from "./shapeRenderer";
import { Circle } from "./shape";
import { Vector2, clamp } from "./util/index";
import { Poolable } from "./pool";

class Particle implements Poolable {
  private timer = 0
  private lifeSpan: number
  private bounds: Circle
  private velocity: Vector2
  shouldRemove = false

  constructor(lifeSpan: number, size: number, position: Vector2, velocity: Vector2) {
    this.reset()
    this.set(lifeSpan, size, position, velocity)
  }

  set(lifeSpan: number, size: number, position: Vector2, velocity: Vector2): void {
    this.lifeSpan = lifeSpan
    this.bounds = new Circle(position, size, 'white')
    this.velocity = velocity
  }

  reset(): void {
    this.lifeSpan = 0
    this.timer = 0
    this.bounds = null
    this.velocity = null
    this.shouldRemove = false
  }

  update(delta: number): void {
    this.timer += delta

    if (this.timer >= this.lifeSpan) {
      this.shouldRemove = true
    }

    this.bounds.position.x += this.velocity.x * delta
    this.bounds.position.y += this.velocity.y * delta
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const progress = this.timer / this.lifeSpan

    ctx.save()
    ctx.globalAlpha = clamp(1 - progress, 0, 1)
    ShapeRenderer.circle(ctx, this.bounds)
    ctx.restore()
  }

}

export { Particle }