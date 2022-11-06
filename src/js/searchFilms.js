import { getFilmSearch, getMovieDetails, getGenres, getTrailerKey } from './getDataApi.js';
// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { buildElements } from './first_page.js';

// поиск
const searchFormEl = document.querySelector('.search__form');
searchFormEl.addEventListener('submit', onSubmit);
let name = '';
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
    // transformGenres(moviesData);   
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
      console.log('item.genre_ids', item.genre_ids);
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