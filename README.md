# 📌 blog-app
Este repositório foi criado com o intúito da criação de um blog mobile em que professores possam postar, editar e remover atividades, avisos e outros para seus alunos e para que os alunos possam ter uma comunicação mais fluida com os temas que acontecem em sua sala de aula e escola.

# 📌 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Setup Inicial](#setup-inicial)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Guia de Uso](#guia-de-uso)

## Sobre o Projeto
A aplicação criada tem funções como:
- Autenticação para professores e alunos
- Pagina para criação e modificação de usuarios de Professoes e Alunos
- Página inicial com posts publicados
- Leitura de posts
- Postagem, remoção e deleção de posts (Apenas para professores)

Foi criada para o quarto tech challenge que nos dá como objetivo uma construção de um aplicativo para um blog que possa auxiliar alunos e professores nas postagens feitas.

## Tecnologias Utilizadas
As tecnologias usadas no front-end foram: React Native e javascript

## Setup Inicial
Passo a passo para rodar o projeto front-end localmente:

- Clone os repositórios:
```bash
git clone https://github.com/souleandromachado/blog-mobile
```

- Acesse a pasta dos projetos (separadamente):
```bash
cd nome-do-projeto
```

- Instale as dependências em ambos os repositórios:
```bash
npm i
```

- Feito isso, ultilize o comando:
```bash
npx expo start
```
- Nescessita ter instalado no Celular o Aplicativo Expo Go
- Assim, com o QR Code carregado, acesse com o seu celular utilizando o Expo Go (Android) ou The Camera App (Iphone).
  
## Arquitetura da Aplicação
📂 src/
┣ 📂 assets/ → Imagens contidas no projeto 
┣ 📂 android/ → Componentes reutilizáveis
┣ 📂 screens/ → Pastas do projeto contendo as páginas do site
┣ 📂 services/ → Conexão com a API
┗ 📜 App.js → Componente principal

## Guia de Uso

Para o Aluno: 

- Lista com todos os posts feitos pelos Professores
- Botão para fazerem o cadastro no blog
- Botão para terem a lista de alunos que possuem cadastro
- Acesso aos detalhes dos posts

Para o professor:

- Lista com todos os posts feitos pelos Professores
- Acesso aos detalhes dos posts
- Botão para cadastro de novos professores
- Botão para terem a lista de professores que possuem cadastro
- Botão para criação de post
- Botão para administração de posts
  
Para poder acessar a tela de professores, se autentique com o seguinte cadastro:
E-mail: testesfiap3fsdt@gmail.com
senha: 1234
