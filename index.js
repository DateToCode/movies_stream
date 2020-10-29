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

function getMovies(movies) {
  console.log(movies);
  movies = JSON.parse(movies);
  console.table(movies["Search"]);
}

function searchMovie() {
  const inputValue = document.getElementById("inputSearch").value;

  httpGetAsync(URL + "s=" + inputValue.replace(" ", "+"), getMovies);
}
