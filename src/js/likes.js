import showSearchResult from "./modules/showSearchResult.js";
import addWatchLater from "./modules/addWatchLater.js";

const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_SEARCH =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=30&selectFields=id&selectFields=countries&selectFields=genres&selectFields=year&selectFields=watchability&selectFields=rating&selectFields=persons&selectFields=movieLength&selectFields=poster&selectFields=description&selectFields=name";

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
  showSearchResult(data);
  checkAddWatchLater(data.docs);
}

//Search film
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".form__input");
const search_Result = document.querySelector(".films");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}&name=${inputSearch.value}`;
  if (inputSearch.value) {
    search_Result.scrollIntoView(true);
    getFilms(apiSearchUrl, );
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

//Show watch later
const showWatchLater = () => {
  let searchFilms = "";
  if (
    JSON.parse(localStorage.getItem("films")) !== null &&
    JSON.parse(localStorage.getItem("films")).length > 0
  ) {
    JSON.parse(localStorage.getItem("films")).forEach((film) => {
      searchFilms += `&id=${film}`;
    });
    const apiSearchUrl = `${API_URL_SEARCH}${searchFilms}`;
    getFilms(apiSearchUrl);
  } else {
    const searchResult = document.querySelector(".films");
    searchResult.innerHTML = `<div class="no__film" style="font-size:30px;">Нечего смотреть...</div>`;
  }
};

//   Add watch later
const checkAddWatchLater = (data) => {
  const likeFilms = document.querySelectorAll(".mark");
  likeFilms.forEach((likeFilm) => {
    likeFilm.addEventListener("click", (e) => {
      e.preventDefault();
      likeFilm.closest(".film").remove();

      const searchResult = document.querySelector(".films");
      if (searchResult.children.length < 1) {
        searchResult.innerHTML = `<div class="no__film" style="font-size:30px;">Нечего смотреть...</div>`;
      }

      addWatchLater(
        data[likeFilm.dataset.id],
        likeFilm.querySelector(".mark__icon")
      );
    });
  });
};

showWatchLater();
