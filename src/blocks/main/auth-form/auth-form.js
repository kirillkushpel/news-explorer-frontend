/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
import './auth-form.css'

export default class AuthForm {
  constructor(domElement, goTo) {
    this.domElement = domElement
    this.closeButton = domElement.querySelector('.auth-form__close')
    this.closeButton.addEventListener('click', () => { this.close() })
    this.form = domElement.querySelector('.auth-form')
    this.goTo = document.querySelector(goTo)
    this.nextStep = domElement.querySelector('.auth-form__other-action-click')
    this.nextStep.addEventListener('click', () => { this.openNext() })
    this._callExt = () => { console.log('Add the callback via class setter') }
    this.submitButton = ''
    Array.from(this.form.elements)
      .forEach((item) => {
        if (item.nodeName == 'BUTTON') {
          this.submitButton = item
        }
        if (item.nodeName == 'INPUT') {
          item.addEventListener('input', () => this.inputHandler())
        }
      })
    this.form.addEventListener('submit', (event) => this.submitForm(event))
  }

  get callExt() {
    return this._callExt
  }

  set callExt(func) {
    this._callExt = func
  }

  disableSubmitButton() {
    this.submitButton.setAttribute('disabled', true)
  }

  enableSubmitButton() {
    this.submitButton.removeAttribute('disabled', true)
  }

  inputHandler() {
    this.form.querySelector(`#${this.form.name}-fatal`).classList.add('auth-form__error-message_hide')
    let validator = true
    Array.from(this.form.elements).forEach((item) => {
      if (item.nodeName == 'INPUT') {
        if (!this.isValid(item)) { validator = false }
      }
    })
    if (validator) {
      this.enableSubmitButton()
    } else {
      this.disableSubmitButton()
    }
  }

  isValid(elementToCheck) {
    const errorElement = document.querySelector(`#error-${elementToCheck.id}`)
    if (!elementToCheck.validity.valid) {
      errorElement.classList.remove('auth-form__error-message_hide')
      return false
    }
    errorElement.classList.add('auth-form__error-message_hide')
    return true
  }

  submitForm(event) {
    const userToSend = {}
    event.preventDefault()
    this.disableSubmitButton()
    Array.from(this.form.elements).forEach((item) => {
      if (item.nodeName == 'INPUT') {
        userToSend[item.name === 'username' ? 'name' : item.name] = item.value
      }
    })
    this.callExt(userToSend)
      .catch(() => {
        this.form.querySelector(`#${this.form.name}-fatal`).classList.remove('auth-form__error-message_hide')
        this.enableSubmitButton()
      })
  }

  open() {
    this.domElement.classList.remove('auth-form__wrapper_hide')
    document.body.classList.add('scroll-lock')
  }

  close() {
    document.body.classList.remove('scroll-lock')
    this.domElement.classList.add('auth-form__wrapper_hide')
  }

  openNext() {
    this.domElement.classList.add('auth-form__wrapper_hide')
    this.goTo.classList.remove('auth-form__wrapper_hide')
  }
}
