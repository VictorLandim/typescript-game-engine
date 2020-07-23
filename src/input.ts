import { range } from "./util/array"
import { Vector2 } from "./util/vector"
import { EventManager } from "./event"

const LEN = 222

const MOUSE_BUTTONS = {
  0: 'LEFT',
  1: 'MIDDLE',
  2: 'RIGHT'
}

const KEYS = {
  "0": 48,
  "_1": 49,
  "_2": 50,
  "_3": 51,
  "_4": 52,
  "_5": 53,
  "_6": 54,
  "_7": 55,
  "_8": 56,
  "_9": 57,
  "TAB": 9,
  "LEFT": 37,
  "UP": 38,
  "RIGHT": 39,
  "DOWN": 40,
  "PAGE_UP": 33,
  "PAGE_DOWN": 34,
  "END": 35,
  "HOME": 36,
  "ENTER": 13,
  "ESCAPE": 27,
  "SPACE": 32,
  "SHIFT": 16,
  "CAPS_LOCK": 20,
  "CONTROL": 17,
  "ALT": 18,
  "META": 91,
  "PAUSE": 19,
  "INSERT": 45,
  "DELETE": 46,
  "BACKSPACE": 8,
  "F1": 112,
  "F2": 113,
  "F3": 114,
  "F4": 115,
  "F5": 116,
  "F6": 117,
  "F7": 118,
  "F8": 119,
  "F9": 120,
  "F10": 121,
  "F11": 122,
  "F12": 123,
  "NUM_0": 96,
  "NUM_1": 97,
  "NUM_2": 98,
  "NUM_3": 99,
  "NUM_4": 100,
  "NUM_5": 101,
  "NUM_6": 102,
  "NUM_7": 103,
  "NUM_8": 104,
  "NUM_9": 105,
  "A": 65,
  "B": 66,
  "C": 67,
  "D": 68,
  "E": 69,
  "F": 70,
  "G": 71,
  "H": 72,
  "I": 73,
  "J": 74,
  "K": 75,
  "L": 76,
  "M": 77,
  "N": 78,
  "O": 79,
  "P": 80,
  "Q": 81,
  "R": 82,
  "S": 83,
  "T": 84,
  "U": 85,
  "V": 86,
  "W": 87,
  "X": 88,
  "Y": 89,
  "Z": 90
}

/**
 * REFACTOR TO USE EVENTS
 */
class Input {
  private ctx: CanvasRenderingContext2D
  private isDown: boolean[] = new Array(LEN)
  private wasDown: boolean[] = new Array(LEN)

  private mouseIsDown = {
    LEFT: false,
    MIDDLE: false,
    RIGHT: false
  }

  private mouseWasDown = {
    LEFT: false,
    MIDDLE: false,
    RIGHT: false
  }

  mouse = new Vector2(Infinity, Infinity)
  keys = KEYS
  events: EventManager

  constructor(ctx: CanvasRenderingContext2D) {
    this.events = new EventManager()
    this.ctx = ctx

    range(0, LEN).forEach(i => {
      this.isDown[i] = this.wasDown[i] = false
    })

    window.addEventListener('keydown', (e) => {
      e.preventDefault()
      this.isDown[e.keyCode] = true
    })

    window.addEventListener('keyup', (e) => {
      this.isDown[e.keyCode] = false
    })

    window.addEventListener('mousemove', (e) => {
      const { x, y } = this.getMousePosition(e)

      this.mouse.set(x, y,)
    })

    window.addEventListener('mousedown', (e) => {
      e.preventDefault()
      const mouseData = {
        position: this.getMousePosition(e),
        button: MOUSE_BUTTONS[e.button]
      }

      this.events.emit('mousedown', mouseData)

      this.mouseIsDown[MOUSE_BUTTONS[e.button]] = true
    })

    window.addEventListener('mouseup', (e) => {
      const mouseData = {
        position: this.getMousePosition(e),
        button: MOUSE_BUTTONS[e.button]
      }

      this.events.emit('mouseup', mouseData)

      this.mouseIsDown[MOUSE_BUTTONS[e.button]] = false
    })
  }

  private getMousePosition(e: MouseEvent) {
    let obj: Partial<HTMLElement> = this.ctx.canvas
    let top = 0
    let left = 0

    while (obj) {
      top += obj.offsetTop
      left += obj.offsetLeft
      obj = obj.offsetParent
    }

    let mouseX = e.clientX - this.ctx.canvas.offsetLeft + self.pageXOffset
    let mouseY = e.clientY - this.ctx.canvas.offsetTop + self.pageYOffset

    const { width, height } = this.ctx.canvas.getBoundingClientRect()

    mouseX = (mouseX / width) * this.ctx.canvas.width
    mouseY = (mouseY / height) * this.ctx.canvas.height

    return new Vector2(mouseX, mouseY)
  }

  update() {
    range(0, LEN).forEach(i => {
      this.wasDown[i] = this.isDown[i]
    })

    Object.keys(this.mouseIsDown).forEach(key => {
      this.mouseWasDown[key] = this.mouseIsDown[key]
    })
  }

  isKeyPressed(keyCode: number) {
    return !this.wasDown[keyCode] && this.isDown[keyCode]
  }

  isKeyReleased(keyCode: number) {
    return this.wasDown[keyCode] && !this.isDown[keyCode]
  }

  isKeyDown(keyCode: number) {
    return this.isDown[keyCode]
  }

  isMouseLeftClicked() {
    return !this.mouseWasDown.LEFT && this.mouseIsDown.LEFT
  }

  isMouseLeftReleased() {
    return this.mouseWasDown.LEFT && !this.mouseIsDown.LEFT
  }

  isMouseLeftDown() {
    return this.mouseIsDown.LEFT
  }

  isMouseMiddleClicked() {
    return !this.mouseWasDown.MIDDLE && this.mouseIsDown.MIDDLE
  }

  isMouseMiddleReleased() {
    return this.mouseWasDown.MIDDLE && !this.mouseIsDown.MIDDLE
  }

  isMouseMiddleDown() {
    return this.mouseIsDown.MIDDLE
  }

  isMouseRightClicked() {
    return !this.mouseWasDown.RIGHT && this.mouseIsDown.RIGHT
  }

  isMouseRightReleased() {
    return this.mouseWasDown.RIGHT && !this.mouseIsDown.RIGHT
  }

  isMouseRightDown() {
    return this.mouseIsDown.RIGHT
  }

  isMouseClicked() {
    return this.isMouseLeftClicked()
      || this.isMouseMiddleClicked()
      || this.isMouseRightClicked()
  }

  isMouseReleased() {
    return this.isMouseLeftReleased()
      || this.isMouseMiddleReleased()
      || this.isMouseRightReleased()
  }

  isMouseDown() {
    return this.isMouseLeftDown()
      || this.isMouseMiddleDown()
      || this.isMouseRightDown()
  }

}

export { Input }