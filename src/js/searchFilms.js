

// // копия ---- buildElements
// export function transformGenres(response) {
//   response.map(item => {
//     function auditGanres() {
//       if (item.genre_ids.length < 3) {
//         return item.genre_ids.map(elem => genres[elem]).join(', ');
//       }
//       return (
//         item.genre_ids
//           .map(elem => genres[elem])
//           .slice(0, 2)
//           .join(', ') + ', others'
//       );
//     }
//     function srcAudit() {
//       if (!item.poster_path) {
//         return `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`;
//       }
//       return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
//     }
//     const genr = auditGanres();
//     const vote = item.vote_average.toFixed(1);
//     const name = item.title.toUpperCase();
//     console.log('item.release_date', item.release_date);
//     const year = item.release_date.slice(0, 4);
//     const src = srcAudit();
//     const data = { name, year, genr, vote, src };
//     filmList.insertAdjacentHTML('beforeend', card(data));
//   });
// }
