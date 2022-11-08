

// // Получение фильмов по поиску

// export async function getFilmSearch(searchQuery, page) {
//   console.log('searchQuery',searchQuery);
//   // const url = `${BASE_URL}/search/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
//   return await axios
//     .get(
//       `${BASE_URL}/search/${MEDIA_TYPE}?api_key=${KEY}&query=${searchQuery}&page=${page}`
//     )
//     .then(response => {
//       console.log('Search response 1', response.data);
//       return {
//         page: page,
//         totalItems: response.data.total_results,// totalItems: колл-во найденных фильмов
//         resultsSearch: response.data.results,
//       };
//     })
//     .catch(error => {
//       Notify.failure('Something went wrong! Try again');
//     console.log(error);
//     });
// }
