import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `4556eff0e1693d6c81c92e5f5a201c65`;
const MEDIA_TYPE = `movie`;
// const TIME_WINDOW = `week`;

// Получение фильмов по поиску

export async function getFilmSearch(searchQuery, page) {
  console.log('searchQuery',searchQuery);
  // const url = `${BASE_URL}/search/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
  return await axios
    .get(
      `${BASE_URL}/search/${MEDIA_TYPE}?api_key=${KEY}&query=${searchQuery}&page=${page}`
    )
    .then(response => {
      console.log('Search response 1', response.data);
      return {
        page: page,
        totalItems: response.data.total_results,// totalItems: колл-во найденных фильмов
        resultsSearch: response.data.results,
      };
    })
    .catch(error => {
      console.error(
        'Something wrong with getMovieBySearch fetch',
        error.message
      );
    });
}


// try {
//     const response = await axios
//       .get(
//         requestURL
//         // `${BASE_URL}${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${KEY}&page=${page}`
//       )
//       .then(res => res.data);
//     return response.results;
//   } catch (error) {
//     Notify.failure('Something went wrong! Try again');
//     console.log(error);
//   }

// catch((error) => {console.error("Something wrong with getMovieBySearch fetch", error.message)

// Получение детальной информации о фильме - в модальное окно

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${movieId}?api_key=${KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      console.log('MovieDetails 2', response.data);
      return {
        data: response.data,
        genresCut: response.data.genres.slice(0, 3),
      };
    })
    .catch(error => {
      console.error(
        'Something wrong with getMovieDetails fetch',
        error.message
      );
    });
}

// Получение списка жанров

async function getGenres() {
  const url = `${BASE_URL}/genre/${MEDIA_TYPE}/list?api_key=${KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      console.log('Genres response 3', response.data);
      return response.data.genres;
    })
    .catch(error => {
      console.error('Something wrong with getGenres fetch', error.message);
    });
}

// Получение key трейлера

async function getTrailerKey(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      console.log('Video response 4', response.data);
      if (response.data.results.length === 0) {
        console.log('Нет трейлера');
        return;
      }
      return response.data.results[0].key;
    })
    .catch(error => {
      console.error('Something wrong with getTrailerUrl fetch', error.message);
    });
}

// export default {getDataApi, getFilmSearch, getMovieDetails, getGenres, getTrailerKey}
