import '../../vendor/normalize.css'
import './index.css'
import config from '../../modules/config'
/* eslint-disable no-unused-vars */
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import ModalOperator from '../../blocks/main/modaloperator'
import AuthForm from '../../blocks/main/auth-form/auth-form'
import ApiBackend from '../../modules/api-backend'
import MainMenuRender from '../../modules/main-menu-render'
import Collection from '../../modules/collection'
import ShowError from '../../blocks/main/error/error'

const modalOperator = new ModalOperator(document.body, document.querySelector('#scroll'))
const showError = new ShowError()
const apiBackend = new ApiBackend(config)

const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  '#signup-form',
  apiBackend.login.bind(apiBackend),
  apiBackend.getUserName.bind(apiBackend),
  showError,
)

const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  '#login-form',
  apiBackend.signUp.bind(apiBackend),
  apiBackend.getUserName.bind(apiBackend),
  showError,
)

const regCompleteForm = new AuthForm(
  document.querySelector('#signup-ok'),
  '#login-form',
  null,
  null,
  showError,
)

const userMenu = new MainMenuRender(
  loginForm.open.bind(loginForm),
  apiBackend.logout.bind(apiBackend),
  showError,
)
userMenu.init()

const myCollection = new Collection(
  apiBackend.getAllArticles.bind(apiBackend),
  apiBackend.deleteArticle.bind(apiBackend),
  config,
  showError,
)
// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
