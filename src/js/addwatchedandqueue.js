const testmovie = {
    name: `Harry Potter`, id:1
} // Это тестовый обьект фильма, потом уберу//
 
 document.addEventListener('DOMContentLoaded', function(){
    const QUEUE_SELECTOR = document.querySelector('.action-queue'); // Класы кнопок тут поменяю как будет модалка готова//
    const WATCHED_SELECTOR = document.querySelector('.action-watched');
    
   [QUEUE_SELECTOR, WATCHED_SELECTOR].map((actionButton) => {

      actionButton.addEventListener('click', () => {
        
        const type = actionButton.textContent.includes('watched') ? 'watched' : 'queue';
        
        prepareDataSetToLS(type, {
          ...testmovie,
          date: new Date(),
        })
    });
    });
    
    const prepareDataSetToLS = (type, movie) => {
      const storageMovies = getMoviesFromLS(type);
      const isAlredyInStorage = storageMovies && !!storageMovies.find((storageMovie) => storageMovie.id === movie.id);
      
      if (isAlredyInStorage) return;
      
      if (!storageMovies) {
        return setMoviesToLS(type, [movie]);
      }
      
      return setMoviesToLS(type, [...storageMovies, movie]);
    }
    
    const setMoviesToLS = (type, data) => {
      localStorage.setItem(type, JSON.stringify(data))
    }
    
    const getMoviesFromLS = (type) => {
      return JSON.parse(localStorage.getItem(type));
    };
 });

 