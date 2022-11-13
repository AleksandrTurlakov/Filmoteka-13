// import myLibraryPage from '../js/templates/libraryPlug.hbs';

import cardEl from '../js/templates/libraryCard.hbs';

const libraryUl = document.querySelector('.library__list');
const libraryBack = document.querySelector('.library');

const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');

const watched = JSON.parse(localStorage.getItem('watched'));
const queue = JSON.parse(localStorage.getItem('queue'));

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', watched.map(cardEl).join(''));
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');

  watched.forEach(index => console.log(index));
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', queue.map(cardEl).join(''));
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  queueBtn.classList.toggle('activeBtn');
  watchedBtn.classList.remove('activeBtn');
}
