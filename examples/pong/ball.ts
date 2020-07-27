import { Entity, Vector2, Circle, ShapeRenderer } from '../../src'
import { ParticleEmitter } from '../../src'
import { BALL_SPEED, PARTICLE_CONFIG } from './const'

class Ball extends Entity {
  velocity: Vector2
  bounds: Circle
  particleEmitter: ParticleEmitter

  constructor(id: string, x: number, y: number, radius: number) {
    super(id)

    this.velocity = new Vector2(0, 0)

    this.bounds = new Circle(
      new Vector2(x, y),
      radius, 'white')

    this.particleEmitter = new ParticleEmitter({
      ...PARTICLE_CONFIG,
      x,
      y,
      xOffset: radius / 2,
      yOffset: radius / 2,
    })
  }

  update(delta: number): void {
    this.bounds.position.x += this.velocity.x * delta * BALL_SPEED
    this.bounds.position.y += this.velocity.y * delta * BALL_SPEED

    this.particleEmitter.update(delta)
    this.particleEmitter.setPosition(this.bounds.position)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ShapeRenderer.circle(ctx, this.bounds)
    this.particleEmitter.draw(ctx)
  }

}

export { Ball }