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
  const pagination = document.querySelector(".pagination");
  searchResult.innerHTML = "";

  data.docs.forEach((film) => {
    const filmEl = document.createElement("a");

    film.watchability.items.forEach((source) => {
      if (source.name == "Kinopoisk HD") {
        filmEl.href = source.url;
      } else {
        filmEl.href = source.url;
      }
    });

    filmEl.target = "_blank";
    filmEl.classList.add("film");
    filmEl.innerHTML = `
          <div class="movie__cover-inner">
          <img src="${film.poster.url}" alt="${film.name}" class="movie__cover">
          <div class="movie__cover--darkened"></div>
      </div>
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
  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.innerHTML = `
        <button class="pagination__btn" onclick="selectPage(1)">1</button>
        <button class="pagination__btn" onclick="selectPage(${
          data.page - 2
        })">${data.page - 2}</button>
        <button class="pagination__btn" onclick="selectPage(${
          data.page - 1
        })">${data.page - 1}</button>
        <button class="pagination__btn" onclick="selectPage(${data.page})">${
    data.page
  }</button>
        <button class="pagination__btn" onclick="selectPage(${
          data.page + 1
        })">${data.page + 1}</button>
        <button class="pagination__btn" onclick="selectPage(${
          data.page + 2
        })">${data.page + 2}</button>
        <button class="pagination__btn" onclick="selectPage(${data.pages})">${
    data.pages
  }</button>
    `;
  pagination.appendChild(pages);
}

let selectGenre;
//Select genre
const genres = document.querySelectorAll(".genre__title");
genres.forEach((genre) => {
  genre.addEventListener("click", (e) => {
    selectGenre = genre.dataset.genre;
    const apiSearchUrl = `${API_URL_SEARCH}page=1&limit=12&genres.name=${encodeURIComponent(
      selectGenre
    )}`;
    getFilms(apiSearchUrl);
  });
});

//Select pages


//function selectPage(page) {
//  const apiSearchUrl = `${API_URL_SEARCH}page=${
//    page.value
//  }&limit=12&genres.name=${encodeURIComponent(selectGenre)}`;
//  getFilms(apiSearchUrl);
//}

function selectPage (page){
    const pages = document.querySelectorAll(".pagination__btn");
    console.log(pages);
    pages.forEach((page) => {
      page.addEventListener("click", (e) => {
        const apiSearchUrl = `${API_URL_SEARCH}page=${
          page.value
        }&limit=12&genres.name=${encodeURIComponent(selectGenre)}`;
        getFilms(apiSearchUrl);
      });
    });
}