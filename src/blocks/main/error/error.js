import './error.css'

export default class Error {
  constructor() {
    this.element = document.querySelector('#system-error')
    this.errorMessage = document.querySelector('#system-error-message')
    this.element.addEventListener('click', () => this.hide())
  }

  show(message) {
    this.errorMessage.textContent = message
    document.body.classList.add('scroll-lock')
    this.element.classList.add('sys-error_on')
  }

  hide() {
    this.errorMessage.textContent = ''
    document.body.classList.remove('scroll-lock')
    this.element.classList.remove('sys-error_on')
  }
}
