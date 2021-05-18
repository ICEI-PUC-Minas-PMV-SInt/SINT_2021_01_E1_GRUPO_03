//Const das paginas
const login = "./components/login/login.html";
const profile = "./components/profile/profile.html";
const header = "./components/header/header.html";
const menuNav = "./components/menu-nav/menu-nav.html";

/**
 * Carrega pagina do Header.
 */
async function loadHeader() {
  const contentDiv = document.getElementById("header");
  contentDiv.innerHTML = fetchHtmlAsText(header);
}

/**
 * Carrega pagina do menu nav.
 */
async function loadMenuNav() {
  const contentDiv = document.getElementById("menu_nav");
  contentDiv.innerHTML = fetchHtmlAsText(menuNav);
}

/**
 * Carrega pagina de login.
 */
async function loadLogin() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = fetchHtmlAsText(login);
}

/**
 * Carrega pagina de perfil.
 */
async function loadProfile() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = fetchHtmlAsText(profile);
}

/**
 * @param {String} url - Caminho da pagina que deve ser carregada
 * @return {String} Retorna a pagina como string
 */
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

/**
 * Carrega os components principais
 * @returns {Promise<void>}
 */
async function loadMainComponents() {

  await isUserLoggedIn().then(value => {
    if (value) {
      console.log('user is loggedIn ' + value)
      loadHeader();
      loadMenuNav();
      loadFeed();
    } else {
      console.log('user is NOT loggedIn ' + value)
      loadLogin();
    }
  });
}

/**
 *
 * @returns {Promise<boolean>} retorna true se o usuario esta logado senao false.
 */
async function isUserLoggedIn() {
  return sessionStorage.getItem('loggedUser') != null
}