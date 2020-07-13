import { IVector2, Vector2 } from './util/vector'

abstract class Entity {
  abstract position: IVector2
  id: string

  constructor(id: string) {
    this.id = id;
  }

  abstract update(delta: number): void
  abstract draw(ctx: CanvasRenderingContext2D): void
}

export { Entity }