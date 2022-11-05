import { getTopFilmsThisWeek } from './getTopFilmsThisWeek';
import card from './templates/card.hbs';

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

getTopFilmsThisWeek()
  .then(response => buildElements(response))
  .catch(err => console.log(err));

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
  getTopFilmsThisWeek(page)
    .then(res => buildElements(res))
    .catch(err => console.log(err));
  if (page === 1000) {
    window.removeEventListener('scroll', createElafterScroll);
  }
}
window.addEventListener('scroll', createElafterScroll);
