/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
import './auth-form.css'

export default class AuthForm {
  constructor(domElement, goTo, handler, getUser, showError) {
    this.domElement = domElement
    this.closeButton = domElement.querySelector('.auth-form__close')
    this.closeButton.addEventListener('click', () => { this.close() })
    this.form = domElement.querySelector('.auth-form')
    this._pathMarker = goTo
    this.goTo = document.querySelector(goTo)
    this.nextStep = domElement.querySelector('.auth-form__other-action-click')
    this.nextStep.addEventListener('click', () => { this.openNext() })
    this.serverHandler = handler
    this.getUser = getUser
    this.showError = showError
    this.submitButton = ''
    this._inputs = []
    Array.from(this.form.elements)
      .forEach((item) => {
        if (item.nodeName == 'BUTTON') {
          this.submitButton = item
        }
        if (item.nodeName == 'INPUT') {
          this._inputs.push(item)
          item.addEventListener('input', () => this.inputHandler())
        }
      })
    this._updateView = new Event('updateView', { bubbles: true })
    this._updateMenu = new Event('updateMenu', { bubbles: true })
    this.form.addEventListener('submit', (event) => this.submitForm(event))
  }

  disableSubmitButton() {
    this.submitButton.setAttribute('disabled', true)
  }

  enableSubmitButton() {
    this.submitButton.removeAttribute('disabled', true)
  }

  disableInputs() {
    this._inputs.forEach((item) => item.setAttribute('disabled', true))
  }

  enableInputs() {
    this._inputs.forEach((item) => item.removeAttribute('disabled', true))
  }

  inputHandler() {
    this.form.querySelector(`#${this.form.name}-fatal`).classList.add('auth-form__error-message_hide')
    let validator = true
    this._inputs.forEach((item) => {
      if (!this.isValid(item)) { validator = false }
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
    this.disableInputs()
    this._inputs.forEach((item) => {
      userToSend[item.name === 'username' ? 'name' : item.name] = item.value
    })
    this.serverHandler(userToSend)
      .then(() => {
        if (this._pathMarker === '#signup-form') {
          this.close()
          this.enableSubmitButton()
          this.enableInputs()
          this.getUser()
            .then((res) => {
              // eslint-disable-next-line no-unused-expressions
              localStorage && localStorage.setItem('user', res)
              document.dispatchEvent(this._updateView)
              document.dispatchEvent(this._updateMenu)
            })
            .catch((err) => this.showError.show(err.message))
        }
        if (this._pathMarker === '#login-form') {
          this.goTo = document.querySelector('#signup-success')
          this.openNext()
          this.goTo = document.querySelector(this._pathMarker)
          this.enableSubmitButton()
          this.enableInputs()
        }
      })
      .catch((err) => {
        if (err.message === '400' || err.message === '401') {
          this.form.querySelector(`#${this.form.name}-fatal`).classList.remove('auth-form__error-message_hide')
        } else {
          this.showError.show(err.message)
        }
        this.enableSubmitButton()
        this.enableInputs()
      })
  }

  open() {
    this.domElement.classList.remove('service-wrapper_hide')
    document.querySelector('#scroll').classList.add('body-noscroll')
  }

  close() {
    document.querySelector('#scroll').classList.remove('body-noscroll')
    this.domElement.classList.add('service-wrapper_hide')
  }

  openNext() {
    this.domElement.classList.add('service-wrapper_hide')
    this.goTo.classList.remove('service-wrapper_hide')
  }
}
