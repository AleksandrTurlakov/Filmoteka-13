import { getDataApi } from './getDataApi';
import card from './templates/card.hbs';
import modalWindow from './templates/modalWindow.hbs';

const filmListModal = document.querySelector('.film-list');
const filmItemModal = document.querySelector('.film-item');
const modal = document.querySelector('.backdrop');
const closeModal = document.querySelector('.button-close');
// console.log(closeModal);
const body = document.querySelector('body');

let movie_id = '';
const URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7bfeb33324f72574136d1cd14ae769b5`;

filmListModal.addEventListener('click', handleCardClick);
function handleCardClick(evt) {
  // if (!evt.target.classList.contains('film-item')) return;
  if (evt.target === evt.currentTarget) return;

  const parent = evt.target.closest('li');
  console.log(parent);
  movie_id = parent.dataset.id;
  console.log(movie_id);
  function findFilm(URL) {
    getDataApi(URL).then(response => buildElements(response));
  }
  // filmItemModal.innerHTML = '';
  console.log(response);
  function buildElements(response) {
    response.map(item => {
      function auditGanres() {
        genres.flatMap(genre => genre.name);
      }

      function srcAudit() {
        if (!item.poster_path) {
          return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
        }
        return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      }
      const src = srcAudit();
      const name = item.title.toUpperCase();
      const vote = item.vote_average.toFixed(1);
      const vote_count = item.vote_count;
      const popularity = item.popularity;
      const original_title = item.original_title;
      const genr = auditGanres();
      const overview = item.overview;
      const id = item.id;
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
      console.log(modal);
    });
  }

  modal.addEventListener('click', toggleModal);
  closeModal.addEventListener('click', toggleModal);
  function toggleModal() {
    modal.classList.toggle('is-hidden');
    body.classList.toggle('no-scroll');
  }

  document.addEventListener('keydown', escapeClose);
  function escapeClose(event) {
    if (event.code !== 'Escape') return;
    console.log(event.code);
    if (event.code === 'Escape') {
      modal.classList.add('is-hidden');
      body.classList.toggle('no-scroll');
      document.removeEventListener('keydown', escapeClose);
    }
  }
}
