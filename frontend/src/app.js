/*Login / Cadastro*/
/**
 * Usuario objeto
 * @param id id do usuario
 * @param name o nome de usuario
 * @param email o email do usuario
 * @param password a senha do usuario
 * @param birthday data de nascimento
 * @param postalCode codigo postal do usuario
 * @param neighborhood bairro do usuario
 * @returns {{password, email, username}}
 */
function addUser(id, name, email, password, birthday, postalCode, neighborhood) {
    return {
        "id": id,
        "name": name,
        "email": email,
        "password": password,
        "birthday": birthday,
        "postalCode": postalCode,
        "neighborhood": neighborhood
    };
}

/** Const pra identificar se e um usuario novo ou ja existente */
const novoUsuario = 1;
const usuarioCadastrado = 2;

/**
 * Valida login
 * @param form formulario de login
 */
function verificaLogin(form) {

    if (form.email.value === '' || form.password.value === '') {
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'))

    if (users !== null) {
        let email;
        let password;

        for (let user of users) {

            if (user.email === form.email.value) {
                email = user.email
                password = user.password
                break;
            }
        }

        if (form.email.value === email && form.password.value === password) {
            userSession(form.email.value, usuarioCadastrado);
            reloadPage()
        } else {
            alert('Usuário ou Senha incorreto')
        }
    } else {
        alert('Usuário não encontrado , por favor se cadastre!')
    }
}

function logout() {
    sessionStorage.clear();
    reloadPage()
}

/**
 * Cadastra usuario e ativa sessao.
 * @param form formulario de cadastro
 */
function registro(form) {

    if (form.email.value === '' || form.password.value === '') {
        return;
    }

    const newUser = addUser(uuid(), form.name.value, form.email.value, form.password.value, form.birthday.value,
        form.postalCode.value, form.neighborhood.value);

    if (localStorage.getItem('users')) {
        let storedUsers = JSON.parse(localStorage.getItem('users'));
        storedUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(storedUsers));
    } else {
        let users = [];
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users));
    }

    userSession(newUser, novoUsuario);
    reloadPage()
}


/**
 * Cria a sessão do usuario
 * @param usuario usuário que terá a sessão criada
 * @param {tipoUsuario} tipoUsuario novoUsuario: 1 usuarioCadastrado = 2;
 */
function userSession(usuario, tipoUsuario) {

    if (tipoUsuario === novoUsuario) {
        sessionStorage.setItem("loggedUser", JSON.stringify(usuario))
    } else {
        const users = JSON.parse(localStorage.getItem('users'))
        for (let user of users) {
            if (user.email === usuario) {
                sessionStorage.setItem("loggedUser", JSON.stringify(user))
            }
        }
    }
}


/*Modals*/

/*Modal Cadastro*/
function modalCadastro() {
    const modal = document.getElementById("modalCadastro")
    modal.style.display = 'block';
}

function fecharModalCadastro() {
    const modal = document.getElementById("modalCadastro")
    modal.style.display = 'none';
}

/* Modal generica */
function modalGenerica() {
    let modal = document.getElementById("modal-generica")
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // removendo o scroll da pag quando abre a modal
    const entradaDeDados = document.getElementById("modal-generica-entrada-de-dados")
    entradaDeDados.focus()
}

function fecharModalGenerica() {
    let modal = document.getElementById("modal-generica")
    modal.style.display = "none"
    document.body.style.overflow = "auto" // exibir a barra de scroll quando fechamos a modal
}

/* Modal Casa*/

function modalCasa() {
    let modal = document.getElementById("modal-casa")
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // removendo o scroll da pag quando abre a modal
    const entradaDeDados = document.getElementById("modal-casa-entrada-de-dados")
    entradaDeDados.focus()
}

function fecharModalCasa() {
    let modal = document.getElementById("modal-casa")
    modal.style.display = "none"
    document.body.style.overflow = "auto" // exibir a barra de scroll quando fechamos a modal
}

/* Modal doacoes*/

function modalDoacoes() {
    let modal = document.getElementById("modal-doacoes")
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // removendo o scroll da pag quando abre a modal
    const entradaDeDados = document.getElementById("modal-doacoes-entrada-de-dados")
    entradaDeDados.focus()
}

function fecharModalDoacoes() {
    let modal = document.getElementById("modal-doacoes")
    modal.style.display = "none"
    document.body.style.overflow = "auto" // exibir a barra de scroll quando fechamos a modal
}

/**
 * Exibi modal de cada menu
 */
function exibirModal() {

    const tipoDeMenuNavAtivo = procurarMenuNavAtivo();

    if (tipoDeMenuNavAtivo !== undefined) {
        switch (tipoDeMenuNavAtivo) {
            case 'generico':
                modalGenerica();
                break;
            case 'casa':
                modalCasa();
                break;
            case 'doacoes':
                modalDoacoes();
                break;
            default:
                break;
        }
    }
}

/*Header*/
/**
 * Adiciona class permahover para exibir a modal e so desaparecer quando clicar novamente.
 * @param elemento li dos icons do header
 */
function adicionaPermaHoverClass(elemento) {

    switch (elemento.dataset.tipo) {
        case 'notifications':
            elemento.classList.toggle("permahover-notifications");
            document.getElementById("profile-icon").classList.remove("permahover-profile");
            hideOnClickOutside(elemento)
            break;
        case 'profile':
            elemento.classList.toggle("permahover-profile");
            document.getElementById("notifications-icon").classList.remove("permahover-notifications")
            hideOnClickOutside(elemento)
            break;
    }
}

/**
 * Esconde dropdown sub menu ao clicar fora
 * @param elemento elemento que esta sendo clicado (ex: icone perfil / icone notificações)
 */
function hideOnClickOutside(elemento) {
    const outsideClickListener = event => {
        if (!elemento.contains(event.target) && isVisible(elemento)) {

            if (elemento.dataset.tipo === 'profile') {
                elemento.classList.remove("permahover-profile");
            } else if (elemento.dataset.tipo === 'notifications') {
                elemento.classList.remove("permahover-notifications");
            }
            removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

/* Utils */

// Verifica se o elemento está visível na tela
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)

/**
 * Procura qual menu nav esta ativo
 * @returns retorna o tipo do nav que esta ativo (exemplo generico,casa,doacoes)
 */
function procurarMenuNavAtivo() {

    const activeClassName = 'active_menu_nav';

    const menuNavUl = document.getElementById("menu-nav-ul");

    for (let i = 0; i < menuNavUl.children.length; i++) {
        const menuNavLi = menuNavUl.children[i];

        for (let i = 0; i < menuNavLi.children.length; i++) {
            if (menuNavLi.children[i].classList.contains(activeClassName)) {
                return menuNavLi.children[i].dataset.tipo;
            }
        }
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function reloadPage() {
    location.reload();
}