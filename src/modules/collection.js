/* eslint-disable class-methods-use-this */
export default class Collection {
  constructor(getAllArticles, deleteArticle,
    {
      cardSample, collection, card, month,
    }, showError) {
    this.cfg = collection
    this.month = month
    this.showError = showError
    this.card = card
    this.getAllArticles = getAllArticles
    this.deleteArticle = deleteArticle
    this.cardTemplate = document.querySelector(cardSample).content
    this._collectionContainer = document.querySelector(this.cfg.collectionContainer)
    this._articlesQty = document.querySelector(this.cfg.articlesQty)
    this._articlesHeader = document.querySelector(this.cfg.articlesHeader)
    this._stats = {}

    this._collectionContainer.addEventListener('click', (event) => this._handleArticle(event))
    this.render()
  }

  isLogged() {
    return Boolean(this.userName())
  }

  userName() {
    return localStorage.getItem('user')
  }

  render() {
    if (!this.isLogged) return
    this.getAllArticles()
      .then((res) => {
        this._articlesHeader.insertAdjacentText('afterbegin', this.userName())
        Array.from(res).forEach((item) => {
          this._stats[item._id] = item.keyword
          // eslint-disable-next-line no-param-reassign
          item.date = new Date(Date.parse(item.date))
          this._collectionContainer.appendChild(this._buildCard(item))
        })
        this._updateStatistics()
      })
      .catch((err) => this.showError.show(err.message))
  }

  _buildCard(data) {
    const container = this.cardTemplate.cloneNode(true)
    container.querySelector(this.card.node).href = data.link
    container.querySelector(this.card.img).style.backgroundImage = `url(${data.image})`
    container.querySelector(this.card.date)
      .textContent = `${data.date.getDate()} ${this.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(this.card.title).textContent = data.title
    container.querySelector(this.card.text).textContent = data.text
    container.querySelector(this.card.src).textContent = data.source
    container.querySelector(this.card.keyword).textContent = data.keyword
    container.querySelector(this.card.icon.node).setAttribute('UID', data._id)
    return container
  }

  _keywordCount() {
    const theKeys = {}
    const popular = { words: [], key: '', max: 0 }
    Array.from(Object.keys(this._stats)).forEach((item) => {
      if (!(this._stats[item] in theKeys)) {
        theKeys[this._stats[item]] = 1
      } else {
        theKeys[this._stats[item]] += 1
      }
    })
    const total = Array.from(Object.keys(theKeys)).length
    const turns = total >= 3 ? 3 : total
    for (let i = 0; i < turns; i += 1) {
      Array.from(Object.keys(theKeys)).forEach((item) => {
        if (popular.max < theKeys[item]) {
          popular.max = theKeys[item]
          popular.key = item
        }
      })
      delete theKeys[popular.key]
      popular.words.push(popular.key)
      popular.max = 0
      popular.key = ''
    }

    return {
      popular: popular.words,
      total,
    }
  }

  _updateStatistics() {
    this._articlesQty.textContent = `${Array.from(Object.keys(this._stats)).length} сохраненных статей`
    const keywords = this._keywordCount()

    document.querySelector(this.cfg.words.first).textContent = keywords.total >= 1 ? keywords.popular.shift() : ''
    let tagLine = ''
    if (keywords.total === 3) {
      tagLine = `, ${keywords.popular.shift()}, ${keywords.popular.shift()}`
    } else {
      tagLine = keywords.total <= 1 ? '' : `, ${keywords.popular.shift()}`
    }
    document.querySelector(this.cfg.words.second).textContent = tagLine
    document.querySelector(this.cfg.words.tail).style.display = keywords.total > 3 ? 'auto' : 'none'
    document.querySelector(this.cfg.words.more).textContent = keywords.total - 2
  }

  _handleArticle(event) {
    const iconClass = this.card.icon.node.slice(1, this.card.icon.node.length)
    if (event.target.className.includes(iconClass)) {
      event.preventDefault()
      this.deleteArticle(event.target.getAttribute('UID'))
        .then(() => {
          delete this._stats[event.target.getAttribute('UID')]
          this._collectionContainer.removeChild(event.target.closest(this.card.node))
          this._updateStatistics()
        })
        .catch((err) => {
          this.showError.show(err.message)
        })
    }
  }
}
