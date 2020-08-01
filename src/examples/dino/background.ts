import { Entity } from "~/engine";

class Background extends Entity {

  constructor(id: string) {
    super(id)
  }

  update(delta: number): void {
  }
  draw(ctx: CanvasRenderingContext2D): void {
  }
}

export { Background }