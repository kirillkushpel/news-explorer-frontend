import './scroll-lock.css'

export default class ModalsHandler {
  constructor(keyboard, mouse) {
    this.keyboard = keyboard
    this.mouse = mouse
    this.modals = Array.from(this.keyboard.querySelectorAll('.service-wrapper'))
    this.keyboard.addEventListener('keydown', (event) => this.keyDown(event))
    this.mouse.addEventListener('click', (event) => this.click(event))
  }

  keyDown(event) {
    if (Array.from(this.mouse.classList).includes('body-noscroll')) {
      if (event.code === 'Escape') {
        this.modals.find(
          // eslint-disable-next-line no-confusing-arrow
          (element) => !Array.from(element.classList)
            .includes('service-wrapper_hide'),
        ).classList.add('service-wrapper_hide')
        this.mouse.classList.remove('body-noscroll')
      }
    }
  }

  click(event) {
    if (Array.from(event.target.classList).includes('service-wrapper')) {
      event.target.classList.add('service-wrapper_hide')
      this.mouse.classList.remove('body-noscroll')
    }
  }
}
