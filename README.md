Planner — Sistema de Gerenciamento e Lembretes
Uma aplicação full stack desenvolvida para organização pessoal e gestão de rotina, permitindo criar, monitorar e gerenciar lembretes de forma simples, eficiente e segura. O projeto conta com arquitetura desacoplada, dividida entre uma API RESTful robusta no backend e uma camada dedicada para a interface frontend.

🎯 Sobre o Projeto
O Planner nasceu da necessidade de centralizar tarefas e compromissos em uma interface direta, combinada com um backend seguro e escalável. O foco principal foi implementar boas práticas de desenvolvimento web moderno: fluxo de autenticação via tokens, separação de responsabilidades (rotas, controladores e middlewares) e persistência de dados estruturada.

Principais Funcionalidades
Autenticação e Segurança: Controle de acesso com JSON Web Tokens (JWT), garantindo que apenas usuários autenticados gerenciem seus próprios lembretes.

Gestão Completa de Lembretes (CRUD): Criação, listagem, atualização e remoção de lembretes e tarefas.

Middlewares Customizados: Interceptadores de requisições para validação de tokens e proteção de rotas restritas.

Modelagem e Consultas Ágeis: Uso do Knex.js como query builder para comunicação flexível e manutenível com o banco de dados.

🛠️ Tecnologias Utilizadas
Backend
Node.js — Ambiente de execução JavaScript no servidor.

Express.js — Framework web minimalista para construção dos endpoints REST.

Knex.js — Query builder SQL para manipulação e estruturação das consultas ao banco de dados.

JSON Web Token (JWT) — Emissão e validação de tokens seguros para autenticação stateless.

Lodash — Utilitários para tratamento e manipulação eficiente de dados.

Frontend
JavaScript / HTML / CSS — Interface de usuário desacoplada (api-frontend), conectada diretamente aos endpoints da API.

🚀 Como Executar o Projeto
Pré-requisitos
Node.js instalado (versão LTS recomendada).

Gerenciador de pacotes npm ou yarn.

Git instalado na máquina.
