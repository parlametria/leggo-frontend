[![pipeline status](https://gitlab.com/analytics-ufcg/agora-digital-frontend/badges/master/pipeline.svg)](https://gitlab.com/analytics-ufcg/agora-digital-frontend/commits/master)

# Leg.go Frontend

## Docker

Desenvolvimento:
```
docker-compose up
```
Produção:
```
docker-compose -f docker_extra/prod.yml up
```

### Testes

Para que os testes funcionem é preciso que o frontend e o backend já estejam rodando.
Usar então os seguintes comandos:

Sem GUI:
```
npm run docker_test
```
Com GUI:
```
xhost +local:docker
npm run docker_test_gui
```
O primeiro comando é necessário para que o X11 da máquina hospedeira autorize o acesso de aplicações rodando dentro dos containers. No caso, o Electron com a interface do Cypress.

### Limitações

Mesmo usando a imagem de desenvolvimento, alterações nos arquivos de configuração que estão na pasta raiz (como `package.json`) exigem um rebuild da imagem. Alterações no código fonte são sincronizadas dentro do container automaticamente.

## Estrutura dos arquivos Docker

Esse repositório possui diversos arquivos docker-compose e dockerfile.
A seguir explicamos a motivação por trás de cada um:

- **Desenvolvimento:** Os dois arquivos na pasta raiz (`docker-compose.yml` e `Dockerfile`) são usados para rodar o ambiente de desenvolvimento.

Os outros arquivos estão na pasta `docker_extra`:

- **Testes:** Os arquivos `test.yml` e `test.dockerfile` são usados para rodar os testes via Cypress, uma vez que ele precisa de uma imagem específica (baseada no Ubuntu e não Alpine).
- **Produção:** Os arquivos `prod.yml` e `prod.dockerfile` são usados gerar a imagem de produção.
- **Cache do builder:** O fato de `prod.dockerfile` ser uma imagem multi-stage faz com que seu build-stage não receba uma tag, o que impede que ele use a cache em CI. O `builder.yml` permite fazer a build apenas do build-stage, adicionando a ele uma tag, que depois é usada no `cache_from` do `prod.yml`.
- **CI/CD:** Os arquivos `cicd.yml` e `cicd.dockerfile` são usados para criar os containers que rodam o script de CI/CD.

---

## Sem Docker
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Testes

Abre a tela do Cypress de gerenciamento, execução e visualização dos testes:
```
npm run test:e2e 
```
Roda testes mostrando só resultado:
```
npm run test:e2e -- --headless
``**
