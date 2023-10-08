//MobileNav
import mobileNav from "./modules/mobile-nav.js";
//mobileNav();
import showSearchResult from "./modules/showSearchResult.js";

//Kinopoisk Api
//Show popular film
const API_KEY = "84S4SNX-Y084WMK-K7FV73W-8G8P6MH";
const API_URL_POPULAR =
  "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=10&top10=1";
const API_URL_SEARCH =
  "https://api.kinopoisk.dev/v1.3/movie?selectFields=name&selectFields=videos.trailers.url&selectFields=description&selectFields=poster&selectFields=movieLength&selectFields=persons.name&selectFields=rating&selectFields=watchability&selectFields=year&selectFields=genres&selectFields=id&selectFields=countries.name&";
getPopular(API_URL_POPULAR, "popular");

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
  if (data.docs[0].watchability.items != null) {
    popularLink.href = data.docs[0].watchability.items[0].url;
  }
}

//Search film
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".form__input");
const search_Result = document.querySelector(".search-result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}page=1&limit=30&name=${inputSearch.value}`;
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
