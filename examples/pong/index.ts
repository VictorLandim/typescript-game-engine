import { Game, GameConfig, Canvas } from '../../src'
import { PlayScreen } from './playScreen'
import { StartScreen } from './startScreen'
import { SCREEN_HEIGHT, SCREEN_WIDTH, HEIGHT, WIDTH } from './const'

class PongGame extends Game {
  constructor() {
    const config: GameConfig = {
      clearColor: '#222',
      fps: 60,
      screenWidth: SCREEN_WIDTH,
      screenHeight: SCREEN_HEIGHT,
      virtualWidth: WIDTH,
      virtualHeight: HEIGHT
    }

    super(config)

    const playScreen = new PlayScreen('PlayScreen', this)
    const startScreen = new StartScreen('StartScreen', this)

    this
      .addScreen(startScreen)
      .addScreen(playScreen)

  }
}

document.addEventListener('DOMContentLoaded', new PongGame().start)