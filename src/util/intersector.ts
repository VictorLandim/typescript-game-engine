import { Shape, Rect, Circle } from "../shape"
import { Vector2 } from "./vector"

const pointRect = (point: Vector2, rect: Rect) => (
  (point.x > rect.position.x && point.x < rect.position.x + rect.size.x) &&
  (point.y > rect.position.y && point.y < rect.position.y + rect.size.y)
)

const rectRect = (a: Rect, b: Rect) => (false)

const rectCircle = (rect: Rect, circle: Circle) => {
  const dx = Math.abs(circle.position.x - rect.position.x) - rect.size.x / 2
  const dy = Math.abs(circle.position.y - rect.position.y) - rect.size.y / 2

  if (dx > circle.radius || dy > circle.radius) return false
  if (dx <= 0 || dy <= 0) return true

  return (dx * dx + dy * dy <= circle.radius * circle.radius)

}

export const Intersector = {
  pointRect,
  rectRect,
  rectCircle
}