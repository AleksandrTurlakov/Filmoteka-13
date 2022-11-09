import renderMarkupMovieCard from './movieCardLibrary.js';
// import { LS_WATCHED } from '.Watched.js';

const watchedButton = document.querySelector('#watched-btn');
const gallery = document.querySelector('.film-list');

watchedButton.addEventListener('click', getWatchedFilms);

export default function getWatchedFilms() {
  const getFilms = localStorage.getItem(LS_WATCHED);
  const data = JSON.parse(getFilms);

  if (data === null) {
    data = [];
  }
  gallery.innerHTML = '';
  gallery.classList.remove('library');

  renderMarkupMovieCard({ results: data }, true);
}
