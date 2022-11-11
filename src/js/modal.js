import { getDataApi } from './getDataApi';
import card from './templates/card.hbs';
import modalWindow from './templates/modalWindow.hbs';

import { handleClick } from './addWatchedQue';

const filmListModal = document.querySelector('.film-list');
const filmItemModal = document.querySelector('.film-item');
const modal = document.querySelector('.backdrop');
const body = document.querySelector('body');

let movie_id = '';

filmListModal.addEventListener('click', handleCardClick);
function handleCardClick(evt) {
  if (evt.target === evt.currentTarget) return;
  modal.innerHTML = '';
  const parent = evt.target.closest('li');

  movie_id = parent.dataset.id;

  const URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7bfeb33324f72574136d1cd14ae769b5`;

  function findFilm() {
    getDataApi(URL).then(response => buildElements(response));
  }
  findFilm();

  function buildElements(response) {
    const genr = response.genres.map(genr => genr.name).join(', ');

    function srcAudit() {
      if (!response.poster_path) {
        return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
      }
      return `https://image.tmdb.org/t/p/w500${response.poster_path}`;
    }
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
    };

    modal.insertAdjacentHTML('beforeend', modalWindow(data));

    const QUEUE_SELECTOR = document.querySelector('.modal__queueButton');
    const WATCHED_SELECTOR = document.querySelector('.modal__watchedButton');

    [QUEUE_SELECTOR, WATCHED_SELECTOR].map(actionButton => {
      actionButton.addEventListener('click', e => handleClick(e, data));
    });
  }

  modal.addEventListener('click', openModalWindow);
  function openModalWindow() {
    modal.classList.remove('is-hidden');
    body.classList.add('no-scroll');
    modal.removeEventListener('click', openModalWindow);
  }

  openModalWindow();

  modal.addEventListener('click', closeModalWindow);
  function closeModalWindow(e) {
    if (e.target === e.currentTarget) {
      modal.classList.add('is-hidden');
      body.classList.remove('no-scroll');
    }
  }
  // const closeModal = document.querySelector('.button-close');
  // console.log(closeModal);

  // closeModal.addEventListener('click', closeModalWindow);

  // function closeModalWindow() {
  //   // if (!modal.classList.contains('is-hidden'))
  //   modal.classList.add('is-hidden');
  //   body.classList.remove('no-scroll');
  // }

  document.addEventListener('keydown', escapeClose);
  function escapeClose(event) {
    if (event.code !== 'Escape') return;
    console.log(event.code);
    if (event.code === 'Escape') {
      modal.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      document.removeEventListener('keydown', escapeClose);
    }
  }
}
