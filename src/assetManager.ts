import { Singleton } from "./util/singleton";

type Asset = HTMLImageElement | HTMLAudioElement

class AssetManagerSingleton extends Singleton<AssetManagerSingleton>{
  assets: Record<string, Asset> = {}

  loadImage(id: string, src: string) {
    const image = new Image()
    image.src = src
    this.assets[id] = image
    image.onload = () => {
      console.log(`Image ${id} loaded.`)
    }
  }

  loadAudio(id: string, src: string) {
    const audio = new Audio(src)
    audio.src = src
    audio.crossOrigin = 'anonymous'
    this.assets[id] = audio
    audio.onload = () => {
      console.log(`Audio ${id} loaded.`)
    }
  }

  get<T extends Asset>(id: string): T {
    const asset = <T>this.assets[id]

    if (!asset) {
      throw new Error(`Asset id: ${id} does not exist.`)
    }

    return asset
  }
}

const AssetManager = AssetManagerSingleton.Instance(AssetManagerSingleton)

export { AssetManager }