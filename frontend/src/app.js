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
 * Busca cep e preenche campo de bairro no formulario de cadastro.
 * @param valorPreenchido o cep preenchido no formulario de cadastro.
 */
function preencherCepFormCadastro(valorPreenchido) {

    //Nova variável "cep" somente com dígitos.
    let cep = valorPreenchido.replace(/\D/g, '');

    //Expressão regular para validar o CEP.
    let validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
        document.getElementById('bairroCadastroInput').value = "...";

        fetch(`https://viacep.com.br/ws/${cep}/json`)
            .then(response => response.json())
            .then(res => {

                if (!("erro" in res)) {
                    document.getElementById('bairroCadastroInput').value = (res.bairro);
                } else {
                    alert("CEP não encontrado.");
                    document.getElementById('bairroCadastroInput').value = null;
                }

            })
            .catch(onerror => {
                alert(`Erro ao carregar cep ${onerror}`)
            })

    } else {
        alert("Formato de CEP inválido.");
    }
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

    // Identifica qual a modal ativa
    let botaoPublicacao = modal.children[0].children[5].children[2].children[0];
    identificaTipoDeModal(botaoPublicacao)
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
        img.src = imgUrl // passando a url para o src
        img.classList.add("imagem-post-modal");
        div.appendChild(img);
        sessaoCarregamento.appendChild(div);
    })
    element.value = null;//limpando o input
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
        video.src = videoUrl // passando a url para o src
        video.classList.add("imagem-post-modal");
        video.setAttribute("controls", "")//add play,volume...
        div.appendChild(video);
        sessaoCarregamento.appendChild(div);
    })
    element.value = null;//limpando o input
}

/* Modal Casa*/

function modalCasa() {
    let modal = document.getElementById("modal-casa")
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // removendo o scroll da pag quando abre a modal
    const entradaDeDados = document.getElementById("modal-casa-entrada-de-dados")
    entradaDeDados.focus()

    // Identifica qual a modal ativa
    let botaoPublicacao = modal.children[0].children[6].children[0];
    identificaTipoDeModal(botaoPublicacao)
}

function fecharModalCasa() {
    let modal = document.getElementById("modal-casa")
    modal.style.display = "none"
    document.body.style.overflow = "auto" // exibir a barra de scroll quando fechamos a modal
}

/*seleciona a opcao de tag*/
function selecionandoTagImoveis(element) {
    element.classList.toggle("modal-casa-opcao-ativo")

    switch (element.dataset.tipo) {
        case 'vendendo':
            document.getElementById("opcao-alugando").classList.remove("modal-casa-opcao-ativo");
            document.getElementById("opcao-procurando").classList.remove("modal-casa-opcao-ativo");
            break;

        case 'alugando':
            document.getElementById("opcao-procurando").classList.remove("modal-casa-opcao-ativo");
            document.getElementById("opcao-vendendo").classList.remove("modal-casa-opcao-ativo");
            break;
        case 'procurando':
            document.getElementById("opcao-vendendo").classList.remove("modal-casa-opcao-ativo");
            document.getElementById("opcao-alugando").classList.remove("modal-casa-opcao-ativo");
            break;
    }
}

/* Modal doacoes*/

function modalDoacoes() {
    let modal = document.getElementById("modal-doacoes")
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // removendo o scroll da pag quando abre a modal
    const entradaDeDados = document.getElementById("modal-doacoes-entrada-de-dados")
    entradaDeDados.focus()

    // Identifica qual a modal ativa
    let botaoPublicacao = modal.children[0].children[5].children[2].children[0];
    identificaTipoDeModal(botaoPublicacao)
}

function fecharModalDoacoes() {
    let modal = document.getElementById("modal-doacoes")
    modal.style.display = "none"
    document.body.style.overflow = "auto" // exibir a barra de scroll quando fechamos a modal
}

function identificaTipoDeModal(elemento) {
    const menuAtivo = procurarMenuNavAtivo().dataset.name
    elemento.setAttribute('data-tipo', menuAtivo)
}

/*selecionando a opcao de tag*/
function selecionandoTagDoacoes(element) {
    element.classList.toggle("modal-doacoes-opcao-ativo")

    switch (element.dataset.tipo) {
        case 'doando':
            document.getElementById("opcao-help").classList.remove("modal-doacoes-opcao-ativo");
            break;
        case 'help':
            document.getElementById("opcao-doando").classList.remove("modal-doacoes-opcao-ativo");
            break;
    }

}

/**
 * Exibe modal de cada menu
 */
