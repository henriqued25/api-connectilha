# api-connectilha

[![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen.svg?style=flat-square)](#)
[![Linguagem](https://img.shields.io/badge/language-Node.js-green.svg?style=flat-square)](#)
[![Framework](https://img.shields.io/badge/framework-Express-blue.svg?style=flat-square)](#)
[![Banco de Dados](https://img.shields.io/badge/database-MySQL-blueviolet.svg?style=flat-square)](#)

## Descrição

Esta API back-end foi desenvolvida para receber e armazenar feedback dos usuários sobre o sistema de transporte coletivo. Permite a coleta de informações detalhadas sobre problemas enfrentados, avaliações da viagem e da segurança, além de sugestões de melhoria. Os dados são persistidos em um banco de dados MySQL para análise e potencial otimização dos serviços.

## Tecnologias Utilizadas

  * Node.js 
  * Express.js 
  * MySQL

## Pré-requisitos

Certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:

  * [Node.js](https://nodejs.org/)
  * [NPM](https://www.npmjs.com/) (geralmente instalado com Node.js)
  * [MySQL](https://www.mysql.com/) (servidor local ou acesso a um servidor remoto)

## Instalação

Siga estes passos para configurar a API localmente:

1.  Clone o repositório do projeto back-end:
    ```bash
    https://github.com/henriqued25/api-connectilha
    ```

2.  Instale as dependências utilizando o NPM:
    ```bash
    npm install
    ```
    Ou, se preferir, utilize o Yarn:
    ```bash
    yarn install
    ```

3.  Configure as variáveis de ambiente:
    * Crie um arquivo `.env` na raiz do projeto.
    * Adicione as seguintes variáveis de ambiente, substituindo os valores pelos seus:
      ```env
      DB_HOST=localhost
      DB_USER=seu_usuario_mysql
      DB_PASSWORD=sua_senha_mysql
      DB_NAME=connectilha_feedback
      DB_PORT=3306 # Porta padrão do MySQL
      ```
    * **Importante:** O arquivo `.env` não deve ser versionado. Certifique-se de que ele está adicionado ao seu `.gitignore`.

## Execução

Para iniciar o servidor da API localmente, execute o seguinte comando no terminal:

```bash
npm run start
```

Este comando irá executar o script de inicialização definido no seu arquivo `package.json`. Geralmente, este script inicia o servidor da API.

Se você precisar executar o servidor diretamente, tente o seguinte comando:

```bash
node src/app.js
```

A API estará rodando na porta especificada na variável de ambiente `PORT` (por padrão, `http://localhost:3000`). Certifique-se de que o seu banco de dados MySQL esteja rodando e configurado corretamente antes de iniciar a API.

## Endpoints da API

A seguir estão os endpoints disponíveis na API de Feedback do Connectilha:

### 1. Enviar Novo Feedback (`POST /api/feedback`)

Este endpoint permite que os usuários enviem feedback sobre suas experiências com o sistema de transporte público.

O corpo da requisição deve ser um objeto JSON com os seguintes campos:

* `bus_number` (string, obrigatório): Número de identificação do ônibus.
* `bus_line` (string, obrigatório): Código ou nome da linha do ônibus.
* `excessive_delay` (boolean): Indica se houve um atraso significativo (`true` para sim, `false` para não).
* `bus_overcrowded` (boolean): Indica se o ônibus estava superlotado (`true` para sim, `false` para não).
* `lack_of_accessibility` (boolean): Indica problemas de acessibilidade (`true` para sim, `false` para não).
* `air_conditioning_broken` (boolean): Indica se o ar condicionado estava quebrado (`true` para sim, `false` para não).
* `driver_misconduct` (boolean): Indica se houve má conduta do motorista (`true` para sim, `false` para não).
* `route_change` (boolean): Indica se houve mudança de rota inesperada (`true` para sim, `false` para não).
* `vehicle_poor_condition` (boolean): Indica se há problemas com a condição do veículo (`true` para sim, `false` para não).
* `comment` (string): Comentários adicionais do usuário.
* `boarding_point` (string): Local de embarque do usuário.
* `occurrence_location` (string): Local específico onde ocorreu o problema, se relevante.
* `overall_rating` (number, obrigatório): Avaliação geral da experiência (ex: 1 a 5).
* `safety_rating` (number, obrigatório): Avaliação da segurança durante a viagem (ex: 1 a 5).
* `improvement_suggestions` (string): Sugestões de melhoria.

**Exemplo de Requisição (JSON):**

```json
{
  "bus_number": "MA-T057",
  "bus_line": "T058 Vila Embratel / Rodoviária",
  "excessive_delay": true,
  "bus_overcrowded": true,
  "lack_of_accessibility": true,
  "air_conditioning_broken": false,
  "driver_misconduct": true,
  "route_change": false,
  "vehicle_poor_condition": true,
  "comment": "Ônibus muito cheio e demorou bastante para sair do ponto.",
  "boarding_point": "Terminal da Praia Grande",
  "occurrence_location": "Avenida Beira Mar, próximo ao Palácio dos Leões.",
  "overall_rating": 2,
  "safety_rating": 3,
  "improvement_suggestions": "Precisam de mais ônibus nessa linha nos horários de pico e fiscalizar o uso do celular por motoristas."
}
```

**Respostas:**

* **`201 Created`**: Feedback enviado com sucesso. Corpo da resposta (JSON):
    ```json
    {
      "message": "Feedback enviado com sucesso!",
      "feedbackId": 10
    }
    ```

### 2. Listar Feedbacks (`GET /api/feedback`)

Este endpoint permite recuperar todos os feedbacks registrados.

**Respostas:**

* **`200 OK`**: Uma lista de feedbacks é retornada no corpo da resposta como um array de objetos JSON. Exemplo:
    ```json
    [
      {
        "id_feedback": 11,
        "bus_number": "MA-T057",
        "bus_line": "T058 Vila Embratel / Rodoviária",
        "excessive_delay": true,
        "bus_overcrowded": true,
        "lack_of_accessibility": true,
        "air_conditioning_broken": false,
        "driver_misconduct": true,
        "route_change": null,
        "vehicle_poor_condition": true,
        "comment": "Ônibus muito cheio e demorou bastante para sair do ponto.",
        "boarding_point": "Terminal da Praia Grande",
        "occurrence_location": "Avenida Beira Mar, próximo ao Palácio dos Leões.",
        "submission_datetime": "2025-05-14T23:18:22.000Z",
        "overall_rating": 2,
        "safety_rating": 3,
        "improvement_suggestions": "Precisam de mais ônibus nessa linha nos horários de pico e fiscalizar o uso do celular por motoristas."
      }
    ]
    ```

### 3. Excluir Feedback por ID (`DELETE /api/feedback/:id`)

Este endpoint permite excluir um feedback específico com base no seu identificador único (`id`). 
O `id` do feedback a ser excluído deve ser fornecido como um parâmetro de path na URL. (substitua `:id` pelo ID real).

**Parâmetro de Path:**

* `id`: O ID único do feedback que será excluído (ex: `/api/feedback/10`).

**Respostas:**

* **`200 OK`**: O feedback com o ID fornecido foi excluído com sucesso. O corpo da resposta conterá uma mensagem de sucesso, incluindo o ID excluído. `{"message": "Feedback com ID 10 excluído com sucesso"}`).

## Links Úteis

* **Link da API (Produção):** [https://api-connectilha.onrender.com/api/feedback](https://api-connectilha.onrender.com/api/feedback)
* **Documentação da API (Postman):** [https://documenter.getpostman.com/view/44968162/2sB2qUoQNS](https://documenter.getpostman.com/view/44968162/2sB2qUoQNS)
