export default function addWatchLater(data, likeFilm) {
  const films = [];
  let mustToAdd = true;
  if (JSON.parse(localStorage.getItem("films")) !== null) {
    JSON.parse(localStorage.getItem("films")).forEach((film) => {
      if (film !== data.id) {
        films.push(film);
      } else {
        mustToAdd = false;
        likeFilm.classList.remove("mark__icon--active");
      }
    });
  }

  if (mustToAdd) {
    films.push(data.id);
    likeFilm.classList.add("mark__icon--active");
  }

  window.localStorage.setItem("films", JSON.stringify(films));
}
