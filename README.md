# 🧠 Metasiberia: 3D Multiplayer Playground

Лёгкий стартер для 3D-мультиплеерного мира на базе Three.js, React, Vite и SpacetimeDB.

---

## 🚀 Быстрый старт (локально)

### 📦 Требования:

- Node.js v18+
- Rust + Cargo
- SpacetimeDB CLI

Установи CLI:

cargo install spacetimedb-cli

yaml
Копировать
Редактировать

---

### 📁 Установка:

git clone https://github.com/shipilovden/metasiberia.git
cd metasiberia

yaml
Копировать
Редактировать

---

### 🧪 Запуск проекта (два терминала)

**Терминал 1 — SpacetimeDB сервер:**

cd server
spacetimedb-cli start

markdown
Копировать
Редактировать

**Терминал 2 — Vite frontend:**

cd client
npm install
npm run dev

yaml
Копировать
Редактировать

Открой в браузере:  
http://localhost:5173

---

### ⚡ Быстрый запуск через .bat (Windows)

start_metasiberia.bat

yaml
Копировать
Редактировать

---

## 🛠 Структура проекта

metasiberia/
├── client/
│ └── src/generated/
├── server/
│ ├── spacetime.toml
│ └── schema.stschema
└── start_metasiberia.bat

yaml
Копировать
Редактировать

---

## ✨ Возможности

- мультиплеер на базе SpacetimeDB
- анимация и классы персонажей
- готов к кастомизации (NPC, чат, PvP и т.д.)
