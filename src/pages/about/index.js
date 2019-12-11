import '../../vendor/normalize.css'
import '../../../node_modules/swiper/css/swiper.min.css'
import './index.css'
/* eslint-disable no-unused-vars */
import Swiper from 'swiper'
import { menuHandler, mainMenu } from '../../blocks/menu/menu'
import modalsHandler from '../../blocks/main/modalsHandler'
import apiEx from '../../modules/api-explorer'
import CommitLoader from '../../modules/commit-loader'

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

const commits = new CommitLoader(swiper.update.bind(swiper))


window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
