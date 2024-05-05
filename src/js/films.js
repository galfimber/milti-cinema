//MobileNav
import mobileNav from "./modules/mobile-nav.js";
//mobileNav();
import FilmInfo from "./modules/popup.js";
import showSearchResult from "./modules/showSearchResult.js";
import addWatchLater from "./modules/addWatchLater.js";

//Kinopoisk Api
//Show popular film
const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_SEARCH =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=30&selectFields=name&selectFields=videos&selectFields=description&selectFields=poster&selectFields=movieLength&selectFields=persons.name&selectFields=rating&selectFields=watchability&selectFields=year&selectFields=genres&selectFields=id&selectFields=countries.name";

const API_URL_BASE = "https://api.kinopoisk.dev/v1.3/movie?";
const API_URL_FIELD = "&selectFields=name&selectFields=videos&selectFields=description&selectFields=poster&selectFields=movieLength&selectFields=persons.name&selectFields=rating&selectFields=watchability&selectFields=year&selectFields=genres&selectFields=id&selectFields=countries.name"
async function getFilms(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
    },
  };
  const resp = await fetch(url, options);
  const data = await resp.json();
  // console.log(data);
  showSearchResult(data);
  checkAddWatchLater(data.docs);
}

//Select genre
let selectGenre;
const genres = document.querySelectorAll(".genre__title");
const pagesBlock = document.querySelector(".pages");
genres.forEach((genre) => {
  genre.addEventListener("click", (e) => {
    selectGenre = genre.dataset.genre;
    const apiSearchUrl = `${API_URL_SEARCH}&genres.name=${encodeURIComponent(
      selectGenre
    )}`;
    pagesBlock.classList.add("pages--visible");
    getFilms(apiSearchUrl);
  });
});

//Select pages

const pages = document.querySelectorAll(".pagination__btn");
pages.forEach((page) => {
  page.addEventListener("click", (e) => {
    const apiSearchUrl = `${API_URL_BASE}page=${
      page.textContent
    }&limit=30&genres.name=${encodeURIComponent(selectGenre)}${API_URL_FIELD}`;
    search_Result.scrollIntoView(true);
    getFilms(apiSearchUrl);
  });
});

//Search film
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".form__input");
const search_Result = document.querySelector(".films");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}&name=${inputSearch.value}`;
  if (inputSearch.value) {
    search_Result.scrollIntoView(true);
    getFilms(apiSearchUrl, "search");
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

//   Add watch later
const checkAddWatchLater = (data) => {
  const likeFilms = document.querySelectorAll(".mark");
  likeFilms.forEach((likeFilm) => {
    likeFilm.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log(data[likeFilm.dataset.id]);
      addWatchLater(
        data[likeFilm.dataset.id],
        likeFilm.querySelector(".mark__icon")
      );
    });
  });
};
