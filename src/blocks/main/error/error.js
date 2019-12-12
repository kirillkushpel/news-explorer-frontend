import './error.css'

export default class ShowError {
  constructor() {
    this.domElement = document.querySelector('#server-fail')
    this.errorMessage = document.querySelector('#server-fail-message')
    this.domElement.addEventListener('click', () => this.hide())
  }

  show(message) {
    this.errorMessage.textContent = message
    this.domElement.classList.add('error__show')
  }

  hide() {
    this.errorMessage.textContent = ''
    this.domElement.classList.remove('error__show')
  }
}
