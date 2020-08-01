import { AssetManager } from './assetManager'

class AudioManager {
  static async play(id: string) {
    const sound = AssetManager.getAudio(id)
    sound.pause()
    sound.currentTime = 0

    await sound.play()
  }
}

export { AudioManager }