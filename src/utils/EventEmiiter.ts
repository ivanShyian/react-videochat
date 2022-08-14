interface IEvents {
  [key: string]: any
}

export default class EventEmitter {
  events: IEvents
  constructor() {
    this.events = {}
  }

  on(event: string, listener: (...args: any) => any) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(listener)
  }

  emit(event: string, payload?: any) {
    console.log(event)
    console.log(this.events)
    if (this.events[event]) {
      this.events[event].forEach((listener: any) => {
        listener(payload)
      })
    }
  }
}
