import FilmInfo from "./popup.js";

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else return "red";
}
export default function showSearchResult(data) {
  const searchResult = document.querySelector(".films");
  searchResult.innerHTML = "";

  let index = -1;
  data.docs.forEach(function (film) {
    if (
      film.poster == null ||
      film.poster.url == null ||
      film.name == null ||
      film.genres.length == 0 ||
      !film.genres
    ) {
      index++;
      return;
    }
    index++;
    let active = "";
    if (JSON.parse(localStorage.getItem("films")) !== null) {
      JSON.parse(localStorage.getItem("films")).forEach((filmMark) => {
        if (filmMark === film.id) {
          active = "mark__icon--active";
        }
      });
    }

    const filmEl = document.createElement("div");

    filmEl.classList.add("film");
    filmEl.innerHTML = `
            <button data-id="${index}" class="movie__cover-inner">
            <img src="${film.poster.url}" alt="${
      film.name
    }" class="movie__cover">
            <div class="movie__cover--darkened"></div>
        </button>
        <div class="movie__info">
            <div class="movie__title">${film.name}</div>
            <div class="movie__category">${film.genres.map(
              (genre) => ` ${genre.name}`
            )}</div>
            <div class="movie__average movie__average--${getClassByRate(
              film.rating.imdb
            )}">${film.rating.imdb}</div>
            <button data-id="${index}" data-film="${
      film.id
    }" class="mark"><i class="fa-solid fa-heart mark__icon ${active}"></i></button>
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
      if (page.textContent == data.page) {
        document.querySelector(".page-active").classList.remove("page-active");
        page.classList.add("page-active");
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
          page.innerHTML = data.page + 1;
          break;
        case "5":
          page.innerHTML = data.page + 2;
          break;
        default:
          break;
      }
      if (page.textContent == data.page) {
        document.querySelector(".page-active").classList.remove("page-active");
        page.classList.add("page-active");
      }
    });
  }
  getAboutFilms(data.docs);
}
//Show popup
function getAboutFilms(data) {
  const aboutFilms = document.querySelectorAll(".movie__cover-inner");
  aboutFilms.forEach((aboutFilm) => {
    aboutFilm.addEventListener("click", (e) => {
      e.preventDefault();
      FilmInfo(data[aboutFilm.dataset.id]);
    });
  });
}
