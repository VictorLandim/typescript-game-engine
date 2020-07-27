import { EmitterConfig } from '../../src/particleEmitter'

export const DEBUG = true

export const SCREEN_WIDTH = 1200
export const SCREEN_HEIGHT = 600

export const WIDTH = 200   // virtual
export const HEIGHT = 100  // virtual

export const PADDLE_SPEED = 0.09
export const MAX_PADDLE_SPEED = 1
export const BALL_SPEED = 0.075
export const MAX_BALL_SPEED = 1

export const BALL_R = 1.4
export const PADDLE_W = 2
export const PADDLE_H = 15
export const PAD = PADDLE_W

export const POINTS_TO_WIN = 10

export const TIME_TO_RESET = 500

export const PARTICLE_CONFIG: EmitterConfig = {
  frequency: 25,
  gravity: 0,
  lifespan: 300,
  quantity: 2,
  size: BALL_R * 0.45,
  speed: 0.01,
  x: 0,
  y: 0,
  xOffset: 0,
  yOffset: 0
}

export const PARTICLE_CONFIG_DEBUG: EmitterConfig = {
  frequency: 500,
  gravity: 0,
  lifespan: 2000,
  quantity: 1,
  size: 50,
  speed: 0.01,
  x: 0,
  y: 0,
  xOffset: 0,
  yOffset: 0
}