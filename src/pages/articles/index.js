import '../../vendor/normalize.css'
import './index.css'
/* eslint-disable no-unused-vars */
import { menuHandler, mainMenu } from '../../blocks/menu/menu'
import modalsHandler from '../../blocks/main/modalsHandler'
import Card from '../../blocks/main/card/card'
import { loginForm, signupForm, regComplete } from '../../blocks/main/auth-form/auth-form'

const cardIconDelete = new Card(document.querySelector('.storage'))

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
