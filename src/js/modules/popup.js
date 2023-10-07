export default function FilmInfo(film) {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup--open");
  document.body.classList.add("no-scroll");

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
  for (let i = 0; i < 3; i++) {
    allActros += `${film.persons[i].name}, `;
  }
  allActros = allActros.slice(0, -2);

  let trailer = "";
  if (film.videos && film.videos.trailers.length > 0) {
    //trailer = film.videos.trailers[0].url;
    trailer = `<iframe allowfullscreen class="film__trailer"src="${film.videos.trailers[0].url}"></iframe>`;
  } else {
    //trailer = film.poster.url;
    trailer = `<img class="film__trailer" src="${film.poster.url}" alt="poster">`;
  }
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
  <div class="popup__body">
    <div class="popup__header">
      <div class="popup__title"><h2 class="title-2">${film.name}</h2></div>
      <a href="#" class="popup__close"><i class="fa-solid fa-xmark"></i></a>
    </div>
    <div class="popup__content">
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
  </div>`;

  const link = [];
  const linkLogo = [];
  if (film.watchability && film.watchability.items.length > 0) {
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
  window.addEventListener("click", (e) => {
    // при клике в любом месте окна браузера
    const target = e.target; // находим элемент, на котором был клик
    if (
      (!target.closest(".popup__body") && target.closest(".popup")) ||
      target.closest(".popup__close")
    ) {
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      e.preventDefault();
      popup.classList.remove("popup--open");
      document.body.classList.remove("no-scroll"); // то закрываем окно навигации, удаляя активный класс
      popup.innerHTML = "";
      cinemaList.innerHTML = "";
    }
  });

  //const name = document
  //  .querySelector(".popup__title")
  //  .querySelector(".title-2");
  //const trailer = document.querySelector(".film__trailer");
  //const genre = document.querySelector(".film__genre");
  //let allGenres = "";
  //const country = document.querySelector(".film__countries");
  //let allCountries = "";
  //const year = document.querySelector(".film__year");
  //const filmLength = document.querySelector(".film__length");
  //const actors = document.querySelector(".film__actors");
  //let allActros = "";
  //const description = document.querySelector(".film__description");
  //name.textContent = film.name;
  //trailer.src = film.videos.trailers[0].url;
  //film.genres.forEach((genres) => (allGenres += `${genres.name}, `));
  //genre.textContent = allGenres.slice(0, -2);
  //film.countries.forEach(
  //  (countries) => (allCountries += `${countries.name}, `)
  //);
  //country.textContent = allCountries.slice(0, -2);
  //year.textContent = film.year;
  //filmLength.textContent = `${film.movieLength} мин.`;
  //for (let i = 0; i < 3; i++) {
  //  allActros += `${film.persons[i].name}, `;
  //  actors.textContent = allActros.slice(0, -2);
  //}
  //description.textContent = film.description;
}
