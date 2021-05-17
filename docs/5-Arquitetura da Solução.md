# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de componentes

![image](https://user-images.githubusercontent.com/4424108/118363485-cb910c00-b594-11eb-8069-a7559872e47f.png)


A solução implementada conta com os seguintes módulos:

- **Browser** - Interface básica do sistema
- **Heroku (Hospedagem)** - local na Internet onde as páginas são mantidas e acessadas pelo navegador.
- **Páginas Web** - Conjunto de arquivos HTML, CSS, JavaScript e imagens que implementam as funcionalidades do sistema.
- **Session Storage** - Armazenamento permanece disponível enquanto há uma sessão aberta no navegador
  - **detalhes do usuário** - Informações do usuário logado
  - **sessão** - Sessão gerada para o usuário.
- **Local Storage** - armazenamento mantido no Navegador, onde são implementados bancos de dados baseados em JSON. São eles:
  - **Usuários** - Usuários cadastrados
  - **Comentários** - registro de posts dos usuários.



![UserFlow](https://user-images.githubusercontent.com/63205222/118548184-4ce5cb80-b75a-11eb-9121-ad4dac86385c.jpeg)



## Tecnologias Utilizadas

Para desenvolvimento será utilizado as seguintes ferramentas e linguagens:

Ide
- **Jetbrains Webstorm**
- **Visual studio code**

Ferramentas
- **Figma**
- **Whimsical**

Linguagem
- **Javascript ecmascript 6**

Linguagem de marcação
- **HTML5**

Linguagem de folha de estilo
- **CSS3**

Framework
- **Bootstrap 5**

Api
- **https://viacep.com.br/ws/${cep}/json/**

![Fluxo de login](https://user-images.githubusercontent.com/63205222/117725167-0d146680-b1e5-11eb-93bb-d0168c7c1171.jpeg)


## Hospedagem

Foram criados 2 apps no Heroku onde um está associado a branch staging e a outra associada a branch master ambas com deploy automáticos. 
