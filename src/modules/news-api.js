export default class NewsApi {
  constructor(newsFeed) {
    this.newsFeed = newsFeed
  }

  getNews(query) {
    const dateNow = new Date()
    const week = 7 * 24 * 3600 * 1000
    const weekAgo = new Date(dateNow - week)
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    const dateFrom = `${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}`
    const url = `${this.newsFeed}&q=${query}&from=${dateFrom}&to=${dateTo}`
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Не могу получить новости =( ')
        return res.json()
      })
      .then((data) => {
        const news = []
        for (let i = 0; i < data.articles.length; i += 1) {
          news.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            text: data.articles[i].description,
            image: data.articles[i].urlToImage,
            link: data.articles[i].url,
            keyword: query,
          })
        }
        return news
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
