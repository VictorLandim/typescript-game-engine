import { Entity } from "./entity";
import { Input } from './input'

abstract class Screen {
  protected ctx: CanvasRenderingContext2D
  protected entities: Record<string, Entity>
  protected input: Input
  id: string

  constructor(id: string, ctx: CanvasRenderingContext2D) {
    this.id = id;

    this.entities = {}
    this.ctx = ctx
    this.input = new Input(ctx)
  }

  update(delta: number) {
    Object.keys(this.entities).forEach(key => this.entities[key].update(delta))
  }

  draw(ctx: CanvasRenderingContext2D) {
    // se mudou apenas!!!
    Object.keys(this.entities).forEach(key => this.entities[key].draw(ctx))
  }

  addEntity(key: string, entity: Entity) {
    if (this.entities[key]) {
      throw new Error("Key already exists.")
    }

    this.entities[key] = entity

    return this
  }

  removeEntity(key: string) {
    if (!(delete this.entities[key])) {
      throw new Error("Key not found.")
    }
  }
}


export { Screen }