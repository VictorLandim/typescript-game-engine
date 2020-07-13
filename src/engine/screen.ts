import { Entity } from "./entity";

abstract class Screen {
  protected entities: Entity[]
  id: string

  constructor(id: string) {
    this.id = id;

    this.entities = []
  }

  update(delta: number) {
    this.entities.forEach(entity => entity.update(delta))
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.entities.forEach(entity => entity.draw(ctx))
  }

  addEntity(entity: Entity) {
    this.entities = [...this.entities, entity]
  }

  removeEntity(id: string) {
    this.entities = this.entities.filter(entity => entity.id !== id)
  }

  findEntity(id: string) {
    return this.entities.find(entity => entity.id === id)
  }
}

export { Screen }