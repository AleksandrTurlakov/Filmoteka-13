// import myLibraryPage from './myLibraryPage.js';

import cardEl from '../js/templates/libraryCard.hbs';
import { getDataApi } from './getDataApi';
import modalWindow from './templates/modalWindow.hbs';

const libraryUl = document.querySelector('.library__list');
const libraryBack = document.querySelector('.library');

const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');
const deleteBtn = document.querySelector('.library__btn-list-delete');
const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdropLibrary');

const watched = JSON.parse(localStorage.getItem('watched'));
const queue = JSON.parse(localStorage.getItem('queue'));

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', watched.map(cardEl).join(''));
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');

  // watched.forEach(index => console.log(index));
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', queue.map(cardEl).join(''));
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  queueBtn.classList.toggle('activeBtn');
  watchedBtn.classList.remove('activeBtn');
}

// ============  MODAL

let movie_id = '';

libraryUl.addEventListener('click', handleCardClick);
// deleteBtn.addEventListener('click', onDeleteClick);

// function onDeleteClick(evt) {
//   if (evt.target.closest('.btn-list-delete')?.id === 'close') {
//     console.log(evt.target);
//   }
// }

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
  }

  // =================== DELETE

  deleteBtn.addEventListener('click', onDeleteClick);

  function onDeleteClick(event) {
    if (evt.target === evt.currentTarget) return;
    backdropLibrary.innerHTML = '';
    const parent = evt.target.closest('li');
    movie_id = parent.dataset.id;
  }
}