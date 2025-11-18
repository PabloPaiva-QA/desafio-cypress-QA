🧪 Desafio Cypress QA - Pablo Paiva

Este repositório contém a automação desenvolvida para o desafio prático de testes automatizados utilizando Cypress.

O objetivo é demonstrar a criação de cenários reutilizáveis em um ambiente de e-commerce, utilizando boas práticas de estruturação, comandos customizados e integração contínua via GitHub Actions.

🚀 Tecnologias Utilizadas
- Node.js
- Cypress
- JavaScript
- GitHub Actions (CI/CD)

📦 Instalação do Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/desafio-cypress-QA.git

2️⃣ Acessar a pasta do projeto
cd desafio-cypress-QA

3️⃣ Instalar dependências
npm install

▶️ Como executar os testes
📌 Rodar testes no modo interativo
npx cypress open

📌 Rodar testes no modo headless (terminal)
npx cypress run

📝 Cenários Automatizados

Login
- Log in com e-mail válido e senha
Valida que o usuário consegue logar com e-mail e senha corretos, garantindo que o fluxo de autenticação funcione para a maioria dos usuários.
- Log in com nome de usuário válido e senha
Testa login com o nome de usuário, cobrindo outro método comum de autenticação.
- Log in com credenciais inválidas
Garante que o sistema trata erros corretamente e que mensagens de feedback são exibidas, prevenindo problemas de segurança ou confusão do usuário.
- Log in sem credenciais
Verifica validação de formulário, assegurando que campos obrigatórios são tratados corretamente.

Motivo da escolha: O login é uma funcionalidade crítica e reutilizável, pois qualquer fluxo de compra ou ação personalizada depende do usuário estar autenticado. Testar todas as variações garante estabilidade e cobertura completa do processo de autenticação.

Carrinho
- Adicionar um produto ao carrinho
Testa a adição básica de produto, garantindo que o usuário consiga iniciar o processo de compra.
- Adicionar dois produtos iguais ao carrinho
Valida que a quantidade é contabilizada corretamente, prevenindo erros em compras múltiplas do mesmo item.
- Adicionar dois produtos diferentes ao carrinho
Garante que múltiplos produtos possam ser combinados sem conflito, simulando situações reais de compra.
- Adicionar produto fora de estoque
Testa mensagens de erro e controle de estoque, evitando problemas de experiência do usuário e pedidos impossíveis.
- Visualizar conteúdo do carrinho
Assegura que os produtos adicionados sejam exibidos corretamente, verificando integridade visual e funcional.
- Remover um produto do carrinho
Testa a remoção simples, garantindo atualização correta do carrinho e feedback visual.
- Remover todos os produtos do carrinho
Valida exclusão completa de itens, útil para preparar o carrinho para novos testes e evitar dados persistentes.
- Remover um item quando há múltiplos da mesma unidade
Testa a atualização parcial de quantidade, refletindo comportamento real de usuários que alteram pedidos.
- Aplicar cupom válido
Valida aplicação de descontos, fluxo de promoções e mensagens de sucesso, essencial para testes de campanhas de marketing.
- Aplicar cupom inválido
Garante que o sistema trata cupons inexistentes corretamente, prevenindo inconsistências no checkout.

Motivo da escolha: O carrinho é o núcleo do fluxo de compras e suas funcionalidades são amplamente reutilizáveis em vários cenários, como checkout, promoções e gestão de estoque. Automatizar esses testes garante confiabilidade no processo de compra e permite reutilização em múltiplos fluxos de e-commerce.

⚙️ Estrutura do Projeto
.github/
 ├── workflows
 │   ├── ci.yml
cypress/
 ├── e2e/
 │   └── cart.cy.js
 │   └── login.cy.js
 ├── fixtures/
 │   ├── account.json
 ├── support/
 │   ├── commands.js
 │   └── e2e.js
cypress.config.js
jsconfig.json
package-lock.json
package.json

🔄 Integração Contínua (CI/CD) com GitHub Actions
- O repositório está configurado para rodar os testes automaticamente sempre que houver um push.
- Arquivo de workflow: .github/workflows/cypress.yml
- Isso garante que todos os testes sejam executados e validados antes de qualquer merge ou atualização do código.