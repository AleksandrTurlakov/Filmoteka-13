import cardEl from '../js/templates/card.hbs';
const libraryUl = document.querySelector('.library__list');
const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');
watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);
function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('watched')).map(cardEl).join('')
  );
}
function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML(
    'beforeend',
    JSON.parse(localStorage.getItem('queue')).map(cardEl).join('')
  );
}
