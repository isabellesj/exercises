fetch("http://omdbapi.com/?apikey=9a863550&s=harry")
  .then((response) => response.json())
  .then((movies) => {
    // console.log(movies.Search);
    createHTML(movies.Search);
  });

function createHTML(movies) {
  const moviesContainer = document.getElementById("movies");
  // moviesContainer.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const movieContainer = document.createElement("div");
    movieContainer.className = "movie";
    const imgContainer = document.createElement("div");
    imgContainer.className = "imgContainer";
    const movieImg = document.createElement("img");
    const title = document.createElement("h3");

    const movieTitle = movies[i].Title;
    const moviePoster = movies[i].Poster;

    title.innerHTML = movieTitle;
    movieImg.src = moviePoster;

    moviesContainer.appendChild(movieContainer);
    imgContainer.appendChild(movieImg);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);

    movieContainer.addEventListener("click", () => {
      movieInfo(movies[i].imdbID, movieContainer);
    });
  }
}

function movieInfo(imdbID, movieContainer, movies) {
  fetch(`http://omdbapi.com/?apikey=9a863550&i=${imdbID}`)
    .then((response) => response.json())
    .then((movieInfo) => {
      console.log(movieInfo);
      createHtmlForMovie(movieInfo, movieContainer, movies);
    });
}

function createHtmlForMovie(movieInfo, movieContainer, movies) {
  movieContainer.innerHTML = "";
  const textInfo = document.createElement("p");
  textInfo.innerHTML = movieInfo.Plot;

  movieContainer.appendChild(textInfo);
}
