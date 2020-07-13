import { Singleton } from "./singleton"
import { range } from "./array"
import { Vector2 } from "./vector"

const LEN = 222

class InputSingleton extends Singleton<InputSingleton> {
  private isDown: boolean[]
  private wasDown: boolean[]
  private mouse: Vector2
  keys = {
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

  constructor() {
    super()

    this.isDown = new Array(LEN)
    this.wasDown = new Array(LEN)

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

    })
  }

  update() {
    range(0, LEN).forEach(i => {
      this.wasDown[i] = this.isDown[i]
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

  getMouse() {
    return this.mouse
  }
}

const Input = InputSingleton.Instance(InputSingleton)


export { Input }