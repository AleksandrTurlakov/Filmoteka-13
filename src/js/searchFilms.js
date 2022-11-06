import { getFilmSearch, getMovieDetails, getGenres, getTrailerKey } from './getFilmsApi.js';
import { getDataApi } from './getDataApi.js';
// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { buildElements } from './first_page.js';
import card from './templates/card.hbs';
const filmList = document.querySelector('.film-list');
// поиск
const searchFormEl = document.querySelector('.search__form');
searchFormEl.addEventListener('submit', onSubmit);
let name = '';
let page = 1;


const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ];

// const msgOptions = {
//     position: 'center-top',
//     distance: '150px',
//     timeout: 3000,
//     clickToClose: true
// } 

function onSubmit(evt) {
  evt.preventDefault()
  const form = evt.currentTarget;
  console.log('form', form);
  console.dir('form dir', form);
  const searchName = form.elements.filmName.value;
  const inputFilmName = searchName.toLowerCase().trim().split(' ').join('+')
  console.log('inputFilmName', inputFilmName)
  if (inputFilmName.length === 0 || inputFilmName === name )  {
  Notify.failure('Same query')
   return
  }
  name = inputFilmName

  getFilmSearch(name).then(data => {
    console.log('data.resultsSearch')
    const moviesData = data.resultsSearch 

    if (moviesData.length === 0) {
    Notify.failure('Search result not successful. Enter the correct movie name')
} else {
      Notify.success(`We found ${data.totalItems} movies`)
         transformData(moviesData);
         transformGenres(moviesData);   
    }

  } ).finally(() => form.reset())
}

export function transformData(filmsData) {
  filmsData.map(item => {
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }

    return item;
  });
}

export function transformGenres(filmsData) {
    
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

// функция рендера
function loadStartGallery(data) {
//   const markup = card(data);

  
//   filmList.innerHTML = markup;
    filmList.insertAdjacentHTML('beforeend', card(data));
}

// функция получения данных с сервера и коррекция даты и жанров
function dataRequest(page) {
      
    getDataApi(page).then(resultsTrending  => {
    // генерим дату
    transformData(resultsTrending);
    // генерим жанры
    transformGenres(resultsTrending);
  
    // рендерим на страницу
    loadStartGallery(resultsTrending);
  });
}

// вызов функции рендера галереи при загрузке страницы
dataRequest(page);


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