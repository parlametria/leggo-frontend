# Ágora Digital Web
[![Build Status](https://travis-ci.org/analytics-ufcg/agora-digital-web.svg?branch=master)](https://travis-ci.org/analytics-ufcg/agora-digital-web)

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

### Limitações

Mesmo usando a imagem de desenvolvimento, alterações nos arquivos de configuração que estão na pasta raiz (como `package.json`) exigem um rebuild da imagem. Alterações no código fonte são sincronizadas dentro do container automaticamente.

## Project setup
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
