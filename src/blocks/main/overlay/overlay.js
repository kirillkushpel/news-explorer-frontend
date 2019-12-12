import './overlay.css'
// import Component from '../component'

export default class Overlay {
  constructor() {
    this.domElement = document.querySelector('.overlay')
  }

  show() {
    this.domElement.classList.add('overlay_on')
  }

  hide() {
    this.domElement.classList.remove('overlay_on')
  }
}
