import { getDataApi } from './getDataApi';
import card from './templates/card.hbs';
const filter = document.querySelector('.filter');
const container = document.querySelector('.container');
const filmList = document.querySelector('.film-list');
let URL = '';
let page = 1;
const URL_TO_WEEK = `https://api.themoviedb.org/3/trending/movie/week?api_key=7bfeb33324f72574136d1cd14ae769b5&page=`;
const URL_TO_DAY = `https://api.themoviedb.org/3/trending/movie/day?api_key=7bfeb33324f72574136d1cd14ae769b5&page=`;
const URL_TO_TOP = `https://api.themoviedb.org/3/movie/top_rated?api_key=7bfeb33324f72574136d1cd14ae769b5&language=en-US&page=`;
const URL_TO_NEW = `https://api.themoviedb.org/3/movie/now_playing?api_key=7bfeb33324f72574136d1cd14ae769b5&language=en-US&page=`;
URL = URL_TO_WEEK;
const genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function mainPage(URL, page) {
  getDataApi(URL + page).then(response => buildElements(response));
  window.addEventListener('scroll', createElafterScroll);
}

function addPage() {
  page += 1;
  getDataApi(URL + page).then(res => buildElements(res));
  if (page === 1000) {
    window.removeEventListener('scroll', createElafterScroll);
  }
}

function buildElements(response) {
  response.map(item => {
    function auditGanres() {
      if (item.genre_ids.length < 3) {
        return item.genre_ids.map(elem => genres[elem]).join(', ');
      }
      return (
        item.genre_ids
          .map(elem => genres[elem])
          .slice(0, 2)
          .join(', ') + ', others'
      );
    }
    function srcAudit() {
      if (!item.poster_path) {
        return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
      }
      return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    }
    const genr = auditGanres();
    const vote = item.vote_average.toFixed(1);
    const name = item.title.toUpperCase();
    const year = item.release_date.slice(0, 4);
    const src = srcAudit();
    const data = { name, year, genr, vote, src };
    filmList.insertAdjacentHTML('beforeend', card(data));
  });
}

function createElafterScroll() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    addPage();
  }
}

function onButtonChange(event) {
  page = 1;
  switch (event.target.value) {
    case 'top_for_week':
      filmList.innerHTML = '';
      URL = URL_TO_WEEK;
      mainPage(URL, page);
      break;

    case 'top_for_day':
      filmList.innerHTML = '';
      URL = URL_TO_DAY;
      mainPage(URL, page);
      break;

    case 'top_rated':
      URL = '';
      filmList.innerHTML = '';
      URL = URL_TO_TOP;
      mainPage(URL, page);
      break;
    case 'new_films':
      URL = '';
      filmList.innerHTML = '';
      URL = URL_TO_NEW;
      mainPage(URL, page);
      break;
  }
}

filter.addEventListener('change', onButtonChange);
mainPage(URL, page);