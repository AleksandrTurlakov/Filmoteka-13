const container = document.querySelector('.container');
const picList=document.querySelector('.pic-list')
let page = 1;
const genres={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"}
async function topThisDay() {
    return await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=7bfeb33324f72574136d1cd14ae769b5&page=${page}`).then(res=>res.json()).then(res=>res.results)
}

function auditGanres(el){
  if (el.length < 4) {
    return el.join(', ')
  } else {
    return el.slice(0, 3).join(', ')+', others'
  }
}
function buildElements(response) {
    response.map(item => {
      const name = item.original_title.toUpperCase();
      const year = item.release_date.slice(0, 4);
      const genr = item.genre_ids.map(elem => genres[elem])
      let src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      function srcAudit(src){
        if (!item.poster_path) {
            return src=`https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg`
        }
           return src=`https://image.tmdb.org/t/p/w500${item.poster_path}`
      }
      picList.insertAdjacentHTML('beforeend', `<li class="pic-item">
  <img class="main-image" loading="lazy" src='${srcAudit(src)}' alt="${item.original_title
        }" /><div class="tex-item">
  <p class="item-name">${name 
        }</p><div class="info">
  <p class="item-genre">${auditGanres(genr)}
    </p><p class="item-year">${year
        } </p></div></div>
</li>`)
    })
  }

topThisDay().then
  (response =>
    buildElements(response)
).catch(err => console.log(err))

function addElafterScroll() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    plusPage();
  }
}
function plusPage (){
  page +=1;
  topThisDay().then(res => buildElements(res)).catch(err => console.log(err)) 
  if (page === 1000) {
    window.removeEventListener('scroll', addElafterScroll)
  }
}
window.addEventListener('scroll', addElafterScroll)