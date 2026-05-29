# AproveiEnem-2.0
# Documentação Técnica — Projeto AproveiEnem

## 1. Dependências utilizadas no pom.xml

O projeto foi desenvolvido utilizando Spring Boot e MySQL. As principais dependências utilizadas foram:

* Spring Boot Starter Web
* Spring Boot Starter Data JPA
* MySQL Connector
* Spring Boot DevTools
* Lombok (caso utilizado)
* Spring Boot Starter Test

Tecnologias utilizadas:

* Java
* Spring Boot
* MySQL
* HTML5
* CSS3
* JavaScript

---

# 2. Endpoints / APIs criadas

## API de Eventos

### Listar eventos

Método: GET

```http
/evento
```

Responsável por listar todos os eventos cadastrados no banco de dados.

---

### Salvar evento

Método: POST

```http
/evento
```

Responsável por cadastrar um novo evento no calendário.

Exemplo JSON:

```json
{
  "titulo": "Estudar Matemática",
  "horario": "08:00 AM - 10:00 AM",
  "dia": 20,
  "mes": 5,
  "ano": 2026
}
```

---

### Atualizar evento

Método: PUT

```http
/evento/{id}
```

Responsável por atualizar os dados de um evento existente.

---

### Deletar evento

Método: DELETE

```http
/evento/{id}
```

Responsável por remover um evento do banco de dados.

---

# 3. Nome das tabelas do banco

Tabela principal utilizada:

* evento

---

# 4. Estrutura do banco de dados

## Tabela: evento

| Campo   | Tipo    |
| ------- | ------- |
| id      | BIGINT  |
| titulo  | VARCHAR |
| horario | VARCHAR |
| dia     | INT     |
| mes     | INT     |
| ano     | INT     |

A tabela foi utilizada para armazenar os eventos cadastrados no calendário da aplicação.

---

# 5. Páginas/Telas existentes

O sistema possui as seguintes telas:

* Tela principal (Início)
* Tela de matérias
* Tela de calendário
* Tela de questões
* Tela de configurações
* Tela de login

---

# 6. Como executar o projeto localmente

## Requisitos

* Java JDK instalado
* MySQL instalado
* IntelliJ IDEA ou VSCode
* Maven

## Passos

1. Clonar o projeto.
2. Abrir no IntelliJ IDEA.
3. Configurar o banco MySQL.
4. Criar o banco de dados utilizado pela aplicação.
5. Atualizar usuário e senha do MySQL no arquivo:

```properties
application.properties
```

6. Executar a aplicação Spring Boot.
7. Abrir o navegador e acessar:

```http
http://localhost:8080
```

---

# 7. GitHub

O projeto ainda não foi publicado no GitHub.

---

# 8. Testes realizados

Foram realizados testes funcionais manuais para verificar:

* Cadastro de eventos
* Listagem de eventos
* Exclusão de eventos
* Atualização de eventos
* Integração entre Front-End e Back-End
* Conexão com banco de dados MySQL

Também foram realizados testes de responsividade e navegação da interface.

---

# 9. Dificuldades e desafios enfrentados

Durante o desenvolvimento do projeto, alguns desafios foram encontrados:

* Integração entre Front-End e Spring Boot
* Configuração da conexão com MySQL
* Manipulação de eventos no calendário
* Implementação do CRUD completo
* Correção de erros de rotas e APIs
* Organização da estrutura do projeto utilizando Controllers, Services e Repositories
* Ajustes de responsividade da interface
* Implementação da atualização dinâmica dos eventos sem recarregar manualmente a página

Apesar das dificuldades, o projeto foi concluído com sucesso e permitiu aplicar os conceitos estudados na disciplina de Tecnologia Web.
