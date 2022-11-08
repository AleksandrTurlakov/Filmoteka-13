import { getFilmSearch, getMovieDetails, getGenres, getTrailerKey } from './getFilmsApi.js';
import { getDataApi } from './getDataApi.js';
// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { buildElements } from './first_page.js';
import card from './templates/card.hbs';

const filmList = document.querySelector('.film-list');

const container = document.querySelector('.container');

// поиск
const searchFormEl = document.querySelector('.search__form');
searchFormEl.addEventListener('submit', onSubmit);
let page = 1;
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

// const msgOptions = {
//     position: 'center-top',
//     distance: '150px',
//     timeout: 3000,
//     clickToClose: true
// }

function onSubmit(evt) {
  // let page = 1;
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

  getFilmSearch(name, page).then(data => {
    console.log('data.resultsSearch', data.resultsSearch)
    const moviesData = data.resultsSearch
    
    if (moviesData.length === 0) {
    Notify.failure('Search result not successful. Enter the correct movie name')
    }
    else {
      console.log('page-1', page)
      Notify.success(`We found ${data.totalItems} movies`)
         filmList.innerHTML = '';
      transformGenres(moviesData);
      
      // СКРОЛ
      window.addEventListener('scroll', createElafterScroll2);
      console.log('page-2', page);
    }

    //  проверяю скрол
    console.log('window.scrollY', window.scrollY);
    createElafterScroll2();
       
  })

 
}

function createElafterScroll2() {
        // проверяю условие
        console.log('window.scrollY + window.innerHeight', window.scrollY + window.innerHeight);
        console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight);
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    // Это addPage()-----------
    
    console.log('addpage2', page);
       // Проверка максимума найденных фильмов
    if ( page === 1000 || page*20 >= data.totalItems) {
      console.log('page*20', page*20);
      console.log('data.totalItems', data.totalItems);
      window.removeEventListener('scroll', createElafterScroll2);
      return Notify.failure('END OF SEARCH');
    } else {
      page += 1;
      getFilmSearch(name, page).then(res => transformGenres(res));
    }
    window.addEventListener('scroll', createElafterScroll2);
     // ------------------------
  }
  
    }

// копия ---- buildElements
export function transformGenres(response) {
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
     console.log('item.release_date', item.release_date);
    const year = item.release_date.slice(0, 4);
    const src = srcAudit();
    const data = { name, year, genr, vote, src };
    filmList.insertAdjacentHTML('beforeend', card(data));
  });
}


