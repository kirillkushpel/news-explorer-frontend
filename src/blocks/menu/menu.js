import './menu.css'
import Component from '../main/component'
import Overlay from '../main/overlay/overlay'

class Menu {
  constructor(
    {
      control, items, menu,
    },
    overlayObject,
  ) {
    this.isOpened = false
    this.overlay = overlayObject
    this.menuItems = document.querySelector(items)
    this.menuControl = document.querySelector(control)
    this.menu = document.querySelector(menu)
    this.isBlack = Array.from(this.menu.classList).includes('menu_black')
  }

  click() {
    if (this.isOpened) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.menuControl.classList.add('menu__mobile_close')
    if (this.isBlack) this.menuControl.classList.add('menu__mobile_close_black')
    this.overlay.show()
    this.menu.classList.add(!this.isBlack ? 'menu_on-top' : 'menu_on-top_black')
    this.menuItems.classList.add('menu__items_show')
    if (this.isBlack) this.menuItems.style.background = 'rgba(255,255,255,1)'
    this.isOpened = true
  }

  close() {
    this.menuControl.classList.remove('menu__mobile_close')
    this.overlay.hide()
    this.menu.classList.remove('menu_on-top')
    this.menu.classList.remove('menu_on-top_black')
    this.menuItems.classList.remove('menu__items_show')
    if (this.isBlack) this.menuItems.style.background = 'rgba(255,255,255,0)'
    this.isOpened = false
  }
}

const overlay = new Overlay()

export const mainMenu = new Menu(
  {
    control: '.menu__mobile',
    items: '.menu__items',
    menu: '.menu',
  },
  overlay,
)

export const menuOperator = new Component(
  document.querySelector('.menu__mobile'),
  {
    click: () => {
      mainMenu.click()
    },
  },
)
