export default function FilmInfo(film) {
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('popup--open');
  });
  popup.classList.add("popup--open");
  const name = document
    .querySelector(".popup__title")
    .querySelector(".title-2");
  const trailer = document.querySelector(".film__trailer");
  const genre = document.querySelector(".film__genre");
  let allGenres = "";
  const country = document.querySelector(".film__countries");
  let allCountries = "";
  const year = document.querySelector(".film__year");
  const filmLength = document.querySelector(".film__length");
  const actors = document.querySelector(".film__actors");
  let allActros = "";
  const description = document.querySelector(".film__description");
  name.textContent = film.name;
  trailer.src = film.videos.trailers[0].url;
  film.genres.forEach((genres) => (allGenres += `${genres.name}, `));
  genre.textContent = allGenres.slice(0, -2);
  film.countries.forEach(
    (countries) => (allCountries += `${countries.name}, `)
  );
  country.textContent = allCountries.slice(0, -2);
  year.textContent = film.year;
  filmLength.textContent = `${film.movieLength} мин.`;
  for (let i = 0; i < 3; i++) {
    allActros += `${film.persons[i].name}, `;
    actors.textContent = allActros.slice(0, -2);
  }
  description.textContent = film.description;
}

