//Const das paginas
const login = './components/login/login.html';
const profile = './components/profile/profile.html';
const header = './components/header/header.html';
const menuNav = './components/menu-nav/menu-nav.html';
const feed = './src/components/feed/feed.html';

/**
 * Carrega pagina do Header.
 */
async function loadHeader() {
  const headerDiv = document.getElementById('header');
  headerDiv.innerHTML = await fetchHtmlAsText(header);
}

/**
 * Carrega pagina do menu nav.
 */
async function loadMenuNav() {
  const menuNavDiv = document.getElementById('menu_nav');
  menuNavDiv.innerHTML = await fetchHtmlAsText(menuNav);
}

/**
 * Carrega pagina de login.
 */
async function loadLogin() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = await fetchHtmlAsText(login);
}

/**
 * Carrega pagina de perfil.
 */
async function loadProfile() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = await fetchHtmlAsText(profile);
}

/**
 * Carrega conteúdo do feed dinâmico com base no menu selecionado
 */
async function loadFeed(menuSelecionado) {
  
  const contentDiv = document.getElementById('content');

  // Se nenhum menu tiver selecionado ignoramos
  if (menuSelecionado !== undefined) {

    const activeClassName = 'active_menu_nav';
    const aparadorMenuNav = 'aparador_menu_nav';

    menuSelecionado.classList.toggle(activeClassName);

    const menuNavUl = document.getElementById('menu-nav-ul');

    for (let i = 0; i < menuNavUl.children.length; i++) {
      const menuNavLi = menuNavUl.children[i];

      for (let i = 0; i < menuNavLi.children.length; i++) {
        const menuNavLiChild = menuNavLi.children[i];

        if (menuSelecionado !== menuNavLiChild && menuNavLiChild.classList.contains(activeClassName)) {
          menuNavLiChild.classList.remove(activeClassName)
        }

        for (let i = 0; i < menuNavLiChild.children.length; i++) {
          const menuNavAChild = menuNavLiChild.children[i];


          if (menuSelecionado.children[0] !== menuNavAChild && menuNavAChild.classList.contains(aparadorMenuNav)) {
            menuNavAChild.classList.remove(aparadorMenuNav)
          }
          else if (menuSelecionado.children[0] === menuNavAChild) {
            menuNavAChild.classList.add(aparadorMenuNav)
          }
        }
      }
    }
  }
  contentDiv.innerHTML = await fetchHtmlAsText(feed);
}

/**
 * @param {String} url - Caminho da pagina que deve ser carregada
 * @returns {Promise<string>} Retorna a pagina como string
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