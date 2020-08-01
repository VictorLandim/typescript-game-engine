import { Game, GameConfig } from '../../engine'
import { PlayScreen } from './playScreen'
import { SCREEN_HEIGHT, SCREEN_WIDTH, HEIGHT, WIDTH } from './const'
import { LoadScreen } from './loadScreen'

class DinoGame extends Game {
  constructor() {
    const config: GameConfig = {
      clearColor: '#fafafa',
      fps: 60,
      screenWidth: SCREEN_WIDTH,
      screenHeight: SCREEN_HEIGHT,
      virtualWidth: WIDTH,
      virtualHeight: HEIGHT
    }

    super(config)

    const loadScreen = new LoadScreen('LoadScreen', this)
    const playScreen = new PlayScreen('PlayScreen', this)

    this
      .addScreen(loadScreen)
      .addScreen(playScreen)

  }
}

document.addEventListener('DOMContentLoaded', new DinoGame().start)