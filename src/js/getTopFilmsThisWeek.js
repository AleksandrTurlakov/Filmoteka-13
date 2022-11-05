import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = `https://api.themoviedb.org/3/trending/`;
const KEY = `7bfeb33324f72574136d1cd14ae769b5`;
const MEDIA_TYPE = `movi`;
const TIME_WINDOW = `week`;

export async function getTopFilmsThisWeek(page = 1) {
  try {
    const response = await axios
      .get(
        `${BASE_URL}${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${KEY}&page=${page}`
      )
      .then(res => res.data);
    return response.results;
  } catch (error) {
    Notify.failure('Something went wrong! Try again');
  }
}
