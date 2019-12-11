import '../../vendor/normalize.css'
import './index.css'
/* eslint-disable no-unused-vars */
import { menuHandler, mainMenu } from '../../blocks/menu/menu'
import modalsHandler from '../../blocks/main/modalsHandler'
import apiEx from '../../modules/api-explorer'
import Collection from '../../modules/collection'

const myCollection = new Collection(apiEx.isLogged.bind(apiEx),
  apiEx.getAllArticles.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx),
  apiEx.userName)



window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
