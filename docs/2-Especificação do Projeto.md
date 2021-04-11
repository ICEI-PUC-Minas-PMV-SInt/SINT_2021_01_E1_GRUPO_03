# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Ana Carolina Yamamoto tem 18 anos, é estudante e acabou de passar no curso de direito de uma universidade federal,mora com os pais mas irá mudar para outra cidade para fazer seu curso de direito, está pesquisando bairros seguros e pessoas com quem possa dividir apartamentos. 



Rodrigo Martins tem 25 anos, recem formado em engenharia, solteiro e mora sozinho,adora conhecer gente nova e fazer amizades. Gosta de participar de eventos que reúnam pessoas jovens do seu bairro.

Silvana da Costa tem 35 anos, divorciada com 2 filhas adolescentes, trabalha como professora em uma universidade e dá aulas no periodo noturno. Como ela chega tarde em casa , sempre está preocupada com a segurança do seu bairro e de suas filhas que ficam sozinhas.

Maria Francisca da Silva soares tem 63 anos, é aposentada, tem 3 filhos adultos mas atualmente mora somente com o marido, é extrovertida e super antenada, sempre quer saber de tudo que acontece ao seu redor e por isso adora saber de todas as noticias que acontecem no seu bairro.

José da silva Neves tem 45 anos, casado e tem um pequeno mercado local. Pensa em expandir o seu negocio porem precisa encontrar alguma forma de divulgar o seu estabelecimento. Começou a utilizar grupos do whatsApp apenas possuia alguns vizinhos. Agora ele está buscando uma forma mais efetiva onde ele possa divulgar o seu estabelecimento por todo o bairro.


Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Poder fazer um post                      |Compartilhar , solicitar ou fornecer Informações            |
|Usuário do sistema  | Avaliar bairro                     | Expressar minha opinião sobre aquele local       |
|Usuário do sistema  | Comentar Posts                     | Interagir com os outros usuários.               |              |
|Usuário do sistema  | Pesquisar / Visualizar outros bairros          |Verificar o que as pessoas andam falando em outros bairros.              |
|Usuário do sistema  | Mudar de bairro                    | Comecar a interagir com os novos vizinhos.             |
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
|RNF-002| Depois uma postagem pela interface da web (veja RF-003), ela estará disponível nas listas de postagens de outros usuários. |  ALTA | 

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
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| O usuário  deve fornecer um comprovante de residência para se cadastrar    |
|04| O usuário  deve fornecer um comprovante de residência para mudar de bairro    |
|05| O usuário  deve pertencer ao bairro para comentar nos Posts.   |
|06| O usuário  deve pertencer ao bairro para avaliar.   |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
