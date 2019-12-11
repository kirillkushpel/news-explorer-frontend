
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import Auth from '../blocks/main/auth-form/auth-form'
import config from './config'

const loginForm = new Auth(
  document.querySelector('#login-form'),
  '#signup-form',
)

const signupForm = new Auth(
  document.querySelector('#signup-form'),
  '#login-form',
)

const regComplete = new Auth(
  document.querySelector('#signup-ok'),
  '#login-form',
)

class Explorer {
  constructor() {
    this.userMenuHandler = () => loginForm.open()
    this._callExt = null
    this.updateView = new Event('updateView', { bubbles: true })
  }

  // eslint-disable-next-line class-methods-use-this
  get userName() {
    return localStorage.getItem('user')
  }

  isLogged() {
    return Boolean(this.userName)
  }

  logout() {
    fetch(config.logout,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка выхода ${res.status}`)
        return res.json()
      })
      .then(() => {
        localStorage.clear()
        document.dispatchEvent(this.updateView)
      })
      .catch((e) => console.log(e.message))
  }

  login(data) {
    return fetch(config.login,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка авторизации ${res.status}`)
        return res.json()
      })
      .then((answer) => {
        fetch(config.getUser, { credentials: 'include' })
          .then((res) => {
            if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
            return res.json()
          })
          .then((userInfo) => {
            localStorage.setItem('user', userInfo.user)
            loginForm.enableSubmitButton()
            loginForm.close()
            document.dispatchEvent(this.updateView)
          })
          .catch((e) => console.log(e.message))
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }

  signUp(data) {
    return fetch(config.signup,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status} -- ${res.text()}`)
        return res.json()
      })
      .then(() => {
        signupForm.close()
        regComplete.open()
        return Promise.resolve()
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }

  saveArticle(data) {
    return fetch(config.articles,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сохранения карточки ${res.status}}`)
        return res.json()
      })
      .then((res) => res._id)
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }

  deleteArticle(id) {
    return fetch(`${config.articles}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка удаления карточки ${res.status}`)
        return res.json()
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }

  getAllArticles() {
    return fetch(config.articles,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения карточек ${res.status}`)
        return res.json()
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }
}

const apiEx = new Explorer()
loginForm.callExt = apiEx.login.bind(apiEx)
signupForm.callExt = apiEx.signUp.bind(apiEx)

export default apiEx
