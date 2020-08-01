type EventHandler = (...args: any[]) => void

class EventManager {
  private handlers: Record<string, EventHandler[]> = {}

  on(event: string, handler: EventHandler) {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }

    this.handlers[event] = [...this.handlers[event], handler]
  }

  off(event: string, handler: EventHandler) {
    this.handlers[event] = this.handlers[event].filter(h => h !== handler)
  }

  emit(event: string, ...args: any[]) {
    const handlers = this.handlers[event] || []

    handlers.forEach(handler => handler(...args))
  }
}

export { EventManager }