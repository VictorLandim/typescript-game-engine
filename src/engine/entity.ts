import { EventManager } from './event'

interface Interactable {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
}

abstract class Entity {
  events: EventManager
  id: string

  constructor(id: string) {
    this.id = id
    this.events = new EventManager()
  }

  abstract update(delta: number): void
  abstract draw(ctx: CanvasRenderingContext2D): void
}

export { Entity, Interactable }