export const handleClick = (e, movieData) => {
  const { target } = e;

  const type = target.textContent.includes('watched') ? 'watched' : 'queue';

  prepareDataSetToLS(type, movieData);
};

const prepareDataSetToLS = (type, movie) => {
  const storageMovies = getMoviesFromLS(type);
  const isAlredyInStorage =
    storageMovies &&
    !!storageMovies.find(storageMovie => storageMovie.id === movie.id);

  if (isAlredyInStorage) return;

  if (!storageMovies) {
    return setMoviesToLS(type, [movie]);
  }

  return setMoviesToLS(type, [...storageMovies, movie]);
};

const setMoviesToLS = (type, data) => {
  localStorage.setItem(type, JSON.stringify(data));
};

const getMoviesFromLS = type => {
  return JSON.parse(localStorage.getItem(type));
};