function exibirModal() {

    const tipoDeMenuNavAtivo = procurarMenuNavAtivo('tipo');

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

const feedNoticias = 'noticias';
const feedEstabelecimentos = 'estabelecimentos'
const feedSeguranca = 'seguranca';
const feedImoveis = 'imoveis';
const feedEventos = 'eventos';
const feedDoacoes = 'doacoes';
const feedDesaparecidos = 'desaparecidos';


function modeloFeed(bairro, tipoFeed, html) {
    return {
        "bairros": [{
            "bairro": bairro,
            "feeds": [{
                "tipoFeed": [{
                    "tipo": tipoFeed,
                    "html": html
                }]
            }]
        }]
    };
}

function modeloFeedCriacaoBairro(bairro, tipoFeed, html) {
    return {
        "bairros": {
            "bairro": bairro,
            "feeds": [{
                "tipoFeed": [{
                    "tipo": tipoFeed,
                    "html": html
                }]
            }]
        }
    };
}

function modeloFeedLight(tipoFeed, html) {
    return {
        "tipoFeed": tipoFeed,
        "html": html
    }
}


/*Feed*/
function publicarPost(tipoModal) {

    let elementoPost  //colocando a div "entrada-de-dados" do html dentro da const elemento Post
    switch (tipoModal.dataset.name) {

        case 'generica':
            elementoPost = document.getElementById("modal-generica-entrada-de-dados")
            break;
        case 'doacoes':
            elementoPost = document.getElementById("modal-doacoes-entrada-de-dados")
            break;
        case 'imovel':
            elementoPost = document.getElementById("modal-imovel-entrada-de-dados")
            break;
    }
    const conteudoPost = elementoPost.innerText // acessando o texto da div do modal post
    let imgPostModal = document.getElementById("arquivos-modal-post");
    const recuperarSessao = document.getElementById("sessao-de-post"); // colocando a sessao de post do html dentro da const recuperarSessao

    // criando a div principal(container)
    const criandoDiv = document.createElement("div") // div principar, div container
    criandoDiv.classList.add('post', 'container', 'border')// div que criamos no js herdar o estilo css que criamos na div do html

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

    //recuperando a opcao da modal doacoes e criando as tags do post
    let opcaoModalDoacoes
    let divTagConstruida
    if (tipoModal.dataset.name !== 'generica') {


        if (tipoModal.dataset.name === "doacoes") {
            document.querySelectorAll("p").forEach(opcao => {
                if (opcao.classList.value === "modal-doacoes-tipo modal-doacoes-opcao-ativo") {
                    opcaoModalDoacoes = opcao
                }
            })

        }

        const divTag = document.createElement('div');
        divTag.classList.add('tags');
        const tipoTag = document.createElement('div');
        if (opcaoModalDoacoes.dataset.tipo === 'doando') { //p
            tipoTag.classList.add('donation-tag')

        } else if (opcaoModalDoacoes.dataset.tipo === 'help') {
            tipoTag.classList.add('help-tag')
        }
        const conteudoTag = document.createElement('p');
        conteudoTag.classList.add('tag-child');
        conteudoTag.textContent = opcaoModalDoacoes.textContent;

        tipoTag.appendChild(conteudoTag);
        divTag.append(tipoTag);
        divTagConstruida = divTag

    }

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
        if (arquivoDaModal.nodeName.toLowerCase() === "img") {
            arquivoDoPost = document.createElement("img") // criando img
        } else if (arquivoDaModal.nodeName.toLowerCase() === "video") {
            arquivoDoPost = document.createElement("video") // criando video
            arquivoDoPost.setAttribute("controls", "")//add play,volume...
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
    divComentariosFlex.classList.add("area_comentarios_flex", "comentario-perfil")

    //img
    const usuarioComentarioImg = document.createElement("img");
    usuarioComentarioImg.className = "img_comentario";
    usuarioComentarioImg.src = "assets/images/usuarios/jovem-estudante.png";

    //div do input
    const divComentariosFlexInput = document.createElement("div");
    divComentariosFlexInput.classList.add("area_comentarios_flex", "comentario-perfil")

    //input
    const comentarioUsuario = document.createElement("input");
    comentarioUsuario.type = "text";
    comentarioUsuario.placeholder = "Escreva um comentário";

    //associando pais e filhos
    divInformacaoDoUsuario.appendChild(fotoDoUsuario);
    divInformacaoDoUsuario.appendChild(nomeUsuario);
    if (divTagConstruida !== undefined) {
        divInformacaoDoUsuario.appendChild(divTagConstruida);
    }
    divComentariosFlex.appendChild(usuarioComentarioImg);
    divComentarios.appendChild(divComentariosFlex);
    divComentariosFlexInput.appendChild(comentarioUsuario)
    divComentarios.appendChild(divComentariosFlexInput);
    criandoDiv.prepend(divInformacaoDoUsuario); // prepend para ele ser sempre o que veem em primeiro no post
    criandoDiv.append(paragrafo);
    fotosDoPost.forEach(imgTags => criandoDiv.append(imgTags));
    criandoDiv.append(aparador);
    criandoDiv.append(divComentarios);

    recuperarSessao.prepend(criandoDiv); // jogando a div que criamos dentro da sessao, para isso associamos a div como filho da sessao
    fecharModalGenerica();
    fecharModalCasa();
    fecharModalDoacoes();
    salvarFeeds(tipoModal.dataset.tipo, criandoDiv.innerHTML)
}

/**
 * Salva feed na localstorage
 * @param tipoFeed exemplo 'feedNoticias'...
 * @param {InnerHTML} post Post que deve ser salvo
 */
function salvarFeeds(tipoFeed, post) {

    // Recupera os feeds salvos
    let feeds = JSON.parse(localStorage.getItem('feeds'));

    // Busca o bairro do usuario
    const bairro = document.getElementById('bairro').textContent;

    // Se ainda nao existir feed criamos um novo registro no localstorage
    if (feeds === null) {
        localStorage.setItem('feeds', JSON.stringify(modeloFeed(bairro)))
        feeds = JSON.parse(localStorage.getItem('feeds'));
    }

    // Caso o bairro do usuario nao exista no local storage , criamos um novo registro
    if (feeds.bairros.some(bairros => bairros.bairro === bairro)) {
        console.log('bairro ja existe no localstorage')
    } else {
        feeds.bairros.push(modeloFeedCriacaoBairro(bairro).bairros)
        localStorage.setItem('feeds', JSON.stringify(feeds));
        feeds = JSON.parse(localStorage.getItem('feeds'));
    }

    // Adiciona o post no bairro especifico
    for (let i = 0; i < feeds.bairros.length; i++) {
        const feedBairro = feeds.bairros[i];
        // Comparamos o bairro do usuario logado com o do localstorage
        if (bairro === feedBairro.bairro) {
            // Adicionamos o novo post ao array de feeds e salvamos na localstorage
            feedBairro.feeds.push(modeloFeedLight(tipoFeed, post))
            localStorage.setItem('feeds', JSON.stringify(feeds))
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
            elemento.children[0].classList.toggle("icone-notificacao-ativo");
            hideOnClickOutside(elemento);
            document.getElementById("profile-icon").children[0].classList.remove("icone-perfil-ativo");
            document.getElementById("home-icon").children[0].classList.remove("icone-home-ativo");
            break;
        case 'profile':
            elemento.classList.toggle("permahover-profile");
            document.getElementById("notifications-icon").classList.remove("permahover-notifications");
            document.getElementById("notifications-icon").children[0].classList.remove("icone-notificacao-ativo");
            document.getElementById("home-icon").children[0].classList.remove("icone-home-ativo");
            hideOnClickOutside(elemento);
            elemento.children[0].classList.toggle("icone-perfil-ativo");
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
                elemento.children[0].classList.remove("icone-perfil-ativo");
            } else if (elemento.dataset.tipo === 'notifications') {
                elemento.classList.remove("permahover-notifications");
                elemento.children[0].classList.remove("icone-notificacao-ativo");
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
function procurarMenuNavAtivo(retorno) {

    const activeClassName = 'active_menu_nav';

    const menuNavUl = document.getElementById("menu-nav-ul");

    for (let i = 0; i < menuNavUl.children.length; i++) {
        const menuNavLi = menuNavUl.children[i];

        for (let i = 0; i < menuNavLi.children.length; i++) {
            if (menuNavLi.children[i].classList.contains(activeClassName)) {
                if (retorno === 'tipo') {
                    return menuNavLi.children[i].dataset.tipo;
                } else {
                    return menuNavLi.children[i];
                }

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

/*liberando os campos para editar*/
function editarPerfil(element) {
    element.style.display = 'none';

    let editarTrabalho = document.getElementById("perfil-trabalho");
    editarTrabalho.setAttribute("contenteditable", "true");
    editarTrabalho.focus();

    let editarCidade = document.getElementById("perfil-local");
    editarCidade.setAttribute("contenteditable", "true");

    let editarRelacionamento = document.getElementById("perfil-relacionamento");
    editarRelacionamento.setAttribute("contenteditable", "true");

    let editarDataNasc = document.getElementById("perfil-dataNasc");
    editarDataNasc.setAttribute("contenteditable", "true");

    let editarHobbies = document.getElementById("perfil-hobbies");
    editarHobbies.setAttribute("contenteditable", "true");

    let editarTelefone = document.getElementById("perfil-mobile");
    editarTelefone.setAttribute("contenteditable", "true");

    let editarAbout = document.getElementById("perfil-about");
    editarAbout.setAttribute("contenteditable", "true");

    let salvarDados = document.getElementById("perfil-btn-salvar");
    salvarDados.style.display = 'block';
}

/*voltado para o estado inicial depois que salvar*/
function salvandoDadosPerfil(element) {
    element.style.display = 'none';

    let editarPerfil = document.getElementById('edit-profile');
    editarPerfil.style.display = 'block'

    let editarTrabalho = document.getElementById("perfil-trabalho");
    editarTrabalho.setAttribute("contenteditable", "false");
    editarTrabalho.focus();

    let editarCidade = document.getElementById("perfil-local");
    editarCidade.setAttribute("contenteditable", "false");

    let editarRelacionamento = document.getElementById("perfil-relacionamento");
    editarRelacionamento.setAttribute("contenteditable", "false");

    let editarDataNasc = document.getElementById("perfil-dataNasc");
    editarDataNasc.setAttribute("contenteditable", "false");

    let editarHobbies = document.getElementById("perfil-hobbies");
    editarHobbies.setAttribute("contenteditable", "false");

    let editarTelefone = document.getElementById("perfil-mobile");
    editarTelefone.setAttribute("contenteditable", "false");

    let editarAbout = document.getElementById("perfil-about");
    editarAbout.setAttribute("contenteditable", "false");
}