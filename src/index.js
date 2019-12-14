/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import params from './modules/params'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import ModalsHandler from './blocks/main/modaloperator'
import AuthForm from './blocks/main/auth-form/auth-form'
import ShowError from './blocks/main/error/error'
import Backend from './modules/backend'
import NewsApi from './modules/news-api'
import NewsRender from './modules/news-render'
import MenuRender from './modules/menu-render'

const modalOperator = new ModalsHandler(document.body, document.querySelector('#scroll'))
const showError = new ShowError()
const backend = new Backend(params)

const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  '#signup-form',
  backend.login.bind(backend),
  backend.getUserName.bind(backend),
  showError,
)

const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  '#login-form',
  backend.signUp.bind(backend),
  backend.getUserName.bind(backend),
  showError,
)

const regComplete = new AuthForm(
  document.querySelector('#signup-success'),
  '#login-form',
  null,
  null,
  showError,
)

const newsApi = new NewsApi(params.newsFeed)

const userMenu = new MenuRender(
  loginForm.open.bind(loginForm),
  backend.logout.bind(backend),
  showError,
)
userMenu.init()

const newsRender = new NewsRender(
  newsApi.getNews.bind(newsApi),
  backend.saveArticle.bind(backend),
  backend.deleteArticle.bind(backend),
  showError,
  params,
)

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
