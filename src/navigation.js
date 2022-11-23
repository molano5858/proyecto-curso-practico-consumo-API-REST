// aqui creamos este archivo para poder tener el codigo de navegacion aparte y que main.js no quede tan largo

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back(); // este resuelve el hecho de darle hacia atras y que no vuelva en el historial de busqueda (antes mandaba solo al home)
  // location.hash = "#home";
});

window.addEventListener("load", navigator); // estamos ejecutando la funcion navigator apenas cargue la pagina
window.addEventListener("hashchange", navigator); // estamos ejecutando la funcion navigator cada que el HASH de la URL cambie

function navigator() {
  //esta funcion va a ver si en la url #hash cambia para poder ejecutar cierto codigo
  console.log(location);
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetails();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  window.scrollTo(0, 0); // para solucionar que el scroll a movernos aparecia la ventana abajo, esto es para que apareaca arriba

  // el scroll se puede hacer con window.scrollTop(x,y) o se puede hacer con als dos sieuignetes lineas que serian document.body.scrollTop y document.documentElement.scrollTop
  //document.body.scrollTop = 0;
  //document.documentElement.scrollTop = 0;
}

function trendsPage() {
  console.log("Estamos en la seccion Trends");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove(".header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();
}

function searchPage() {
  console.log("Estamos en la seccion Busqueda");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove(".header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [noLoNecesito, searchData] = location.hash.split("=");
  getMoviesBySearch(searchData);
}

function movieDetails() {
  console.log("Estamos en la seccion Movies Details");
  headerSection.classList.add("header-container--long");
  //   headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add(".header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  //[#movie,'id de la pelicula']
  const [noLoNecesito, movieId] = location.hash.split("=");

  getMovieById(movieId); //funcion para cargar los detalles de cada pelicula
}

function categoriesPage() {
  console.log("Estamos en la seccion Categorias");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove(".header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  //lo siguiente recordemos que me devolveria en este formato ['#categoria', 'id-name']
  const [noLoNecesito, categoryData] = location.hash.split("=");
  const [id, name] = categoryData.split("-");

  headerCategoryTitle.innerHTML = name;
  getMoviesByCategories(id);
}

function homePage() {
  console.log("Estamos en el HOME");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove(".header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}
