interface Poolable {
  reset(): void
  set(...args: any[]): void
}

class Pool<T extends Poolable> {
  items: T[] = []

  get() {
    const [first, ...rest] = this.items
    this.items = rest

    return first || null
  }

  add(item: T) {
    item.reset()
    this.items.push(item)
  }
}


export { Pool, Poolable }