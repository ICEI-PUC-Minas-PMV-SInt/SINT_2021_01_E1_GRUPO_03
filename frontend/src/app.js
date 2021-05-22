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
            location.reload();
        } else {
            alert('Usuário ou Senha incorreto')
        }
    } else {
        alert('Usuário não encontrado , por favor se cadastre!')
    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

/**
 * Cadastra usuario e ativa sessao.
 * @param form formulario de cadastro
 */
function registro(form) {

    if (form.email.value === '' || form.email.value === '') {
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
}

/**
 *
 * @param userParam
 * @param tipoUsuario
 */
function userSession(userParam, tipoUsuario) {

    if (tipoUsuario === novoUsuario) {
        sessionStorage.setItem("loggedUser", JSON.stringify(userParam))
    }
    else {
        const users = JSON.parse(localStorage.getItem('users'))
        for (let user of users) {
            if (user.email === userParam) {
                sessionStorage.setItem("loggedUser", JSON.stringify(user))
            }
        }
    }
}

/* Utils */

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}