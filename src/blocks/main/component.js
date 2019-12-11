export default class Component {
  constructor(domElement, mapEventsToHandlers = {}) {
    this.domElement = domElement

    Array.from(Object.keys(mapEventsToHandlers)).forEach((event) => {
      this.domElement.addEventListener(event, mapEventsToHandlers[event])
    })
  }
}
