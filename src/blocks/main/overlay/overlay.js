import './overlay.css'
// import MainHandler from '../MainHandler'

export default class Overlay {
  constructor() {
    this.element = document.querySelector('.overlay')
  }

  show() {
    this.element.classList.add('overlay_on')
  }

  hide() {
    this.element.classList.remove('overlay_on')
  }
}
