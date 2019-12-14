/* eslint-disable no-unused-vars */
import '../../vendor/normalize.css'
import '../../../node_modules/swiper/css/swiper.min.css'
import './index.css'
import Swiper from 'swiper'
import params from '../../modules/params'
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import ModalsHandler from '../../blocks/main/modaloperator'
import AuthForm from '../../blocks/main/auth-form/auth-form'
import ShowError from '../../blocks/main/error/error'
import Backend from '../../modules/backend'
import MenuRender from '../../modules/menu-render'
import GitCommitsLoader from '../../modules/git-commits-loader'
import GitCommitsRender from '../../modules/git-commits-render'

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

const userMenu = new MenuRender(
  loginForm.open.bind(loginForm),
  backend.logout.bind(backend),
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

const commitsLoader = new GitCommitsLoader(params.git, params.maxGitCommits)
const commitsRender = new GitCommitsRender(
  swiper.update.bind(swiper),
  commitsLoader.getCommits.bind(commitsLoader),
  params,
)

commitsRender.init()

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
