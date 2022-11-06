import { getDataApi, getFilmSearch, getMovieDetails, getGenres, getTrailerKey } from './getDataApi.js';
import card from './templates/card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const container = document.querySelector('.container');
const filmList = document.querySelector('.film-list');

let page = 1;
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

// async function topThisDay() {
//   return await fetch(
//     `https://api.themoviedb.org/3/trending/movie/week?api_key=7bfeb33324f72574136d1cd14ae769b5&page=${page}`
//   )
//     .then(res => res.json())
//     .then(res => res.results);
// }

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

getDataApi(page).then(response => buildElements(response));


// поиск
const searchFormEl = document.querySelector('.search__form');
searchFormEl.addEventListener('submit', onSubmit);
let name = '';

export const msgOptions = {
    position: 'center-top',
    distance: '150px',
    timeout: 3000,
    clickToClose: true
} 

function onSubmit(evt) {
  evt.preventDefault()
  const form = evt.currentTarget;
  console.log('form', form);
  console.dir('form dir', form);
  const searchName = form.elements.filmName.value;
   
  const inputFilmName = searchName.toLowerCase().trim().split(' ').join('+')
  console.log('inputFilmName', inputFilmName)
  if (inputFilmName.length === 0 || inputFilmName === name )  {
  Notify.failure('Same query', msgOptions)
   return
  }
  name = inputFilmName

  getFilmSearch(name).then(data => {
    console.log('data.resultsSearch', data.resultsSearch)
    const moviesData = data.resultsSearch 

    if (moviesData.length === 0) {
    Notify.failure('Search result not successful. Enter the correct movie name', msgOptions)
} else {
    Notify.success(`We found ${data.totalItems} movies`, msgOptions)
    transformData(moviesData);
    transformGenres(moviesData);   
    }

  } ).finally(() => form.reset())
}

function transformData(filmsData) {
  filmsData.map(item => {
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }

    return item;
  });
}

function transformGenres(filmsData) {
  filmsData.map(item => {
    let newGenre = [];

    if (item.genre_ids) {
      item.genre_ids.forEach(id => {
        const found = genres.find(item => item.id === id);
        newGenre.push(found.name);
      });
    }

    if (newGenre.length >= 4) {
      const manyGenres = newGenre.slice(0, 3);
      item.genres = manyGenres.join(', ');
    } else {
      item.genres = newGenre.join(', ');
    }

    return item;
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

function addPage() {
  page += 1;
  getDataApi(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=7bfeb33324f72574136d1cd14ae769b5&page=${page}`
  ).then(res => buildElements(res));
  if (page === 1000) {
    window.removeEventListener('scroll', createElafterScroll);
  }
}

window.addEventListener('scroll', createElafterScroll);
