/* eslint-disable no-unused-vars */
import '../../vendor/normalize.css'
import '../../../node_modules/swiper/css/swiper.min.css'
import './index.css'
import Swiper from 'swiper'
import config from '../../modules/config'
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import ModalOperator from '../../blocks/main/modaloperator'
import AuthForm from '../../blocks/main/auth-form/auth-form'
import ShowError from '../../blocks/main/error/error'
import ApiBackend from '../../modules/api-backend'
import MainMenuRender from '../../modules/main-menu-render'
import CommitsLoader from '../../modules/commits-loader'
import CommitsRender from '../../modules/commits-render'

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

const swiper = new Swiper('.swiper-container', {
  updateOnWindowResize: true,
  slidesPerView: 3,
  spaceBetween: 10,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    1023: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

const commitsLoader = new CommitsLoader(config.git, config.maxGitCommits)
const commitsRender = new CommitsRender(
  swiper.update.bind(swiper),
  commitsLoader.getCommits.bind(commitsLoader),
  config,
)

commitsRender.init()

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
