const URL = "http://www.omdbapi.com/?apikey=" + KEY + "&";

function toggleSearchMenu() {
  let navListSearch = document.getElementById("navbarSearchNav");
  navListSearch.classList.toggle("collapse");
}

function httpGetAsync(url, callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function printMovies(parentHTML, movies) {
  parentHTML.innerHTML = "";

  movies.forEach((movie) => {
    printMovie(parentHTML, movie);
  });
}

function printMovie(parentHTML, movie) {
  // declaracion elemento html
  let liMovie = document.createElement("li");

  // DIV CONTENEDOR
  let movieContainer = document.createElement("div");
  movieContainer.className = "movie__container";

  // DIV CONTENEDOR IMAGEN
  let movieImageContainer = document.createElement("div");
  movieImageContainer.className = "movie__image__container";

  // IMAGEN
  let movieImage = document.createElement("img");
  movieImage.src = movie["Poster"];

  movieImageContainer.appendChild(movieImage);

  movieContainer.appendChild(movieImageContainer);

  // DIV CONTENEDOR INFO

  let movieInfoContainer = document.createElement("div");
  movieInfoContainer.className = "movie__info__container";

  // TITULO
  let movieTitle = document.createElement("h1");
  movieTitle.textContent = movie["Title"];

  movieInfoContainer.appendChild(movieTitle);

  // HR
  let movieHr = document.createElement("hr");
  movieInfoContainer.appendChild(movieHr);

  // AÑO
  let movieYear = document.createElement("h2");
  movieYear.textContent = `Año: ${movie["Year"]}`;

  movieInfoContainer.appendChild(movieYear);

  // TIPO
  let movieType = document.createElement("p");
  movieType.textContent = `Tipo: ${movie["Type"]}`;

  movieInfoContainer.appendChild(movieType);

  movieContainer.appendChild(movieInfoContainer);

  liMovie.appendChild(movieContainer);

  parentHTML.appendChild(liMovie);
}

function getMovies(movies) {
  localStorage.setItem("movies", movies);
  console.log(movies);
  movies = JSON.parse(movies);
  console.table(movies["Search"]);

  const listMoviesContainer = document.getElementById(
    "moviesSearchListContainer"
  );

  printMovies(listMoviesContainer, movies["Search"]);
}

function searchMovie() {
  const inputValue = document.getElementById("inputSearch").value;

  httpGetAsync(URL + "s=" + inputValue.replace(" ", "+"), getMovies);
}
