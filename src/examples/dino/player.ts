import { Entity, Rect, Vector2, ShapeRenderer, Image, Timer } from "../../engine";

class Player extends Entity {
  bounds: Rect
  spritesheet: Image
  spriteTimer: Timer
  flip = false

  constructor(id: string, spritesheet: Image) {
    super(id)

    this.bounds = new Rect(
      new Vector2(0, 0),
      new Vector2(35, 70),
      'rebeccapurple'
    )

    this.spriteTimer = new Timer('spriteTimer', 200, true, () => {
      this.flip = !this.flip
    })

    this.spritesheet = spritesheet
  }

  update(delta: number): void {
    this.spriteTimer.update(delta)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.imageSmoothingEnabled = false;

    if (this.flip) {
      ctx.drawImage(
        this.spritesheet,
        938, 0,
        40, 50,
        0, 0,
        20, 25)
    } else {
      ctx.drawImage(
        this.spritesheet,
        938 + 40 + 4, 0,
        40, 50,
        0, 0,
        20, 25)
    }
  }

}

export { Player }