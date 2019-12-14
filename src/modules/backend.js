/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

export default class Backend {
  constructor({
    login, signup, logout, getUser, articles,
  }) {
    this._login = login
    this._signup = signup
    this._logout = logout
    this._getUser = getUser
    this._articles = articles
  }

  getAllArticles() {
    return fetch(this._articles,
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
        throw new Error(err.message)
      })
  }

  saveArticle(data) {
    return fetch(this._articles,
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
        if (!res.ok) throw new Error(`Ошибка сохранения карточки ${res.status}`)
        return res.json()
      })
      .then((res) => res._id)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  deleteArticle(id) {
    return fetch(`${this._articles}/${id}`,
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
        throw new Error(err.message)
      })
  }

  login(data) {
    return fetch(this._login,
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
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  signUp(data) {
    return fetch(this._signup,
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
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  logout() {
    return fetch(this._logout,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка выхода: ${res.status}`)
        return res.json()
      })
      .catch((e) => {
        throw new Error(e.message)
      })
  }

  getUserName() {
    return fetch(this._getUser, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
        return res.json()
      })
      .then((userInfo) => userInfo.user)
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
