## 💼 Desafio Backend: Sistema de Pedidos (Order Management API)

### 🎯 **Objetivo**

Desenvolver uma API RESTful para gerenciar produtos, clientes e pedidos de uma loja fictícia. A aplicação deve permitir o cadastro, consulta e atualização dessas entidades, além de relacionar pedidos com seus respectivos produtos e clientes.

---

### 📚 **Requisitos Funcionais**

#### 📦 Produtos

* Criar, listar, atualizar e remover produtos
* Cada produto deve ter:

  * `id`
  * `nome`
  * `preço`
  * `estoque`

#### 👤 Clientes

* Criar, listar, atualizar e remover clientes
* Cada cliente deve ter:

  * `id`
  * `nome`
  * `telefone`

#### 🧾 Pedidos

* Criar, listar e atualizar pedidos
* Cada pedido deve conter:

  * `id`
  * `cliente_id`
  * Lista de `produtos` (com `produto_id` e `quantidade`)
  * `valor_total` calculado automaticamente
  * `data_criacao`

---

### 💾 **Requisitos Técnicos**

* API RESTful
* As requisições deve funcionar corretamente
* Salvar os dados em um Banco de dados relacional (PostgreSQL, MySQL ou SQLite)
* Relacionamentos entre tabelas (cliente → pedidos, pedido → produtos)
* Código organizado e de fácil entendimento
* Instruções de como executar o projeto no README
* A API pode ser feita em Node([express](https://expressjs.com)),Node([Nest.js](https://nestjs.com/)) ou [Go](https://go.dev/)

---

### ⭐ **Extras Opcionais**

* Filtro por cliente nos pedidos
* Paginação na listagem de pedidos
* Documentação Swagger/OpenAPI

---

### ⏱️ **Prazo**

Você tem até segunda, dia 2 de junho, às 23:59 para entregar o projeto.

---

### 📦 **Entrega**

Para entregar o projeto, basta fazer um fork deste repositório que iremos analisar sua solução!
