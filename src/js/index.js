//MobileNav
import mobileNav from "./modules/mobile-nav.js";
//mobileNav();
import showSearchResult from "./modules/showSearchResult.js";
import addWatchLater from "./modules/addWatchLater.js";

//Kinopoisk Api
//Add userId
// const jsonData = require("./modules/watchLater.json");

// let counter = 0;
// for (let key in jsonData) {
//   counter++;
// }

// if (!window.localStorage.getItem("id")) {
//   window.localStorage.setItem("id", `user_${counter}`);
// }
// const name = window.localStorage.getItem("id");
// console.log(name);

//Show popular film
const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_POPULAR =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&lists=popular-series&selectFields=watchability&selectFields=poster";
const API_URL_SEARCH =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=30&selectFields=id&selectFields=countries&selectFields=genres&selectFields=year&selectFields=watchability&selectFields=rating&selectFields=persons&selectFields=movieLength&selectFields=poster&selectFields=description&selectFields=videos&selectFields=name";

getPopular(API_URL_POPULAR, "popular");

async function getPopular(url, key) {
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
  if (key == "search") {
    showSearchResult(data);
    checkAddWatchLater(data.docs);
  } else {
    showPopular(data);
    checkAddWatchLater(data.docs);
  }
}

function showPopular(data) {
  const popularImg = document.getElementById("popular-img");
  const popularLink = document.getElementById("popular-link");
  const num = Math.floor(Math.random() * (10 - 0) + 0);
  // console.log(num);

  popularImg.src = data.docs[num].poster.url;
  if (data.docs[num].watchability.items.length > 0) {
    popularLink.href = data.docs[num].watchability.items[0].url;
  }
}

//Search film
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".form__input");
const search_Result = document.querySelector(".search-result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}&name=${inputSearch.value}`;
  if (inputSearch.value) {
    search_Result.scrollIntoView(true);
    // console.log(apiSearchUrl);
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
