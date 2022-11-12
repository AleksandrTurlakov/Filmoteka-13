
// import myLibraryPage from './myLibraryPage.js';

import cardEl from '../js/templates/card.hbs';

const libraryUl = document.querySelector('.library__list');
const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');

// const markupLibrary = `<div class="library">
// <div class="library-bg">
//  <div class="library-bg__image"></div>
//  <p class="library-bg__message">You have nothing here!</p>
//  <p class="library-bg__message">Don't forget to add some movie!</p>
// </div>
// </div>`;

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('watched')).map(cardEl).join('')
  );
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');
  // if (onWatchedClick().length === null) {
  //   myLibraryPage();
  // }
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('queue')).map(cardEl).join('')
  );
  queueBtn.classList.toggle('activeBtn');
  watchedBtn.classList.remove('activeBtn');
}
