# 📊 devall-analytics

**SDK oficial do DevAll Tech Analytics para aplicações JavaScript, TypeScript, React, React Native e Node.js.**  
Monitore eventos, erros e comportamentos da sua aplicação com facilidade.

[![npm version](https://img.shields.io/npm/v/devall-analytics.svg)](https://www.npmjs.com/package/devall-analytics)
![License](https://img.shields.io/npm/l/devall-analytics.svg)

---

## ✨ Recursos

- ✅ Envio de eventos categorizados (`error`, `warning`, `info`, `custom`, etc.)
- ✅ Registro de payloads personalizados
- ✅ Suporte a múltiplos ambientes (`dev`, `staging`, `prod`)
- ✅ Captura automática de informações básicas do dispositivo
- ✅ Compatível com browsers, Node.js e React Native

---

## 🚀 Instalação

```bash
npm install devall-analytics
```

ou

```bash
yarn add devall-analytics
```

---

## 🛠️ Como usar

### 1. Inicialize com o token do seu projeto:

```ts
import { init } from "devall-analytics"

init("SEU_TOKEN_DO_PROJETO")
```

### 2. Envie um evento:

```ts
import {
  trackEvent,
  DevAllEventType,
  DevAllEnvironment,
} from "devall-analytics"

await trackEvent({
  type: DevAllEventType.ERROR,
  environment: DevAllEnvironment.DEV,
  category: "Login",
  message: "Erro ao autenticar usuário",
  payload: {
    email: "usuario@exemplo.com",
    erro: "senha inválida",
  },
})
```

---

## 🎯 Tipos de Evento

```ts
enum DevAllEventType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  LOG = "log",
  METRIC = "metric",
  CUSTOM = "custom",
}
```

---

## 🌐 Ambientes

```ts
enum DevAllEnvironment {
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}
```

---

## 📦 Publicado por [DevAll Tech](https://devalltech.com.br)

Este pacote é mantido oficialmente pela equipe da **DevAll Tech**, empresa especializada em desenvolvimento de apps, sistemas e soluções digitais.

---

## 📝 Licença

MIT License © [DevAll Tech](https://devalltech.com.br)

---

Feito com 💙 por DevAll Tech
