export default class MainHandler {
  constructor(element, mapEventsToHandlers = {}) {
    this.element = element;

    Array.from(Object.keys(mapEventsToHandlers)).forEach((event) => {
      this.element.addEventListener(event, mapEventsToHandlers[event]);
    });
  }
}
