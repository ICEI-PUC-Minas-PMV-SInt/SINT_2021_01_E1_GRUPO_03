//Const das paginas
const login = './components/login/login.html';
const profile = './components/profile/profile.html';
const header = './components/header/header.html';
const menuNav = './components/menu-nav/menu-nav.html';
const feed = './components/feed/feed.html';
const settings = './components/settings/settings.html';

/**
 * Carrega pagina do Header.
 */
async function loadHeader() {
    const headerDiv = document.getElementById('header');
    headerDiv.innerHTML = await fetchHtmlAsText(header);
    verificaBairro();
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
    await hideMenuNav(true);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = await fetchHtmlAsText(profile);

    // Carrega informacoes do usuario logado
    document.getElementById('profile-name').textContent = usuarioLogado.name
}

/**
 * Carrega pagina de conf.
 */
async function loadSettings() {
    await hideMenuNav(true);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = await fetchHtmlAsText(settings);
    document.getElementById('nome-usuario-settings').textContent = usuarioLogado.name
}

/**
 * Esconde ou exibi menu nav
 * @param hide se true troca para display block , se false troca para none
 */
async function hideMenuNav(hide) {
    const menuNav = document.getElementById('menu_nav')

    if (hide) {
        menuNav.style.display = "none";
    } else {
        menuNav.style.display = "block";
    }
}

/**
 * Carrega conteúdo do feed dinâmico com base no menu selecionado
 */
async function loadFeed(menuSelecionado) {

    await hideMenuNav(false);

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
                    } else if (menuSelecionado.children[0] === menuNavAChild) {
                        menuNavAChild.classList.add(aparadorMenuNav)
                    }
                }
            }
        }
    }
    contentDiv.innerHTML = await fetchHtmlAsText(feed);

    let nomeMenu;
    if (menuSelecionado === undefined) {
        nomeMenu = 'noticias';
    } else {
        nomeMenu = menuSelecionado.dataset.name;
    }

    const feedsGuardados = JSON.parse(localStorage.getItem('feeds'));

    // Busca o bairro do usuario
    const bairro = document.getElementById('bairro').textContent;

    if (feedsGuardados !== null) {

        const recuperarSessao = document.getElementById("sessao-de-post");

        for (let i = 0; i < feedsGuardados.bairros.length; i++) {
            const feedBairro = feedsGuardados.bairros[i];
            // Comparamos o bairro do usuario logado com o do localstorage
            if (bairro === feedBairro.bairro) {
                for (let i = 0; i < feedBairro.feeds.length; i++) {
                    const feed = feedBairro.feeds[i];
                    if (nomeMenu === feed.tipoFeed && feed.html !== undefined) {
                        let criandoDiv = document.createElement('div');
                        criandoDiv.classList.add('post', 'container', 'border')
                        criandoDiv.setAttribute('id', feed.postId);
                        criandoDiv.setAttribute('data-tipo', feed.tipoFeed)
                        criandoDiv.insertAdjacentHTML('beforeend', feed.html);
                        recuperarSessao.prepend(criandoDiv)
                    }
                }
            }
        }
    }

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

function verificaBairro() {
    const usuario = recuperaUsuarioLogado();
    const bairro = document.getElementById('bairro');
    bairro.textContent = usuario.neighborhood;
    ;
}

function recuperaUsuarioLogado() {
    return JSON.parse(sessionStorage.getItem('loggedUser'));
}

/**
 *
 * @returns {Promise<boolean>} retorna true se o usuario esta logado senao false.
 */
async function isUserLoggedIn() {
    return sessionStorage.getItem('loggedUser') != null
}