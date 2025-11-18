# Desafio Cypress QA

Este repositório contém a automação desenvolvida para o desafio prático de testes automatizados utilizando Cypress.

O objetivo é demonstrar a criação de cenários reutilizáveis em um ambiente de e-commerce, utilizando boas práticas de estruturação, comandos customizados e integração contínua via GitHub Actions.

---

## 📚 Sumário

* [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [📁 Estrutura do Projeto](#-estrutura-do-projeto)
* [⚙️ Como instalar as dependências](#️-como-instalar-as-dependências)
* [▶️ Como rodar os testes](#️-como-rodar-os-testes)
* [🧪 Cenários Automatizados](#-cenários-automatizados)
  * [Login (`login.cy.js`)](#login-logincyjs)
  * [Carrinho (`cart.cy.js`)](#carrinho-cartcyjs)
* [🧩 Comandos Personalizados](#-comandos-personalizados)
* [Autor](#autor)

---
## 🛠️ Tecnologias Utilizadas
* Node.js
* Cypress 15.6.0
* JavaScript
* GitHub Actions (CI)


---
## 📁 Estrutura do Projeto

```
desafio-cypress-QA/
 ├── .github/workflows/
 │    └── ci.yml
 ├── cypress/
 │    ├── e2e/
 │    │    ├── cart.cy.js
 │    │    └── login.cy.js
 │    ├── fixtures/
 │    │    └── accounts.json
 │    ├── support/
 │    │    ├── commands.js
 │    │    └── e2e.js
 ├── cypress.config.js
 ├── jsconfig.json
 ├── package.json
 └── README.md
```

---
## ⚙️ Como instalar as dependências
1. Certifique-se de ter Node.js instalado. Caso não tenha, você pode instalar através do site oficial: https://nodejs.org/.
   **Recomendação de versão:**
   - Para rodar localmente: Node.js 20 ou superior já é suficiente.
   - Para rodar os testes no GitHub Actions: este projeto utiliza Node.js 24, garantindo compatibilidade total com o Cypress mais recente e evitando erros relacionados ao ambiente de execução
2. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/desafio-cypress-QA.git
```

3. Acesse o diretório do projeto:
```bash
cd desafio-cypress-QA
```

4. Instale as dependências:
```bash
npm install
```

---
## ▶️ Como rodar os testes

### **Modo Interativo (GUI do Cypress)**

```bash
npx cypress open
```

### **Modo Headless (Terminal)**

```bash
npx cypress run
```

### **Via GitHub Actions (Workflow Dispatch)**

É possível executar os testes diretamente pelo GitHub Actions através da opção **Run workflow**.

📌 **Atenção:** Por padrão, apenas colaboradores com permissão de escrita podem executar manualmente workflows do tipo *workflow_dispatch*. Usuários externos não têm permissão de rodar workflows manualmente em repositórios públicos.

Isso significa que **somente o autor ou colaboradores podem rodar o workflow pelo GitHub Actions**.

---
## 🧪 Cenários Automatizados
Os testes foram desenvolvidos com foco em **cobertura funcional**, **clareza** e **reutilização** através de comandos personalizados.

A seguir, cada cenário é listado com sua descrição e motivo.

---
### Login (`login.cy.js`)
A funcionalidade de login foi escolhida por ser uma das principais portas de entrada para áreas restritas do sistema. Testar diferentes variações garante a confiabilidade do fluxo de autenticação.

#### 🔎 **Motivo da escolha**
* É essencial para acessar páginas protegidas.
* Erros de autenticação impactam diretamente o usuário.
* Permite validar diferentes tipos de credenciais.
* É facilmente reaproveitável em outros testes futuros.

#### ✅ **Cenários de Teste**
**1. Login com e-mail válido e senha válida**

Garante que o usuário consiga acessar sua conta usando o e-mail cadastrado.

**2. Login com username válido e senha válida**

Valida a possibilidade de autenticação alternativa via nome de usuário.

**3. Tentativa de login com credenciais inválidas**

Confirma que o sistema exibe mensagens adequadas de erro e não autentica usuários inválidos.

**4. Login sem informar credenciais**

Verifica a obrigatoriedade dos campos e o comportamento do sistema ao tentar logar sem dados.

---
### Carrinho (`cart.cy.js`)
O carrinho foi escolhido por representar a principal funcionalidade de um e-commerce e por permitir uma variedade grande de cenários de teste.

#### 🔎 **Motivo da escolha**
* É uma parte crítica do processo de compra.
* Permite testar fluxos variados e ricos em UI.
* Envolve validações importantes (quantidade, estoque, cupons, remoção etc.).
* Funcionalidade altamente reutilizável para futuros testes.

#### ✅ **Cenários de Teste**
**1. Adicionar um produto ao carrinho**

Garante que o fluxo básico de adição funciona corretamente.

**2. Adicionar dois produtos iguais**

Valida a contagem acumulada e a mensagem exibida.

**3. Adicionar dois produtos diferentes**

Confirma que múltiplos itens distintos podem coexistir.

**4. Adicionar produto indisponível**

Checa se o sistema exibe a alerta correto para itens fora de estoque.

**5. Visualizar conteúdo do carrinho**

Valida a navegação e conferência dos itens adicionados.

**6. Remover um item do carrinho**

Garante que a remoção simples funciona e mensagens são exibidas.

**7. Remover todos os itens do carrinho**

Testa a função recursiva customizada para limpeza total.

**8. Diminuir quantidade quando há vários itens iguais**

Valida se o botão de diminuir quantidade atualiza corretamente o item.

**9. Aplicar cupom válido**

Simula aplicação de cupom com resultado de sucesso.

**10. Aplicar cupom inválido**

Certifica que o sistema rejeita códigos inexistentes.

**11. Atualizar carrinho com quantidade maior que zero**

Valida se o botão "Atualizar" efetivamente atualiza o carrinho.

**12. Atualizar carrinho com quantidade zero**

O item deve ser removido e o carrinho ficar vazio.

**13. Atualizar carrinho com quantidade negativa**

Garante que o alerta do sistema seja acionado corretamente.

---
## 🧩 Comandos Personalizados

Local: `cypress/support/commands.js`

Incluem:

* `cy.login()` – fluxo de login completo
* `cy.goToCartPage()` – navegação direta
* `cy.addAndCheckProductToCart()` – adiciona e valida produtos
* `cy.unavailableProducts()` – valida mensagens de indisponibilidade
* `cy.deleteAllProducts()` – limpa o carrinho recursivamente

Esses comandos foram criados para:

* Reduzir repetição de código
* Facilitar manutenção
* Melhorar a leitura dos testes

---
## Autor
**Pablo Paiva**
