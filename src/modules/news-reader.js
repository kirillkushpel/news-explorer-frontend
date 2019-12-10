/* eslint-disable class-methods-use-this */
import config from './config'
import Error from '../blocks/main/error/error'

export default class NewsReader {
  constructor(isLogged, saveArticle, deleteArticle) {
    this.isLogged = isLogged
    this.saveArticle = saveArticle
    this.deleteArticle = deleteArticle
    this.Error = new Error()
    this.news = []
    this.cardTemplate = document.querySelector(config.cardSample).content
    this.resultsField = document.querySelector(config.resultsField)
    this.submit = document.forms[config.newsForm]
    this.searchString = document.forms[config.newsForm][config.newsFormSearchField]
    this.showMore = document.querySelector(config.showMore.node)
    this.preloader = document.querySelector(config.preloader.node)
    this.notFound = document.querySelector(config.notFound.node)
    this.serverError = document.querySelector(config.serverError.node)
    this.resultsSection = document.querySelector(config.resultsSection.node)
    this.currentPos = 0

    this.submit.addEventListener('submit', (event) => this.search(event))
    this.showMore.addEventListener('click', () => this.renderCards())
    this.resultsField.addEventListener('click', (event) => this.cardHandler(event))
    document.addEventListener('updateView', () => this.patchRender())
  }

  getNews(query) {
    const dateNow = new Date()
    const dateWeekAgo = new Date(dateNow - 7 * 24 * 3600 * 1000)
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    const dateFrom = `${dateWeekAgo.getFullYear()}-${dateWeekAgo.getMonth() + 1}-${dateWeekAgo.getDate()}`
    const url = `${config.newsFeed}&q=${query}&from=${dateFrom}&to=${dateTo}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Can not read news feed')
        return res.json()
      })
      .then((data) => {
        for (let i = 0; i < data.articles.length; i += 1) {
          this.news.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            text: data.articles[i].description,
            image: data.articles[i].urlToImage,
            link: data.articles[i].url,
            keyword: query,
          })
        }
        this.preloader.classList.add(config.preloader.hide)
        if (this.news.length === 0) {
          this.notFound.classList.remove(config.notFound.hide)
        } else {
          this.renderCards()
          this.resultsSection.classList.remove(config.resultsSection.hide)
        }
      })
      .catch((err) => {
        console.log(err.message)
        this.notFound.classList.add(config.notFound.hide)
        this.preloader.classList.add(config.notFound.hide)
        this.serverError.classList.remove(config.serverError.hide)
      })
  }

  buildCard(data) {
    const container = this.cardTemplate.cloneNode(true)
    container.querySelector(config.card.node).href = data.link
    container.querySelector(config.card.img).style.backgroundImage = `url(${data.image})`
    container.querySelector(config.card.date)
      .textContent = `${data.date.getDate()} ${config.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(config.card.title).textContent = data.title
    container.querySelector(config.card.text).textContent = data.text
    container.querySelector(config.card.src).textContent = data.source
    // eslint-disable-next-line max-len
    if (this.isLogged()) container.querySelector(config.card.icon.node).classList.add(config.card.icon.logged)
    container.querySelector(config.card.icon.node).setAttribute('cardID', this.currentPos)
    return container
  }

  renderCards() {
    const container = document.createDocumentFragment()
    const delta = this.news.length - this.currentPos
    const qty = (delta) < config.showStep ? delta : config.showStep
    if (delta <= config.showStep) this.showMore.classList.add(config.showMore.hide)
    for (let i = 0; i < qty; i += 1) {
      container.appendChild(this.buildCard(this.news[this.currentPos]))
      this.currentPos += 1
    }
    this.resultsField.appendChild(container)
  }

  clearResultsList() {
    this.currentPos = 0
    this.news.splice(0, this.news.length)
    while (this.resultsField.firstChild) {
      this.resultsField.removeChild(this.resultsField.firstChild)
    }
  }

  search(event) {
    this.serverError.classList.add(config.serverError.hide)
    this.resultsSection.classList.add(config.resultsSection.hide)
    this.notFound.classList.add(config.notFound.hide)
    this.preloader.classList.remove(config.preloader.hide)
    this.showMore.classList.remove(config.showMore.hide)
    event.preventDefault()
    if (this.news.length !== 0) {
      this.clearResultsList()
    }
    this.getNews(this.searchString.value)
    this.patchRender()
  }

  patchRender() {
    Array.from(this.resultsField.querySelectorAll(config.card.node)).forEach(
      (item) => {
        if (this.isLogged()) {
          item.querySelector(config.card.icon.node).classList.add(config.card.icon.logged)
        } else {
          item.querySelector(config.card.icon.node).classList.remove(config.card.icon.logged)
        }
        item.querySelector(config.card.icon.node).classList.remove(config.card.icon.marked)
      },
    )
  }

  cardHandler(event) {
    const iconClass = config.card.icon.node.slice(1, config.card.icon.node.length)
    if (event.target.className.includes(iconClass)) {
      event.preventDefault()
      if (this.isLogged()) {
        if (event.target.className.includes(config.card.icon.marked)) {
          this.deleteArticle(event.target.getAttribute('UID'))
            .then(() => {
              event.target.classList.remove(config.card.icon.marked)
              event.target.removeAttribute('UID')
            })
            .catch((err) => {
              this.Error.show(err.message)
            })
          event.target.classList.remove(config.card.icon.marked)
        } else {
          this.saveArticle(this.news[event.target.getAttribute('cardID')])
            .then((res) => {
              event.target.classList.add(config.card.icon.marked)
              event.target.setAttribute('UID', res)
            })
            .catch((err) => {
              this.Error.show(err.message)
            })
        }
      }
    }
  }
}
