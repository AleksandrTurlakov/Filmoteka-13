function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},l={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in l){var t=l[e];delete l[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){l[e]=t},t.parcelRequired7c6=a);var i=e(a("amrNH")).template({compiler:[8,">= 4.3.0"],main:function(e,t,n,l,a){var i,o=null!=t?t:e.nullContext||{},s=e.hooks.helperMissing,r="function",c=e.escapeExpression,d=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return"<li class='library__film-item' data-id="+c(typeof(i=null!=(i=d(n,"id")||(null!=t?d(t,"id"):t))?i:s)===r?i.call(o,{name:"id",hash:{},data:a,loc:{start:{line:1,column:39},end:{line:1,column:45}}}):i)+">\n  <img\n    class='library__main-image'\n    loading='lazy'\n    src='"+c(typeof(i=null!=(i=d(n,"src")||(null!=t?d(t,"src"):t))?i:s)===r?i.call(o,{name:"src",hash:{},data:a,loc:{start:{line:5,column:9},end:{line:5,column:16}}}):i)+"'\n    alt='"+c(typeof(i=null!=(i=d(n,"name")||(null!=t?d(t,"name"):t))?i:s)===r?i.call(o,{name:"name",hash:{},data:a,loc:{start:{line:6,column:9},end:{line:6,column:17}}}):i)+"'\n  />\n  <div class='library__tex-item'>\n    <p class='library__item-name'>"+c(typeof(i=null!=(i=d(n,"name")||(null!=t?d(t,"name"):t))?i:s)===r?i.call(o,{name:"name",hash:{},data:a,loc:{start:{line:9,column:34},end:{line:9,column:42}}}):i)+"</p>\n    <div class='library__info'>\n      <p class='library__item-genre'>"+c(typeof(i=null!=(i=d(n,"genr")||(null!=t?d(t,"genr"):t))?i:s)===r?i.call(o,{name:"genr",hash:{},data:a,loc:{start:{line:11,column:37},end:{line:11,column:45}}}):i)+"</p>\n      <p class='library__item-year'>"+c(typeof(i=null!=(i=d(n,"year")||(null!=t?d(t,"year"):t))?i:s)===r?i.call(o,{name:"year",hash:{},data:a,loc:{start:{line:12,column:36},end:{line:12,column:44}}}):i)+"<span\n          class='vote'\n        >"+c(typeof(i=null!=(i=d(n,"vote")||(null!=t?d(t,"vote"):t))?i:s)===r?i.call(o,{name:"vote",hash:{},data:a,loc:{start:{line:14,column:9},end:{line:14,column:17}}}):i)+"</span></p>\n    </div>\n  </div>\n  <button class='library__btn-list-delete' id='close' type='button'>\n    <svg class='far fa-trash-alt'>\n    </svg>\n  </button>\n</li>"},useData:!0}),o=a("4RHyl"),s=a("6tWIa");const r=document.querySelector(".library__list"),c=document.querySelector(".library"),d=document.querySelector("#watched-btn"),u=document.querySelector("#queue-btn"),m=(document.querySelector(".library__btn-list-delete"),document.querySelector("body")),p=document.querySelector(".backdrop"),v=JSON.parse(localStorage.getItem("watched")),y=JSON.parse(localStorage.getItem("queue"));d.addEventListener("click",(function(){r.innerHTML="",r.insertAdjacentHTML("beforeend",v.map(i).join("")),r.classList.remove("visually-hidden"),c.classList.add("visually-hidden"),d.classList.toggle("activeBtn"),u.classList.remove("activeBtn")})),u.addEventListener("click",(function(){r.innerHTML="",r.insertAdjacentHTML("beforeend",y.map(i).join("")),r.classList.remove("visually-hidden"),c.classList.add("visually-hidden"),u.classList.toggle("activeBtn"),d.classList.remove("activeBtn")}));let f="";r.addEventListener("click",(function(e){if(e.target===e.currentTarget)return;p.innerHTML="";const t=e.target.closest("li");f=t.dataset.id;const n=`https://api.themoviedb.org/3/movie/${f}?api_key=7bfeb33324f72574136d1cd14ae769b5`;(0,o.getDataApi)(n).then((e=>function(e){const t=e.genres.map((e=>e.name)).join(", ");function n(){return e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg"}const l={src:n(),name:e.title.toUpperCase(),vote:e.vote_average.toFixed(1),vote_count:e.vote_count,popularity:e.popularity,original_title:e.original_title,genr:t,overview:e.overview,id:e.id};p.insertAdjacentHTML("beforeend",(0,s.default)(l)),a()}(e)));const l=document.querySelector(".scroll-up");function a(){p.classList.remove("is-hidden"),m.classList.add("no-scroll"),l.classList.remove("scroll-up--active"),p.removeEventListener("click",a),document.querySelector(".button-close").addEventListener("click",i),p.addEventListener("click",r)}function i(){p.classList.add("is-hidden"),m.classList.remove("no-scroll"),l.classList.add("scroll-up--active"),p.removeEventListener("click",r)}function r(e){e.target===e.currentTarget&&(p.classList.add("is-hidden"),m.classList.remove("no-scroll"),l.classList.add("scroll-up--active"),p.removeEventListener("click",r))}document.addEventListener("keydown",(function e(t){"Escape"===t.code&&"Escape"===t.code&&(p.classList.add("is-hidden"),m.classList.remove("no-scroll"),l.classList.add("scroll-up--active"),document.removeEventListener("keydown",e))}))})),a("bWjuf");
//# sourceMappingURL=myLibrary.51dfbdf6.js.map
