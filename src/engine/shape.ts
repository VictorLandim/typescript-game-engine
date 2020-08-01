import { Vector2 } from "./util/vector"

abstract class Shape {
  position: Vector2
  color: string
  fill: boolean

  constructor(position: Vector2, color = 'blue', fill = true) {
    this.position = position
    this.color = color
    this.fill = fill
  }

  // abstract draw(ctx: CanvasRenderingContext2D): void
}

class Circle extends Shape {
  radius: number

  constructor(position: Vector2, radius: number, color = 'blue') {
    super(position, color)
    this.radius = radius
  }
}

class Rect extends Shape {
  size: Vector2

  constructor(position: Vector2, size: Vector2, color = 'blue') {
    super(position, color)
    this.size = size
  }

  set(position: Vector2, size: Vector2) {
    this.position = position
    this.size = size
  }

}

class Triangle extends Shape {
  size: Vector2
}

class Polygon extends Shape {
  points: Vector2[]
}

export { Shape, Circle, Rect, Triangle, Polygon }