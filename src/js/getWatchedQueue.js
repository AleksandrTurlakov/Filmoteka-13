// import { buildElements } from './first_page.js';

const library = document.querySelector('.library__list');
const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');

const libraryWatchedBtn = document.getElementById('watched-btn');
const libraryQueueBtn = document.getElementById('queue-btn');

const watched = localStorage.getItem((key = 'watched'));
const queue = localStorage.getItem((key = 'queue'));
// console.log(watched);
// console.log(queue);

function getWatched() {
  if (watched !== null) {
    return JSON.parse(watched);
  }
  return [];
}
function getQueue() {
  if (queue !== null) {
    return JSON.parse(queue);
  }
  return [];
}
getQueue();
getWatched();
console.log(getWatched(), getQueue());

function storageHtml() {
  watched.forEach(({ name, year, genr, vote, src, id }) => {
    // let activeBtn = '';

    htmlLibrary += `<li class='film-item' data-id=${id}>
    <img class='main-image' loading='lazy' src='${src}' alt='${name}' />
    <div class='tex-item'>
      <p class='item-name'>${name}</p>
      <div class='info'>
        <p class='item-genre'>${genr}</p>
        <p class='item-year'>${year}<span class='vote'>${vote}</span></p>
      </div>
    </div>
  </li>`;
    library.classList.remove('library');
    library.insertAdjacentHTML('beforeend', htmlLibrary);
  });
}
