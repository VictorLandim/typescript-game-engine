import { Entity, Vector2, Circle, ShapeRenderer, EventManager } from '../../src/index'
import { ParticleEmitter } from '../../src/particleEmitter'

const BALL_SPEED = 0.5

class Ball extends Entity {
  position: Vector2
  angle: number | null = null
  bounds: Circle
  particleEmitter: ParticleEmitter

  constructor(x: number, y: number, radius: number) {
    super('Ball')

    this.position = new Vector2(x, y)
    this.bounds = new Circle(this.position, radius, 'white')
    this.particleEmitter = new ParticleEmitter({
      frequency: 50,
      gravity: 0,
      lifespan: 750,
      quantity: 10,
      size: 5,
      speed: 0.05,
      x,
      y,
      xOffset: radius / 2,
      yOffset: radius / 2,
    })
    // this.particleEmitter = new ParticleEmitter({
    //   frequency: 500,
    //   gravity: 0,
    //   lifespan: 2000,
    //   quantity: 1,
    //   size: 50,
    //   speed: 0.01,
    //   x,
    //   y,
    //   xOffset: radius / 2,
    //   yOffset: radius / 2,
    // })
  }

  update(delta: number): void {
    const velX = this.angle !== null
      ? delta * BALL_SPEED * Math.cos(this.angle)
      : 0
    const velY = this.angle !== null
      ? delta * BALL_SPEED * Math.sin(this.angle)
      : 0

    this.position.x += velX
    this.position.y += velY

    this.particleEmitter.update(delta)
    this.particleEmitter.setPosition(this.bounds.position)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ShapeRenderer.circle(ctx, this.bounds, true)
    this.particleEmitter.draw(ctx)
  }

}

export default Ball;