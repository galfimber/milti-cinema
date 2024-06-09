export default function FilmInfo(film) {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup--open");
  const body = document.body;
  const html = document.querySelector("html");
  const scrollWidth = innerWidth - body.clientWidth;
  body.classList.add("no-scroll");
  html.classList.add("no-scroll");
  body.setAttribute("style", "padding-right:" + scrollWidth + "px");

  popup.innerHTML = "";

  let allGenres = "";
  film.genres.forEach((genres) => (allGenres += `${genres.name}, `));
  allGenres = allGenres.slice(0, -2);
  let allCountries = "";
  film.countries.forEach(
    (countries) => (allCountries += `${countries.name}, `)
  );
  allCountries = allCountries.slice(0, -2);
  let allActros = "";
  if (film.persons.length > 0) {
    for (let i = 0; i < 3; i++) {
      allActros += `${film.persons[i].name}, `;
    }
    allActros = allActros.slice(0, -2);
  }

  let trailer = "";
  trailer = `<div class="kinobox_player film__trailer"></div>`;
  // if (film.hasOwnProperty("videos") && film.videos.trailers.length > 0) {
  //   //trailer = film.videos.trailers[0].url;
  // trailer = `<iframe allowfullscreen class="film__trailer"src="${film.videos.trailers[0].url}"></iframe>`;
  // } else {
  //   //trailer = film.poster.url;
  //   trailer = `<img class="film__trailer" src="${film.poster.url}" alt="poster">`;
  // }

  // async function getFilm(url) {
  //   const resp = await fetch(url);
  //   const data = await resp.json();
  //   console.log(data[data.length - 1].iframeUrl);
  //   trailer = `<iframe allowfullscreen frameborder="0" class="film__trailer"src="${
  //     data[data.length - 1].iframeUrl
  //   }"></iframe>`;
  // }
  // getFilm(`https://kinobox.tv/api/players?kinopoisk=${film.id}`);

  let filmLength = "";
  if (film.movieLength != null) {
    filmLength = `${film.movieLength.toString()} мин.`;
  }
  let description = "";
  if (film.description == null || !film.description) {
    description = "";
  } else {
    description = film.description;
  }

  popup.innerHTML = `
  <div class="popup__wrapper">
    <div class="popup__header">
      <div class="popup__title"><h2 class="title-2">${film.name}</h2></div>
      <button class="popup__close"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="popup__body">
      <div class="popup__content ">
        ${trailer}
        <div class="film__info">
          <div class="film__watch"></div>
          <div class="film__genre">${allGenres}</div>
          <div class="film__countries">${allCountries}</div>
          <div class="film__year">${film.year}</div>
          <div class="film__length">${filmLength}</div>
          <div class="film__actors">${allActros}</div>
          <div class="film__description">${description}</div>
        </div>
      </div>
    </div>
  </div>`;

  const link = [];
  const linkLogo = [];
  if (film.watchability.items.length > 0 && film.watchability.items != null) {
    for (let i = 0; i < film.watchability.items.length; i++) {
      linkLogo[i] = film.watchability.items[i].logo.url;
      link[i] = film.watchability.items[i].url;
    }
    const filmWatch = document.querySelector(".film__watch");
    filmWatch.innerHTML = `
    <h3 class="title-3">Можно посмотреть</h2>
    <ul class="film__cinema"></ul>`;
    const cinemaList = document.querySelector(".film__cinema");
    cinemaList.innerHTML = "";
    for (let i = 0; i < link.length; i++) {
      cinemaList.innerHTML += `<li class="film__cinema--item"><a class="film__link" href="${link[i]}" target="_blank"><img class="film__link--img" src="${linkLogo[i]}"></a></li>`;
    }
  }

  //const popupClose = document.querySelector(".popup__close");
  //popupClose.addEventListener("click", (e) => {
  //e.preventDefault();
  //popup.classList.remove("popup--open");
  //document.body.classList.remove("no-scroll");
  //});
  kbox(".kinobox_player", { search: { kinopoisk: film.id } });
  window.addEventListener("click", (e) => {
    // при клике в любом месте окна браузера
    const target = e.target; // находим элемент, на котором был клик
    if (
      (!target.closest(".popup__wrapper") && target.closest(".popup")) ||
      target.closest(".popup__close")
    ) {
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      e.preventDefault();
      popup.classList.remove("popup--open");
      document.body.classList.remove("no-scroll"); // то закрываем окно навигации, удаляя активный класс
      body.style.removeProperty("padding-right");
      popup.innerHTML = "";
    }
  });
}
