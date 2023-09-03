//MobileNav
import mobileNav from "./modules/mobile-nav.js";
//mobileNav();

//Kinopoisk Api
//Show popular film
const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_SEARCH = "https://api.kinopoisk.dev/v1.3/movie?";

async function getFilms(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await resp.json();
  console.log(data);
  showSearchResult(data);
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else return "red";
}
function showSearchResult(data) {
  const searchResult = document.querySelector(".films");
  searchResult.innerHTML = "";

  data.docs.forEach((film) => {
    const filmEl = document.createElement("div");
    let filmLink;

    film.watchability.items.forEach((source) => {
      if (source.name == "Kinopoisk HD") {
        filmLink = source.url;
      } else {
        filmLink = source.url;
      }
    });

    filmEl.classList.add("film");
    filmEl.innerHTML = `
          <a href="${filmLink}" target="_blank" class="movie__cover-inner">
          <img src="${film.poster.url}" alt="${film.name}" class="movie__cover">
          <div class="movie__cover--darkened"></div>
      </a>
      <div class="movie__info">
          <div class="movie__title">${film.name}</div>
          <div class="movie__category">${film.genres.map(
            (genre) => ` ${genre.name}`
          )}</div>
          <a class="movie__link" href="https://www.ggkinopoisk.ru/film/${
            film.id
          }/" target=_blank>Смотреть бесплатно</a>
          <div class="movie__average movie__average--${getClassByRate(
            film.rating.imdb
          )}">${film.rating.imdb}</div>
      </div>
          `;
    searchResult.appendChild(filmEl);
  });
  const pages = document.querySelectorAll(".pagination__btn");
  if (data.page < 4) {
    pages.forEach((page) => {
      switch (page.dataset.num) {
        case "1":
          page.innerHTML = 1;
          break;
        case "2":
          page.innerHTML = 2;
          break;
        case "3":
          page.innerHTML = 3;
          break;
        case "4":
          page.innerHTML = 4;
          break;
        case "5":
          page.innerHTML = 5;
          break;
        default:
          break;
      }
      if(page.textContent == data.page){
        document.querySelector('.page-active').classList.remove('page-active');
        page.classList.add('page-active');
      }
    });
  } else {
    pages.forEach((page) => {
      switch (page.dataset.num) {
        case "1":
          page.innerHTML = 1;
          break;
        case "2":
          page.innerHTML = data.page - 1;
          break;
        case "3":
          page.innerHTML = data.page;
          break;
        case "4":
          page.innerHTML = data.page +1;
          break;
        case "5":
          page.innerHTML = data.page + 2;
          break;
        default:
          break;
      }
      if(page.textContent == data.page){
        document.querySelector('.page-active').classList.remove('page-active');
        page.classList.add('page-active');
      }
    });
  }
}

let selectGenre;
//Select genre
const genres = document.querySelectorAll(".genre__title");
const pagesBlock = document.querySelector('.pages');
genres.forEach((genre) => {
  genre.addEventListener("click", (e) => {
    selectGenre = genre.dataset.genre;
    const apiSearchUrl = `${API_URL_SEARCH}page=1&limit=30&genres.name=${encodeURIComponent(
      selectGenre
    )}`;
    pagesBlock.classList.add('pages--visible');
    getFilms(apiSearchUrl);
  });
});

//Select pages

const pages = document.querySelectorAll(".pagination__btn");
pages.forEach((page) => {
  page.addEventListener("click", (e) => {
    const apiSearchUrl = `${API_URL_SEARCH}page=${
      page.textContent
    }&limit=30&genres.name=${encodeURIComponent(selectGenre)}`;
    getFilms(apiSearchUrl);
  });
});
