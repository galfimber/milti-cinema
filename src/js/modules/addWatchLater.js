export default function addWatchLater(data, likeFilm) {
  const films = [];
  let check = false;
  if (JSON.parse(localStorage.getItem("films")) !== null) {
    JSON.parse(localStorage.getItem("films")).forEach((film) => {
      if (film !== data.id) {
        films.push(film);
        // likeFilm.querySelector(".mark__icon").style.color = "red";
        likeFilm.classList.add("mark__icon--active");
      } else {
        check = true;
        // likeFilm.querySelector(".mark__icon").style.color = "transparent";
        likeFilm.classList.remove("mark__icon--active");
      }
    });
  }

  if (!check) {
    films.push(data.id);
  }

  window.localStorage.setItem("films", JSON.stringify(films));

  // const options = {
  //   mode: 'no-cors',
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   // body: JSON.stringify({
  //   //   films: [
  //   //     {
  //   //       id: data.id,
  //   //       countries: data.countries,
  //   //       genres: data.genres,
  //   //       year: data.year,
  //   //       watchability: data.watchability,
  //   //       rating: data.rating,
  //   //       persons: data.persons,
  //   //       movieLength: data.movieLength,
  //   //       poster: data.poster,
  //   //       description: data.description,
  //   //       videos: data.videos,
  //   //       name: data.name,
  //   //     },
  //   //   ],
  //   // }),
  //   body: JSON.stringify({ jsonData_2 }),
  // };
  // const resp = await fetch(url, options);
  // const respData = await resp.json();
  // console.log(respData);
}
