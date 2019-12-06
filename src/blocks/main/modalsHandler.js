import MainHandler from './MainHandler'
/* eslint-disable */
export const modalsHandler = new MainHandler(
  document.body,
  {
    click: (event) => {
      if (Array.from(event.target.classList).includes('auth')) {
        event.target.classList.add('auth_hide');
        document.body.classList.remove('scroll-lock');
      }
    },
    keydown: (event) => {
      if (Array.from(event.target.classList).includes('scroll-lock')) {
        if (event.code === 'Escape') {
          const modals = Array.from(event.target.querySelectorAll('.auth'));
          modals.find(
            (element) => Array.from(element.classList)
              .includes('auth_hide') ? false : true,
          ).classList.add('auth_hide')
          document.body.classList.remove('scroll-lock')
        }
      }
    },
  },
)
