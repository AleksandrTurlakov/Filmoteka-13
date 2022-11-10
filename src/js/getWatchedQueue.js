// import { buildElements } from './first_page.js';
// import myLibraryPage from './myLibraryPage.js';
// import { handleClick } from './addWatchedQue.js';

const library = document.querySelector('.library__list');
// const watchedBtn = document.getElementById('watched-btn');
// const queueBtn = document.getElementById('queue-btn');

// const localStorageWatched = Watched => {};
// console.log(localStorage.getItem((key = 'watched')));

// function getWatched(key) {
//   const LocalWatched = localStorage.getItem((key = 'watched'));
//   // const watched = JSON.parse(LocalWatched);
//   console.log(LocalWatched);
// }

// function getQueue(key) {
//   const queue = localStorage.getItem((key = 'queue'));
//   console.log(queue);
// }

let watchedList = JSON.parse(localStorage.getItem((key = 'watched')));
console.log(watchedList);

// window.addEventListener('storage', event => {
//   console.log(event);
// });

function buildLibrary(libs) {
  allResults = libs.total_results;

  libs.results.map(item => {
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
    function auditYear() {
      if (!item.release_date) {
        return 'unknown year';
      } else return item.release_date.slice(0, 4);
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
    const year = auditYear();
    const src = srcAudit();
    const id = item.id;

    const data = { name, year, genr, vote, src, id };

    library.insertAdjacentHTML('beforeend', card(data));
  });
}
