import { Game, GameConfig, Canvas } from '../../src/index'
import MainScreen from './screen'

class PongGame extends Game {
  constructor() {
    const config: GameConfig = {
      clearColor: '#222',
      fps: 60,
      width: 1000,
      height: 700,
      screens: []
    }

    const canvas = new Canvas(config.width, config.height)
    const mainScreen = new MainScreen('MainScreen', canvas.ctx)

    config.screens = [mainScreen]

    super(config, canvas)
  }
}

document.addEventListener('DOMContentLoaded', new PongGame().start)