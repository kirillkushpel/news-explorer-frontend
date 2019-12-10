/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import { menuHandler, mainMenu } from './blocks/menu/menu'
import modalsHandler from './blocks/main/modalsHandler'
import Card from './blocks/main/card/card'
import { loginForm, signupForm, regComplete } from './blocks/main/auth-form/auth-form'
import Error from './blocks/main/error/error'
import apiEx from './modules/api-explorer'
import NewsReader from './modules/news-reader'

const nReader = new NewsReader(apiEx.isLogged.bind(apiEx),
  apiEx.saveArticle.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx))

const cardIconSave = new Card(document.querySelector('.results'))


regComplete.open()

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
};
