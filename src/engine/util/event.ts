type EventHandler = ((...args: any[]) => void)

class Event {
  handlers: Record<string, EventHandler[]>

  on(event: string, handler: EventHandler) {
    if (this.handlers[event].length === 0) {
      this.handlers[event] = []
    }

    this.handlers[event] = [...this.handlers[event], handler]
  }

  off(event: string, handler: EventHandler) {
    this.handlers[event] = this.handlers[event].filter(h => h !== handler)
  }

  trigger(event: string, ...args: any[]) {
    const handlers = this.handlers[event] || []

    handlers.forEach(handler => handler(...args))
  }
}

export { Event }