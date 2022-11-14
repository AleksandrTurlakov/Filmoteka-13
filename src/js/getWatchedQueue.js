<<<<<<< Updated upstream
// import myLibraryPage from './myLibraryPage.js';

import cardEl from '../js/templates/libraryCard.hbs';
=======
import queueCard from '../js/templates/queueCard.hbs';
import watchCard from "../js/templates/watchCard.hbs";
>>>>>>> Stashed changes
import { getDataApi } from './getDataApi';
import modalWindow from './templates/modalWindow.hbs';

const libraryUl = document.querySelector('.library__list');
const libraryBack = document.querySelector('.library');
const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');
<<<<<<< Updated upstream
const deleteBtn = document.querySelector('.library__btn-list-delete');
const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdropLibrary');

=======


const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdrop');
const loadToPageWatch = () => { if (!JSON.parse(localStorage.getItem('watched'))) { return libraryUl.textContent = "" } else return watched.map(watchCard).join('') }
const loadToPageQueue = () => { if (!JSON.parse(localStorage.getItem('queue'))) {return libraryUl.textContent="" } else return queue.map(queueCard).join('') }
>>>>>>> Stashed changes
const watched = JSON.parse(localStorage.getItem('watched'));
const queue = JSON.parse(localStorage.getItem('queue'));

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {

  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend',loadToPageWatch() );
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');

  // watched.forEach(index => console.log(index));
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', loadToPageQueue());
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
  if (evt.target === libraryUl)  return ;
  const libraryLi = document.querySelectorAll('.library__film-item');
  const btn = evt.composedPath()[evt.composedPath().length - 8];
  const filmId = btn.offsetParent.dataset.id;
  let arrayData = [];
  if (btn.id === 'delete') {
    libraryLi.forEach((item) => {
      if (item.dataset.id === filmId) {
        item.remove();
        let whatList = item.id;
        const dataFromStorage = JSON.parse(localStorage.getItem(`${whatList}`));
        if (dataFromStorage.length===1) {
          localStorage.removeItem(`${whatList}`)
        }
       
        dataFromStorage.map(el => {
          if (el.id !== Number(filmId)) {
            arrayData.push(el);
            localStorage.setItem(`${whatList}`, JSON.stringify(arrayData))
          }
        })
      }
    })
  }
  
  else {
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
<<<<<<< Updated upstream
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

=======
    

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

  function onBtnCloseModalWindow() {
    backdropLibrary.classList.add('is-hidden');
    body.classList.remove('no-scroll');
    scrollUp.classList.add('scroll-up--active');
    // closeModal.removeEventListener('click', onBtnCloseModalWindow);
    backdropLibrary.removeEventListener('click', closeModalWindow);
  }

  function closeModalWindow(e) {
    if (e.target === e.currentTarget) {
      backdropLibrary.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      scrollUp.classList.add('scroll-up--active');
      // closeModal.removeEventListener('click', onBtnCloseModalWindow);
      backdropLibrary.removeEventListener('click', closeModalWindow);
    }
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
  
}


>>>>>>> Stashed changes
