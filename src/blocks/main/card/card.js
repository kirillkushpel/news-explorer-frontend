/* eslint-disable class-methods-use-this */
import './card.css'

export default class Card {
  constructor(card) {
    this.card = card;
    this.card.addEventListener('click', (event) => { this.click(event) })
  }

  click(event) {
    if (event.target.className.includes('card__icon')) event.preventDefault()
  }
}
