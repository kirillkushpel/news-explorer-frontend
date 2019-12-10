menuCustomizer() {
  const shownName = document.querySelector('#shown-user-name')
  if (!this.userName) {
    if (document.location.pathname === '/articles/') document.location.href = '../'
    shownName.textContent = 'Авторизуйтесь'
    shownName.addEventListener('click', this.userMenuHandler)
    shownName.parentNode.querySelector('.menu__logout').style.display = 'none'
    document.querySelector('#menu-saved-articles').style.display = 'none'
  } else {
    shownName.textContent = this.userName
    shownName.parentNode.querySelector('.menu__logout').style.display = 'inline-block'
    shownName.removeEventListener('click', this.userMenuHandler)
    shownName.addEventListener('click', () => this.logout())
    document.querySelector('#menu-saved-articles').style.display = 'flex'
  }
}
