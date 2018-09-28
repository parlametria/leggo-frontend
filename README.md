[![pipeline status](https://gitlab.com/analytics-ufcg/front/badges/master/pipeline.svg)](https://gitlab.com/analytics-ufcg/back-test/commits/master)

# Ágora Digital Frontend

Código do frontend do projeto Ágora Digital.

## Docker

Desenvolvimento:
```
docker-compose up
```
Produção:
```
docker-compose -f deploy/prod.yml up
```

### Testes

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
```
