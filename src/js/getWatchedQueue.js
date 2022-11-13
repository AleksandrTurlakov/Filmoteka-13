// import myLibraryPage from './myLibraryPage.js';

import cardEl from '../js/templates/card.hbs';
import { getDataApi } from './getDataApi';
import modalWindow from './templates/modalWindow.hbs';

const libraryUl = document.querySelector('.library__list');
const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');
const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdropLibrary');

// const markupLibrary = `<div class="library">
// <div class="library-bg">
//  <div class="library-bg__image"></div>
//  <p class="library-bg__message">You have nothing here!</p>
//  <p class="library-bg__message">Don't forget to add some movie!</p>
// </div>
// </div>`;

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('watched')).map(cardEl).join('')
  );
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');
  // if (onWatchedClick().length === null) {
  //   myLibraryPage();
  // }
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('queue')).map(cardEl).join('')
  );
  queueBtn.classList.toggle('activeBtn');
  watchedBtn.classList.remove('activeBtn');
}

let movie_id = '';

libraryUl.addEventListener('click', handleCardClick);
function handleCardClick(evt) {
  if (evt.target === evt.currentTarget) return;
  backdropLibrary.innerHTML = '';
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
    backdropLibrary.insertAdjacentHTML('beforeend', modalWindow(data));

    openModalWindow();
  }

  const scrollUp = document.querySelector('.scroll-up');

  function openModalWindow() {
    backdropLibrary.classList.remove('is-hidden');
    body.classList.add('no-scroll');
    scrollUp.classList.remove('scroll-up--active');
    backdropLibrary.removeEventListener('click', openModalWindow);
    addListenersOnModalWindow();
  }

  function addListenersOnModalWindow() {
    const closeModal = document.querySelector('.button-close');
    closeModal.addEventListener('click', onBtnCloseModalWindow);
    backdropLibrary.addEventListener('click', closeModalWindow);
  }

  function closeModalWindow(e) {
    console.log(e.target);
    console.log(e.currentTarget);

    if (e.target === e.currentTarget) {
      backdropLibrary.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      scrollUp.classList.add('scroll-up--active');
      // closeModal.removeEventListener('click', onBtnCloseModalWindow);
      backdropLibrary.removeEventListener('click', closeModalWindow);
    }
  }

  function onBtnCloseModalWindow() {
    backdropLibrary.classList.add('is-hidden');
    body.classList.remove('no-scroll');
    scrollUp.classList.add('scroll-up--active');
    // closeModal.removeEventListener('click', onBtnCloseModalWindow);
    backdropLibrary.removeEventListener('click', closeModalWindow);
  }

  document.addEventListener('keydown', escapeClose);
  function escapeClose(event) {
    if (event.code !== 'Escape') return;
    if (event.code === 'Escape') {
      backdropLibrary.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      scrollUp.classList.add('scroll-up--active');
      document.removeEventListener('keydown', escapeClose);
    }
  }
}
