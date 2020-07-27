import { Entity } from "./entity"
import { Input } from './input'
import { Game } from "./game"

abstract class Screen {
  protected game: Game
  protected ctx: CanvasRenderingContext2D
  protected entities: Record<string, Entity>
  protected input: Input
  id: string

  constructor(id: string, game: Game) {
    this.game = game

    this.id = id

    this.entities = {}

    this.game = game
    this.input = new Input(game.renderer.ctx)
  }

  update(delta: number) {
    Object.keys(this.entities).forEach(key => this.entities[key].update(delta))
  }

  draw(ctx: CanvasRenderingContext2D) {
    // only redraw if has changed?
    Object.keys(this.entities).forEach(key => this.entities[key].draw(ctx))
  }

  addEntity(entity: Entity): this {
    const { id } = entity

    if (this.entities[id]) {
      throw new Error(`Entity with id: ${id} already exists.`)
    }

    this.entities[id] = entity

    return this
  }

  removeEntity(id: string) {
    if (!(delete this.entities[id])) {
      throw new Error(`Entity id: ${id} does not exist.`)
    }
  }

  getEntity<T extends Entity>(id: string): T {
    const entity = <T>this.entities[id]

    if (!entity) {
      throw new Error(`Entity id: ${id} does not exist.`)
    }
    return entity
  }
}


export { Screen }