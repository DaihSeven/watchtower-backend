# Alterações realizadas na v2:

- Arquivos TipoServico deletados;
- Formatação .services => .service, .router => .routes ;
- Criado o banco de dados PostgreSQL;
- Configurado o arquivo .env com a DATABASE_URL;
- Popular o banco;
- Arrumado controller, service e prisma de /contato, havia informações desconexas;

- BRANCH V1 intacta(não alterar);


### Repositório original: [https://github.com/Gusttavooll/Pessoas_Desaparecidas_Final.git](https://github.com/Gusttavooll/Pessoas_Desaparecidas_Final.git)
### Colaboradores originais:Gustavo Alves de Lima, Nathalia Flores Martins, Luiz Miguel Santos de Jesus, Andrei Santos Moreira, Anna Luiza Pereira de Carvalho.

# API Projeto Final

Esta API é dedicada ao gerenciamento de informações sobre pessoas desaparecidas. Permite registrar ocorrências, visualizar casos, adicionar contatos e registrar avistamentos para auxiliar nas buscas.

## 📚 Documentação Interativa

Acesse a documentação completa e interativa pelo **Swagger** em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🛣️ Rotas Principais

### Pessoas (`/pessoas`)

- **GET `/pessoas`**  
  Lista todas as pessoas desaparecidas cadastradas.

- **POST `/pessoas/cadastrar`**  
  Cadastra uma nova pessoa desaparecida.  
  **Body JSON:**
  ```json
  {
    "nome": "Maria Oliveira",
    "idade": 28,
    "dataDesaparecimento": "2024-05-23T00:00:00.000Z",
    "descricao": "Visto pela última vez no centro.",
    "status": "ATIVO"
  }
  ```

- **PATCH `/pessoas/atualizar/{id}`**  
  Atualiza os dados de uma pessoa desaparecida pelo ID.  
  **Body JSON:** igual ao cadastro.

- **DELETE `/pessoas/deletar/{id}`**  
  Remove uma pessoa desaparecida pelo ID.

---

### Avistamento (`/avistamento`)

- **GET `/avistamento`**  
  Lista todos os avistamentos registrados.

- **POST `/avistamento/cadastrar`**  
  Cadastra um novo avistamento.  
  **Body JSON:**
  ```json
  {
    "idPessoaDesaparecida": 20,
    "comentario": "Visto no centro",
    "localAvistamento": "Recife",
    "latitude": -8.05428,
    "longitude": -34.8813,
    "nomeInformante": "Rafael",
    "contatoInformante": "199-323"
  }
  ```

- **PATCH `/avistamento/atualizar/{id}`**  
  Atualiza um avistamento pelo ID.

- **DELETE `/avistamento/deletar/{id}`**  
  Remove um avistamento pelo ID.

---

### Contato (`/contato`)

- **GET `/contato/listarContatos`**  
  Lista todos os contatos cadastrados.

- **POST `/contato/criarContato`**  
  Cadastra um novo contato.  
  **Body JSON:**
  ```json
  {
    "nome": "João",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "mensagem": "Informação importante"
  }
  ```

- **GET `/contato/buscarContatoPorId/{id}`**  
  Busca um contato pelo ID.

- **PUT `/contato/atualizarContato/{id}`**  
  Atualiza um contato pelo ID.

- **DELETE `/contato/deletarContato/{id}`**  
  Remove um contato pelo ID.

---

### Localização (`/localizacao`)

- **GET `/localizacao`**  
  Lista todas as localizações cadastradas.

- **GET `/localizacao/LocalizacaoById{id}`**  
  Busca uma localização pelo ID.

- **POST `/localizacao/createLocalizacao`**  
  Cadastra uma nova localização.  
  **Body JSON:**
  ```json
  {
    "latitude": -8.05428,
    "longitude": -34.8813,
    "pessoaId": "20"
  }
  ```

- **PUT `/localizacao/updateLocalizacao{id}`**  
  Atualiza uma localização pelo ID.

- **DELETE `/localizacao/deleteLocalizacao{id}`**  
  Remove uma localização pelo ID.

---

### Usuário (`/user`)

- **POST `/user/registrar`**  
  Registra um novo usuário.  
  **Body JSON:**
  ```json
  {
    "nome": "Admin",
    "email": "admin@email.com",
    "senha": "senha123",
    "tipo_usuario": "ADMIN"
  }
  ```

- **POST `/user/login`**  
  Realiza login de usuário.  
  **Body JSON:**
  ```json
  {
    "email": "admin@email.com",
    "senha": "senha123"
  }
  ```

---

## ⚡ Dicas de Uso

- Todas as rotas aceitam e retornam dados em **JSON**.
- Utilize ferramentas como **Postman**, **Insomnia** ou o próprio **Swagger** para testar as rotas.
- Consulte o Swagger para exemplos de requisição e resposta, além de detalhes de cada campo.

---

## 🛠️ Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   node server.js
   ```
3. Acesse o Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📢 Observações

- Certifique-se de preencher todos os campos obrigatórios nas requisições.
- Em caso de erro, verifique o corpo da requisição e consulte o Swagger para detalhes.

---

**Dúvidas? Consulte o Swagger ou abra uma issue!**
