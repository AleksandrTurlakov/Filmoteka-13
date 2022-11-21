import { getDataApi } from './getDataApi';
import modalWindow from './templates/modalWindow.hbs';

import { handleClick } from './addWatchedQue';

const filmListModal = document.querySelector('.film-list');
const backdropModal = document.querySelector('.backdrop');
const body = document.querySelector('body');

let movie_id = '';

filmListModal.addEventListener('click', handleCardClick);
function handleCardClick(evt) {
  if (evt.target === evt.currentTarget) return;
  backdropModal.innerHTML = '';
  const parent = evt.target.closest('li');

  movie_id = parent.dataset.id;

  const URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7bfeb33324f72574136d1cd14ae769b5`;

  function findFilm() {
    getDataApi(URL).then(response => buildElements(response));
  }
  findFilm();

  function buildElements(response) {
    const genr = response.genres.map(genr => genr.name).join(', ');
  
     function auditYear() {
      if (!response.release_date) {
        return 'unknown year';
      } else return response.release_date.slice(0, 4);
    }

    function srcAudit() {
      if (!response.poster_path) {
        return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
      }
      return `https://image.tmdb.org/t/p/w500${response.poster_path}`;
    }
    const year= auditYear()
    const src = srcAudit();
    const name = response.title.toUpperCase();
    const vote = response.vote_average.toFixed(1);
    const vote_count = response.vote_count;
    const popularity = response.popularity;
    const original_title = response.original_title;
    const overview = response.overview;
    const data = {
      src,
      name,
      vote,
      vote_count,
      popularity,
      original_title,
      genr,
      overview,
      id: response.id,
      year
    };

    backdropModal.insertAdjacentHTML('beforeend', modalWindow(data));

    openModalWindow();

    const QUEUE_SELECTOR = document.querySelector('.modal__queueButton');
    const WATCHED_SELECTOR = document.querySelector('.modal__watchedButton');

    [QUEUE_SELECTOR, WATCHED_SELECTOR].map(actionButton => {
      actionButton.addEventListener('click', e => handleClick(e, data));
    });
      function openModalWindow() {
    backdropModal.classList.remove('is-hidden');
        backdropModal.style.background = `url('https://image.tmdb.org/t/p/original${response.backdrop_path}') no-repeat center,linear-gradient(to right, hsla(0, 0%, 0%, 0.2), #00000033) `;
        backdropModal.style.backgroundSize = 'cover';
    body.classList.add('no-scroll');
    scrollUp.classList.remove('scroll-up--active');
    backdropModal.removeEventListener('click', openModalWindow);
    addListenersOnModalWindow();
  }
  }

  const scrollUp = document.querySelector('.scroll-up');

  function addListenersOnModalWindow() {
    const closeModal = document.querySelector('.button-close');
    closeModal.addEventListener('click', onBtnCloseModalWindow);
    backdropModal.addEventListener('click', closeModalWindow);
  }

  function closeModalWindow(e) {
    if (e.target === e.currentTarget) {
      backdropModal.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      scrollUp.classList.add('scroll-up--active');
      backdropModal.removeEventListener('click', closeModalWindow);
    }
  }

  function onBtnCloseModalWindow() {
    backdropModal.classList.add('is-hidden');
    body.classList.remove('no-scroll');
    scrollUp.classList.add('scroll-up--active');
  
    backdropModal.removeEventListener('click', closeModalWindow);
  }

  document.addEventListener('keydown', escapeClose);
  function escapeClose(event) {
    if (event.code !== 'Escape') return;
    if (event.code === 'Escape') {
      backdropModal.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      scrollUp.classList.add('scroll-up--active');
      document.removeEventListener('keydown', escapeClose);
    }
  }
}
