// import { getFilmSearch, getMovieDetails, getGenres, getTrailerKey } from './getFilmsApi.js';
// import { getDataApi } from './getDataApi.js';
// // import axios from 'axios';
// import { buildElements, mainpage, addpage, createElafterScroll, URL } from './first_page.js';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // import { buildElements } from './first_page.js';
// import card from './templates/card.hbs';
// const form=document.querySelector('.search__form')
// const filmList = document.querySelector('.film-list');
// const filter = document.querySelector('.filter');
// const container = document.querySelector('.container');
// let page = 1;
// let search = '';
// // let URL=`https://api.themoviedb.org/3/search/movie?api_key=7bfeb33324f72574136d1cd14ae769b5&language=en-US&query=${search}&page=${page}&include_adult=false`;
// const genres = {
//   28: 'Action',
//   12: 'Adventure',
//   16: 'Animation',
//   35: 'Comedy',
//   80: 'Crime',
//   99: 'Documentary',
//   18: 'Drama',
//   10751: 'Family',
//   14: 'Fantasy',
//   36: 'History',
//   27: 'Horror',
//   10402: 'Music',
//   9648: 'Mystery',
//   10749: 'Romance',
//   878: 'Science Fiction',
//   10770: 'TV Movie',
//   53: 'Thriller',
//   10752: 'War',
//   37: 'Western',
// };

// function buildElements(response) {
//   response.map(item => {
//     function auditGanres() {
//       if (item.genre_ids.length < 3) {
//         return item.genre_ids.map(elem => genres[elem]).join(', ');
//       }
//       return (
//         item.genre_ids
//           .map(elem => genres[elem])
//           .slice(0, 2)
//           .join(', ') + ', others'
//       );
//     }
//     function auditUear() {
//   if (item.release_date === '') {
//     return 'unknown';
//   }
//   else { return item.release_date.slice(0, 4); }
// }
//     function srcAudit() {
//       if (!item.poster_path) {
//         return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
//       }
//       return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
//     }
//     const genr = auditGanres();
//     const vote = item.vote_average.toFixed(1);
//     const name = item.title.toUpperCase();
//     const year = auditUear();
//     const src = srcAudit();
//     const data = { name, year, genr, vote, src };
//     filmList.insertAdjacentHTML('beforeend', card(data));
//   });
// }
  

// form.addEventListener('submit', onSubmitClick);
// function onSubmitClick(event) {
//   event.preventDefault();
//   URL=`https://api.themoviedb.org/3/search/movie?api_key=7bfeb33324f72574136d1cd14ae769b5&language=en-US&query=${search}&page=${page}&include_adult=false`
//   async function searchFilms() {
//  return await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7bfeb33324f72574136d1cd14ae769b5&language=en-US&query=${search}&page=${page}&include_adult=false`).then(res=>res.json()).catch(console.log)
// }
  
//   search = event.target.filmName.value;
//   filmList.innerHTML = '';

//   searchFilms().then(res => {
//     const totalPages = res.total_pages;
//     const quantity = res.total_results;
//     buildElements(res.results)
//         function addPage() {
//         page += 1;
//         searchFilms().then(res => buildElements(res.results));
//         if (page === totalPages) {
//           window.removeEventListener('scroll', createElafterScroll);
//         }
//       }

//   });
//   } 

