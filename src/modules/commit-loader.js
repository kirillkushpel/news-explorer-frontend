/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import config from './config'

export default class CommitLoader {
  constructor(swiper) {
    this.commits = []
    this.swiperUpdate = swiper
    this.cardTemplate = document.querySelector('#commit-sample').content
    this.getCommits()
  }

  getCommits() {
    fetch(config.git)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения из Git -- ${res.status}`)
        return res.json()
      })
      .then((data) => {
        for (let key = 0; key < Array.from(Object.keys(data)).length; key += 1) {
          this.commits.push({
            name: data[key].commit.committer.name,
            email: data[key].commit.committer.email,
            date: new Date(Date.parse(data[key].commit.committer.date)),
            message: data[key].commit.message,
            avatar: data[key].author.avatar_url,
          })
        }
        this.renderCommits()
      })
      .catch((err) => {
        console.log(err.message)
        // Если коммиты не получены, скрываем весь блок с коммитами совсем
        document.querySelector('.slider').style.display = 'none'
      })
  }

  buildCommit(data) {
    const container = this.cardTemplate.cloneNode(true)

    container.querySelector('.slider__commit-date')
      .textContent = `${data.date.getDate()} ${config.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector('.slider__commit-image').src = data.avatar
    container.querySelector('.slider__commit-name').textContent = data.name
    container.querySelector('.slider__commit-email').textContent = data.email
    container.querySelector('.slider__commit-text').textContent = data.message
    return container
  }

  renderCommits() {
    const container = document.createDocumentFragment()
    // eslint-disable-next-line max-len
    const qty = this.commits.lenght < config.maxGitCommits ? this.commits.lenght : config.maxGitCommits
    for (let i = 0; i < qty; i += 1) {
      container.appendChild(this.buildCommit(this.commits[i]))
    }
    document.querySelector('.swiper-wrapper').appendChild(container)
    this.swiperUpdate()
  }
}
