import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `4556eff0e1693d6c81c92e5f5a201c65`;
const MEDIA_TYPE = `movie`;
const TIME_WINDOW = `week`;

// Получение трендовых фильмов - главная страница
export async function getDataApi(page) {
  try {
    const response = await axios
      .get(       
        `${BASE_URL}/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${KEY}&page=${page}`
      )
      .then(res => res.data);
    return response.results;
  } catch (error) {
    Notify.failure('Something went wrong! Try again');
    console.log(error);
  }
}

