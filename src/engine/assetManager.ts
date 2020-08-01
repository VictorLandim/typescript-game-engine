import { Singleton } from "./util/singleton";

type Image = HTMLImageElement
type Audio = HTMLAudioElement

type Asset = Image | Audio

class AssetManagerSingleton extends Singleton<AssetManagerSingleton>{
  assets: Record<string, Asset> = {}
  total = 0

  loadImage(id: string, src: string): this {
    this.total++

    const image = new Image()
    image.src = src
    image.onload = () => {
      console.log(`Image '${id}' loaded.`)
      this.assets[id] = image
    }

    return this
  }

  loadAudio(id: string, src: string): this {
    this.total++

    const audio = new Audio()
    audio.src = src
    // audio.crossOrigin = 'anonymous'
    // audio.oncanplay = () => {
    audio.oncanplaythrough = () => {
      console.log(`Audio '${id}' loaded.`)
      this.assets[id] = audio
    }

    return this
  }

  get<T extends Asset>(id: string): T {
    const asset = <T>this.assets[id]

    if (!asset) {
      throw new Error(`Asset id: ${id} does not exist.`)
    }

    return asset
  }

  getAudio(id: string): HTMLAudioElement {
    const audio = <HTMLAudioElement>this.assets[id]

    if (!audio) {
      throw new Error(`Audio id: ${id} does not exist.`)
    }

    return audio
  }

  getImg(id: string): HTMLImageElement {
    const img = <HTMLImageElement>this.assets[id]

    if (!img) {
      throw new Error(`Image id: ${id} does not exist.`)
    }

    return img
  }

  progress() {
    return Object.keys(this.assets).length / this.total
  }

  finishedLoading() {
    return Object.keys(this.assets).length === this.total
  }
}

const AssetManager = AssetManagerSingleton.Instance(AssetManagerSingleton)

export { AssetManager, Image, Audio }