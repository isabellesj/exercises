fetch("http://omdbapi.com/?apikey=9a863550&s=harry")
  .then((response) => response.json())
  .then((movies) => {
    // console.log(movies.Search);
    createHTML(movies.Search);
  });

function createHTML(movies) {
  const moviesContainer = document.getElementById("movies");

  for (let i = 0; i < movies.length; i++) {
    const movieContainer = document.createElement("div");
    movieContainer.className = "movie";
    const imgContainer = document.createElement("div");
    imgContainer.className = "imgContainer";
    const movieImg = document.createElement("img");
    movieImg.setAttribute("id", "movieImg-" + i.toString());
    const title = document.createElement("h3");
    title.setAttribute("id", "title-" + i.toString());

    title.innerHTML = movies[i].Title;
    movieImg.src = movies[i].Poster;

    moviesContainer.appendChild(movieContainer);
    imgContainer.appendChild(movieImg);
    movieContainer.appendChild(title);
    movieContainer.appendChild(imgContainer);

    movieContainer.addEventListener("click", () => {
      fillTitlesAndImages(movies);
      movieInfo(movies[i].imdbID, title, movieImg, movieContainer);
    });
  }
}

function movieInfo(imdbID, title, movieImg, movieContainer) {
  fetch(`http://omdbapi.com/?apikey=9a863550&i=${imdbID}`)
    .then((response) => response.json())
    .then((movieInfo) => {
      console.log(movieInfo);
      createHtmlForMovie(movieInfo, title, movieImg, movieContainer);
    });
}

function createHtmlForMovie(movieInfo, title, movieImg, movieContainer) {
  title.innerHTML = "";
  movieImg.src = "";

  const textInfo = document.createElement("p");
  textInfo.innerHTML = movieInfo.Plot;

  movieContainer.appendChild(textInfo);
}

function fillTitlesAndImages(movies) {
  removePtags();

  for (let i = 0; i < movies.length; i++) {
    const title = document.getElementById("title-" + i.toString());
    const movieImg = document.getElementById("movieImg-" + i.toString());

    title.innerHTML = movies[i].Title;
    movieImg.src = movies[i].Poster;
  }
}

function removePtags() {
  const pTags = document.getElementsByTagName("p");
  for (let i = 0; i < pTags.length; i++) {
    pTags[i].remove();
  }
}
