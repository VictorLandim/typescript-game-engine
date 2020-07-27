import { Particle } from './particle'
import { range, Vector2, randomf } from './util/index'
import { Pool } from './pool'

export type EmitterConfig = {
  x: number
  y: number
  xOffset: number
  yOffset: number
  size: number
  frequency: number
  gravity: number
  lifespan: number
  quantity: number
  speed: number
}

class ParticleEmitter {
  private particles: Particle[] = []
  private pool: Pool<Particle> = new Pool()
  private timer = 0
  config: EmitterConfig

  constructor(config: EmitterConfig) {
    this.config = config

    this.createParticles()
  }

  createParticles(): void {
    Array(this.config.quantity).fill(0).forEach(i => {
      const velocity = new Vector2(
        randomf(-this.config.speed, this.config.speed),
        randomf(-this.config.speed, this.config.speed)
      )

      const xOffset = randomf(-this.config.xOffset, this.config.yOffset)
      const yOffset = randomf(-this.config.xOffset, this.config.yOffset)

      const position = new Vector2(
        this.config.x + xOffset,
        this.config.y + yOffset
      )

      let particle = this.pool.get()

      if (particle === null) {
        particle = new Particle(
          this.config.lifespan,
          this.config.size,
          position,
          velocity
        )
      } else {
        particle.set(
          this.config.lifespan,
          this.config.size,
          position,
          velocity
        )
      }

      this.particles.push(particle)
    })
  }

  update(delta: number): void {
    this.timer += delta

    if (this.timer >= this.config.frequency) {
      this.createParticles()
      this.timer = 0
    }

    this.particles = this.particles.filter(particle => {
      particle.update(delta)
      particle.velocity.y += this.config.gravity

      const { shouldRemove } = particle

      if (particle.shouldRemove) {
        this.pool.add(particle)       // updates items `shouldRemove`
      }

      return !shouldRemove
    })
  }

  setPosition(position: Vector2) {
    this.config.x = position.x
    this.config.y = position.y
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.particles.forEach(particle => particle.draw(ctx))
  }

  clear() {
    this.particles = []
  }
}

export { ParticleEmitter }