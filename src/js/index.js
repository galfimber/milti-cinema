//MobileNav
import mobileNav from "./modules/mobile-nav.js";
//mobileNav();

//Kinopoisk Api
//Show popular film
const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_POPULAR =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&top10=1";
const API_URL_SEARCH =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=12&name=";
//getPopular(API_URL_POPULAR, "popular");

async function getPopular(url, key) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await resp.json();
  console.log(data);
  if (key == "search") {
    showSearchResult(data);
  } else {
    showPopular(data);
  }
}
function showPopular(data) {
  const popularImg = document.getElementById("popular-img");
  const popularLink = document.getElementById("popular-link");

  popularImg.src = data.docs[0].poster.url;
  popularLink.href = data.docs[0].watchability.items[0].url;
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
    let filmLink = '#!';
    let target = "";

    if (film.watchability.items && film.watchability.items.length >= 1) {
      target = 'target="_blank"';
      film.watchability.items.forEach((source) => {
        if (source.name == "Kinopoisk HD") {
          filmLink = source.url;
        } else {
          filmLink = source.url;
        }
      });
    }

    filmEl.classList.add("film");
    filmEl.innerHTML = `
        <a href="${filmLink}" ${target} class="movie__cover-inner">
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
}

//Search film
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".form__input");
const search_Result = document.querySelector(".search-result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${inputSearch.value}`;
  if (inputSearch.value) {
    search_Result.scrollIntoView(true);
    getPopular(apiSearchUrl, "search");
    inputSearch.value = "";
  }
});

//Search form
const search = document.querySelector(".btn-search");
const searchBtn = document.querySelector(".form__submit");

search.addEventListener("click", function () {
  inputSearch.classList.toggle("active");
  searchBtn.classList.toggle("active");
  if (inputSearch.classList.contains("active")) {
    inputSearch.focus();
  } else {
    inputSearch.blur();
  }
});
