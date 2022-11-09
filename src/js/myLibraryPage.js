const movieCardList = document.querySelector('.film-list');

export function myLibraryPage() {
  movieCardList.innerHTML = `<div class="library">
       <div class="library-bg">
        <div class="library-bg__image"></div>
        <p class="library-bg__message">You have nothing here!</p>
        <p class="library-bg__message">Don't forget to add some movie!</p>
      </div>
      </div>`;
  movieCardList.classList.add('library');
}
