## Desenvolvimento Full Stack II

Atividade G1 - Criando uma API

Nome: Flamarion Fagundes Pinto

### Como executar o projeto?

Instalar as dependências

```bash
npm install
```

Criar as tabelas necessárias

```bash
npm run migrate
```

Executar o servidor de desenvolvimento

```bash
npm run dev
```

Executar o código de produção

```bash
npm run build

&&

npm start
```

### Observações:

Optei por utilizar o Bruno Client no lugar do Postman principalmente por conta do versionamento dos endpoints, o que facilita bastante na organização e manutenção durante o desenvolvimento da API. Para a validação dos dados enviados nos payloads, escolhi utilizar o Zod, que além de permitir uma validação inicial do formato dos campos, também oferece integração com o TypeScript por meio de tipagem autoinferida, o que torna o processo mais fluido e seguro.

Falando em TypeScript, escolhi essa linguagem justamente por proporcionar mais confiabilidade no desenvolvimento, principalmente no que diz respeito à tipagem dos DTOs e uso de interfaces. Isso me permitiu estruturar o código de forma mais clara e segura, inclusive implementando classes a partir dessas interfaces. Para facilitar o ambiente de desenvolvimento e o processo de build, utilizei o ts-node-dev para rodar o servidor localmente e o tsup para gerar o build final do projeto.

Em relação à estrutura do sistema, adotei uma arquitetura em camadas, buscando seguir alguns princípios do SOLID. Um ponto que vale destacar é a camada de repositório, onde os serviços não têm conhecimento direto da infraestrutura externa, como o banco de dados. Eles interagem apenas com interfaces, o que facilita possíveis futuras trocas de tecnologia sem impactar a lógica de negócio. Para esta atividade em específico, implementei a camada de persistência utilizando SQLite, conforme solicitado.

Por fim, criei um sistema simples para controle de migrations, com o objetivo de facilitar a criação e manutenção das tabelas necessárias para o funcionamento da aplicação.Optei por utilizar o Bruno Client no lugar do Postman principalmente por conta do versionamento dos endpoints, o que facilita bastante na organização e manutenção durante o desenvolvimento da API. Para a validação dos dados enviados nos payloads, escolhi utilizar o Zod, que além de permitir uma validação inicial do formato dos campos, também oferece integração com o TypeScript por meio de tipagem autoinferida, o que torna o processo mais fluido e seguro.

A respeito do TypeScript, escolhi essa linguagem justamente por proporcionar mais confiabilidade no desenvolvimento, principalmente no que diz respeito à tipagem dos DTOs e uso de interfaces. Isso me permitiu estruturar o código de forma mais clara e segura, inclusive implementando classes a partir dessas interfaces. Para facilitar o ambiente de desenvolvimento e o processo de build, utilizei o ts-node-dev para rodar o servidor localmente e o tsup para gerar o build final do projeto.

Em relação à estrutura do sistema, adotei uma arquitetura em camadas, buscando seguir alguns princípios do SOLID. Um ponto que vale destacar é a camada de repositório, onde os serviços não têm conhecimento direto da infraestrutura externa, como o banco de dados. Eles interagem apenas com interfaces, o que facilita possíveis futuras trocas de tecnologia sem impactar a lógica de negócio. Para esta atividade em específico, implementei a camada de persistência utilizando SQLite, conforme solicitado.

Para o controle de erros, criei um middleware global que cuida das exceções, essas que por sua vez foram criadas customizadas, facilitando o mapeamento do status http da resposta e a mensagem de erro.

Por fim, criei um sistema simples para controle de migrations, com o objetivo de facilitar a criação e manutenção das tabelas necessárias para o funcionamento da aplicação.
