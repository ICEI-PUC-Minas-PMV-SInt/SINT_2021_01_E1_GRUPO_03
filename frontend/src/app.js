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
/*add imagem na modal generica*/
function addImgModalGenerica(element) {    
    const sessaoCarregamento = document.getElementById("arquivos-modal-post")
    const arquivos = Array.from(element.files)
    

    arquivos.forEach(arquivo => { //selecionando cada arquivo e criando elementos e dando estilos
        
        const div = document.createElement("div");
        div.classList.add("imagens-carregadas-container-itens");//add classe css a div
        const img = document.createElement("img");
        const imgUrl = URL.createObjectURL(arquivo); // criando a url
        img.src=imgUrl // passando a url para o src
        img.classList.add("imagem-post-modal");
        div.appendChild(img);
        sessaoCarregamento.appendChild(div);
    })
    element.value=null;//limpando o input
}

/*add video na modal generica*/
function addVideoModalGenerica(element) {    
    const sessaoCarregamento = document.getElementById("arquivos-modal-post")
    const arquivos = Array.from(element.files)
    

    arquivos.forEach(arquivo => { //selecionando cada arquivo e criando elementos e dando estilos
        
        const div = document.createElement("div");
        div.classList.add("imagens-carregadas-container-itens");//add classe css a div
        const video = document.createElement("video");
        const videoUrl = URL.createObjectURL(arquivo); // criando a url
        video.src=videoUrl // passando a url para o src
        video.classList.add("imagem-post-modal");
        video.setAttribute("controls","")//add play,volume...
        div.appendChild(video);
        sessaoCarregamento.appendChild(div);
    })
    element.value=null;//limpando o input
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

/*Feed*/
function publicarPost() {
    const elementoPost = document.getElementById("modal-generica-entrada-de-dados") //estou colocando a div "entrada-de-dados" do html dentro da const elemento Post
    const conteudoPost = elementoPost.innerText // acessando o texto da div do modal post
    let imgPostModal = document.getElementById("arquivos-modal-post")
    const recuperarSessao = document.getElementById("sessao-de-post") // estou colocando a sessao de post do html dentro da const recuperarSessao

    // criando a div principal(container)
    const criandoDiv = document.createElement("div") // div principar, div container
    criandoDiv.classList.add('post','container','border')// div que criamos no js herdar o estilo css que criamos na div do html

    // criando a div que amarra nome do usuario e foto
    const divInformacaoDoUsuario = document.createElement("div")// criando div que amarra foto de perfil e nome do post
    divInformacaoDoUsuario.className = "usuario_post" //estilo da div

    // criando a foto do usuario no post
    const fotoDoUsuario = document.createElement("img") // criando img
    fotoDoUsuario.className = "img_post" // estilo da img
    fotoDoUsuario.src = "https://avatars.githubusercontent.com/u/63205222?v=4"
    fotoDoUsuario.alt = "Erika Marques"

    // criando nome do usuario
    const nomeUsuario = document.createElement("h3")
    nomeUsuario.innerText = "Erika Marques"

    // criando paragrafo do post
    const paragrafo = document.createElement("p")
    paragrafo.className = "texto_publicacao" // associando o estilo css para a tag crianda
    paragrafo.innerText = conteudoPost // colocando o conteudo que conseguimos acessar da modal
    elementoPost.textContent = null // limpando o texto da modal apos a publicaçao,para as futuras publicaçoes a modal estar sem nenhum texto

    //criando a img do post
    let fotosDoPost = [];
    for (let i = 0; i < imgPostModal.children.length; i++) {
        let arquivoDaModal = imgPostModal.children[i].children[0]
        let arquivoDoPost
        if(arquivoDaModal.nodeName.toLowerCase() === "img"){
         arquivoDoPost = document.createElement("img") // criando img
        }
        else if(arquivoDaModal.nodeName.toLowerCase() === "video"){
            arquivoDoPost = document.createElement("video") // criando video
            arquivoDoPost.setAttribute("controls","")//add play,volume...
        }
        arquivoDoPost.className = "publicacao" // estilo da img
        arquivoDoPost.src = arquivoDaModal.src
        fotosDoPost.push(arquivoDoPost)
    }

    // Removendo elementos img da modal
    imgPostModal.textContent = null;

    // criando area de comentarios

    //aparador
    const aparador = document.createElement("hr");
    aparador.className = "aparador-post"; //estilo

    //div
    const divComentarios = document.createElement("div");
    divComentarios.className = "area_comentarios"; // estilo

    //div da img
    const divComentariosFlex = document.createElement("div");
    divComentariosFlex.classList.add("area_comentarios_flex","comentario-perfil") 

    //img
    const usuarioComentarioImg = document.createElement("img");
    usuarioComentarioImg.className = "img_comentario";
    usuarioComentarioImg.src = "assets/images/usuarios/jovem-estudante.png";

    //div do input
    const divComentariosFlexInput = document.createElement("div");
    divComentariosFlexInput.classList.add("area_comentarios_flex","comentario-perfil") 

    //input
    const comentarioUsuario = document.createElement("input");
    comentarioUsuario.type = "text";
    comentarioUsuario.placeholder = "Escreva um comentário";
    
    //associando pais e filhos
    divInformacaoDoUsuario.appendChild(fotoDoUsuario);
    divInformacaoDoUsuario.appendChild(nomeUsuario);
    divComentariosFlex.appendChild(usuarioComentarioImg);
    divComentarios.appendChild(divComentariosFlex);
    divComentariosFlexInput.appendChild(comentarioUsuario)
    divComentarios.appendChild(divComentariosFlexInput);
    criandoDiv.prepend(divInformacaoDoUsuario); // prepend para ele ser sempre o que veem em primeiro no post
    criandoDiv.append(paragrafo);
    fotosDoPost.forEach(imgTags => criandoDiv.append(imgTags));
    criandoDiv.append(aparador);
    criandoDiv.append(divComentarios);

    recuperarSessao.prepend(criandoDiv) // jogando a div que criamos dentro da sessao, para isso associamos a div como filho da sessao
    fecharModalGenerica()
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

/*Perfil*/

function editarPerfil(element) {
    element.classList.add("btn-edit-ativo")

    let editarTrabalho = document.getElementById("perfil-trabalho");
    editarTrabalho.setAttribute("contenteditable","true");
    editarTrabalho.focus();

    let editarCidade = document.getElementById("perfil-local");
    editarCidade.setAttribute("contenteditable","");

    let editarRelacionamento = document.getElementById("perfil-relacionamento");
    editarRelacionamento.setAttribute("contenteditable","true");

    let editarDataNasc = document.getElementById("perfil-dataNasc");
    editarDataNasc.setAttribute("contenteditable","true");

    let editarHobbies = document.getElementById("perfil-hobbies");
    editarHobbies.setAttribute("contenteditable","true");

    let editarTelefone = document.getElementById("perfil-mobile");
    editarTelefone.setAttribute("contenteditable","true");

}