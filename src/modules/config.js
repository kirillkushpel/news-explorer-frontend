const config = {
  url: 'https://api.news-explorer.ml',
  login: 'https://api.news-explorer.ml/signin',
  signup: 'https://api.news-explorer.ml/signup',
  logout: 'https://api.news-explorer.ml/logout',
  getUser: 'https://api.news-explorer.ml/users/me',
  articles: 'https://api.news-explorer.ml/articles',
  git: 'https://api.github.com/repos/kirillkushpel/news-explorer-frontend/commits',
  maxGitCommits: 15,
  month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'],
  newsFeed: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=91b93240b90d4df7aa22a3c468f7f05d&language=ru&pageSize=100',
  results: {
    showStep: 3,
    showMore: { node: '#show-more', hide: 'results__button_hide' },
    resultsField: '.results__news',
    newsForm: '.header__form',
    newsFormSearchField: '.header__form-input',
    newsFormButton: '#search-the-news',
    preloader: { node: '#preloader-searching', hide: 'preloader__message_hide' },
    notFound: { node: '#preloader-not-found', hide: 'preloader__message_hide' },
    serverError: { node: '#preloader-server-error', hide: 'preloader__message_hide' },
    resultsSection: { node: '.results', hide: 'results_hide' },
  },
  cardSample: '#card-sample',
  card: {
    node: '.card',
    img: '.card__img',
    date: '.card__date',
    title: '.card__title',
    text: '.card__text',
    src: '.card__src',
    warning: '.card__warning',
    keyword: '.card__keyword',
    icon: {
      node: '.card__icon',
      logged: 'card__icon_logged',
      marked: 'card__icon_marked',
      bin: 'card__icon_bin',
    },
  },
  collection: {
    collectionContainer: '.storage',
    articlesQty: '.articles-qty',
    articlesHeader: '.saved-title__header',
    words: {
      first: '.first-word',
      second: '.second-word',
      more: '.and-more',
      tail: '.word-tail',
    },
  },
  slider: {
    node: '.slider',
    commitDate: '.slider__commit-date',
    commitImage: '.slider__commit-image',
    commitName: '.slider__commit-name',
    commitEmail: '.slider__commit-email',
    commitText: '.slider__commit-text',
    template: '#commit-sample',
    swiperWrap: '.swiper-wrapper',
  },
}

export default config
