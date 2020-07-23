import { Circle, Rect } from "./shape"

class ShapeRenderer {
  static circle = (ctx: CanvasRenderingContext2D, circle: Circle, debug?: boolean): void => {
    ctx.save()
    ctx.fillStyle = circle.color
    ctx.beginPath()
    ctx.ellipse(
      circle.position.x,
      circle.position.y,
      circle.radius, circle.radius,
      0,
      0, 2 * Math.PI,
    );
    ctx.fill()

    if (debug) {
      ShapeRenderer.circle(ctx, { ...circle, radius: 2, color: 'red' }, false)
    }

    ctx.restore()
  }

  static rect = (ctx: CanvasRenderingContext2D, rect: Rect): void => {
    ctx.save()
    ctx.rect(
      rect.position.x - rect.size.x / 2,
      rect.position.y - rect.size.y / 2,
      rect.size.x,
      rect.size.y
    )
    ctx.fillStyle = rect.color
    ctx.fill()
    ctx.restore()
  }
  static triangle = (ctx: CanvasRenderingContext2D): void => { }
  static polygon = (ctx: CanvasRenderingContext2D): void => { }
}

export { ShapeRenderer }