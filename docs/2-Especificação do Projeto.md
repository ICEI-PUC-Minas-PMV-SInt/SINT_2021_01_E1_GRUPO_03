# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

 Fotos            |  Histórias
:-------------------------:|:-------------------------:
![jovem-adulto](https://user-images.githubusercontent.com/4424108/114316957-1aff9a80-9b06-11eb-9d4e-242e23996415.jpeg) |  Rodrigo Martins tem 25 anos, recem formado em engenharia, solteiro e mora sozinho,adora conhecer gente nova e fazer amizades. Gosta de participar de eventos que reúnam pessoas jovens do seu bairro.
![jovem-estudante](https://user-images.githubusercontent.com/4424108/114316891-daa01c80-9b05-11eb-8fac-e7ca053e653b.jpeg)|Ana Carolina Yamamoto tem 18 anos, é estudante e acabou de passar no curso de direito de uma universidade federal,mora com os pais mas irá mudar para outra cidade para fazer seu curso de direito, está pesquisando bairros seguros e pessoas com quem possa dividir apartamentos.
![professora](https://user-images.githubusercontent.com/4424108/114316907-ebe92900-9b05-11eb-9fc9-67ef39003a1e.jpeg) | Silvana da Costa tem 35 anos, divorciada, tem 2 filhas adolescentes, trabalha como professora em uma universidade e dá aulas no periodo noturno. Como ela chega tarde em casa , sempre está preocupada com a segurança do seu bairro e de suas filhas que ficam sozinhas.
![senhora](https://user-images.githubusercontent.com/4424108/114316919-f99eae80-9b05-11eb-8339-a4962a78fb0a.jpeg)|Maria Francisca da Silva Soares tem 63 anos, é aposentada, tem 3 filhos adultos mas atualmente mora somente com o marido, é extrovertida e super antenada, sempre quer saber de tudo que acontece ao seu redor e por isso adora saber de todas as noticias que acontecem no seu bairro.
![comerciante](https://user-images.githubusercontent.com/4424108/114316946-0d4a1500-9b06-11eb-9ecd-e8c6f33e09bc.jpeg) | José da Silva Neves tem 45 anos, casado e tem um pequeno mercado local. Pensa em expandir o seu negocio porem precisa encontrar alguma forma de divulgar o seu estabelecimento. Começou a utilizar grupos do whatsApp apenas possuia alguns vizinhos. Agora ele está buscando uma forma mais efetiva onde ele possa divulgar o seu estabelecimento por todo o bairro.
![introvertido](https://user-images.githubusercontent.com/4424108/114317074-a1b47780-9b06-11eb-91fe-3734067e8541.jpeg) | Henrique Fernandes De Mello tem 40 anos, trabalha como motorista de ônibus, casado, tem 3 filhos. Ele é uma pessoa introvertida, além disso sempre chega em casa tarde e cansado, por isso não socializa com seus vizinhos, mas adoraria ficar por dentro sobre o que está acontecendo em seu bairro.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Poder fazer um post                      |Compartilhar , solicitar ou fornecer Informações.            |
|Usuário do sistema  | Avaliar bairro                     | Expressar minha opinião sobre aquele local.       |
|Usuário do sistema  | Comentar Posts                     | Interagir com os outros usuários.               |              |
|Usuário do sistema  | Pesquisar / Visualizar outros bairros          |Verificar o que as pessoas andam falando em outros bairros.              |
|Usuário do sistema  | Mudar de bairro                    | Começar a interagir com os novos vizinhos.             |
|Usuário do sistema  | Denunciar post                     | Posts que não sao relevantes ou que me desrespeite de alguma forma.              |
|Usuário do sistema  | Receber notificações                    | Ser notificado sobre os posts que eu desejo acompanhar.             |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001 |Permitir que o usuário se cadastre | ALTA | 
|RF-002 |Permitir que o usuário faça login | ALTA |
|RF-003 |Permitir ao usuário realizar um Post | ALTA | 
|RF-004 |Permitir que o usuário comente em Posts | ALTA |
|RF-005 |Permitir que o usuário avalie o bairro | ALTA |
|RF-006 |Permitir ao usuário visualizar uma lista com todas a notificações | MÉDIA |
|RF-007 |Permitir ao usuário visualizar outros bairros | ALTA |
|RF-008 |Permitir ao usuário mudar de bairro | ALTA |
|RF-009 |Permitir ao usuário denunciar um Post | Baixa |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Depois de uma postagem pela interface da web (veja RF-003), ela estará disponível nas listas de postagens de outros usuários. |  ALTA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre. |
|02| Não pode ser desenvolvido um módulo de backend.        |
|03| O usuário  deve fornecer um comprovante de residência para se cadastrar.    |
|04| O usuário  deve fornecer um comprovante de residência para mudar de bairro.    |
|05| O usuário  deve pertencer ao bairro para comentar nos Posts.   |
|06| O usuário  deve pertencer ao bairro para avaliar.   |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
