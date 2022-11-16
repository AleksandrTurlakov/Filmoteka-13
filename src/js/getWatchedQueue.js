import queueCard from '../js/templates/queueCard.hbs';
import watchCard from "../js/templates/watchCard.hbs";
import { getDataApi } from './getDataApi';
import modalWindowLib from './templates/modalWindowLib.hbs';
import { onYouTubeIframeAPIReady, stopVideo, player } from './trailer.js';

const libraryUl = document.querySelector('.library__list');
const libraryBack = document.querySelector('.library');
const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');


const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdrop');
const loadToPageWatch = () => { if (!JSON.parse(localStorage.getItem('watched'))) { return libraryUl.textContent = "" } else return watched.map(watchCard).join('') }
const loadToPageQueue = () => { if (!JSON.parse(localStorage.getItem('queue'))) {return libraryUl.textContent="" } else return queue.map(queueCard).join('') }
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

      backdropLibrary.insertAdjacentHTML('beforeend', modalWindowLib(data));
      openModalWindow();
          function openModalWindow() {
    
        backdropLibrary.style.background = `url('https://image.tmdb.org/t/p/original${response.backdrop_path}') no-repeat center,linear-gradient(to right, hsla(0, 0%, 0%, 0.2), #00000033) `;
            backdropLibrary.classList.remove('is-hidden');
            backdropLibrary.style.backgroundSize = 'cover';
    body.classList.add('no-scroll');
    scrollUp.classList.remove('scroll-up--active');
    backdropLibrary.removeEventListener('click', openModalWindow);
    addListenersOnModalWindow();
  }

    }
    

  const scrollUp = document.querySelector('.scroll-up');

  function addListenersOnModalWindow() {
    const closeModal = document.querySelector('.button-close');
    closeModal.addEventListener('click', onBtnCloseModalWindow);
    backdropLibrary.addEventListener('click', closeModalWindow);
    const watchTrailer = document.querySelector('.watch-trailer');
    watchTrailer.addEventListener('click', onBtnWatchTrailer);
    }
      function onBtnWatchTrailer() {
    const URL_TRL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=7bfeb33324f72574136d1cd14ae769b5`;
    function findTrailer() {
      getDataApi(URL_TRL).then(response => showKey(response.results));
    }
    findTrailer();

    function showKey(response) {
      onYouTubeIframeAPIReady(response[0].key);
      backdropLibrary.addEventListener('click', closeTrailerlWindow);
    }
  }

  function closeTrailerlWindow(e) {
    if (e.target === e.currentTarget) {
      backdropLibrary.classList.add('is-hidden');
      scrollUp.classList.add('scroll-up--active');
      if (player) {
        stopVideo();
      }
    }
  }

   function onBtnCloseModalWindow() {
    const closeModal = document.querySelector('.button-close');
    backdropLibrary.classList.add('is-hidden');
    body.classList.remove('no-scroll');
    scrollUp.classList.add('scroll-up--active');
    if (player) {
      stopVideo();
    }
    closeModal.removeEventListener('click', onBtnCloseModalWindow);
    backdropLibrary.removeEventListener('click', closeModalWindow);
  }

    function closeModalWindow(e) {
      if (e.target === e.currentTarget) {
        const closeModal = document.querySelector('.button-close');
        backdropLibrary.classList.add('is-hidden');
        body.classList.remove('no-scroll');
        scrollUp.classList.add('scroll-up--active');
        closeModal.removeEventListener('click', onBtnCloseModalWindow);
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
      if (player) {
        stopVideo();
      }
    }
  }
    
  }
  
}


