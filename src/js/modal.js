import { getDataApi } from './getDataApi';
import card from './templates/card.hbs';
import modalWindow from './templates/modalWindow.hbs';

const filmListModal = document.querySelector('.film-list');
const filmItemModal = document.querySelector('.film-item');
const modal = document.querySelector('.backdrop');
const body = document.querySelector('body');
const closeModal = document.querySelector('.button-close');
console.log(closeModal);

let movie_id = '';

filmListModal.addEventListener('click', handleCardClick);
function handleCardClick(evt) {
  // if (!evt.target.classList.contains('film-list')) return;
  if (evt.target === evt.currentTarget) return;
  modal.innerHTML = '';
  const parent = evt.target.closest('li');
  console.log(parent);
  movie_id = parent.dataset.id;
  console.log(movie_id);
  const URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7bfeb33324f72574136d1cd14ae769b5`;

  // async function testData() {
  //   return await fetch(URL)
  //     .then(resp => resp.json())
  //     .then(response => buildElements(response));
  // }
  // testData();

  function findFilm() {
    getDataApi(URL).then(response => buildElements(response));
  }
  findFilm();

  function buildElements(response) {
    const genr = response.genres.map(genr => genr.name);
    console.log(genr);

    function srcAudit() {
      if (!response.poster_path) {
        return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
      }
      return `https://image.tmdb.org/t/p/w500${response.poster_path}`;
    }
    const src = srcAudit();
    console.log(src);
    const name = response.title.toUpperCase();
    console.log(name);
    const vote = response.vote_average.toFixed(1);
    console.log(vote);
    const vote_count = response.vote_count;
    console.log(vote_count);
    const popularity = response.popularity;
    console.log(popularity);
    const original_title = response.original_title;
    console.log(original_title);
    const overview = response.overview;
    console.log(overview);
    // const id = response.id;
    const data = {
      src,
      name,
      vote,
      vote_count,
      popularity,
      original_title,
      genr,
      overview,
    };
    console.log(data);
    modal.insertAdjacentHTML('beforeend', modalWindow(data));
  }

  modal.addEventListener('click', openModal);
  function openModal() {
    modal.classList.remove('is-hidden');
    body.classList.add('no-scroll');
    modal.removeEventListener('click', openModal);
  }

  openModal();

  function closeModal() {
    if (!modal.classList.contains('is-hidden')) {
      modal.classList.toggle('is-hidden');
      body.classList.toggle('no-scroll');
      closeModal.addEventListener('click', closeModal);
    }
    closeModal();
  }

  document.addEventListener('keydown', escapeClose);
  function escapeClose(event) {
    if (event.code !== 'Escape') return;
    console.log(event.code);
    if (event.code === 'Escape') {
      modal.classList.add('is-hidden');
      body.classList.remove('no-scroll');
      // document.removeEventListener('keydown', escapeClose);
    }
  }
}