# 🧠 Metasiberia: 3D Multiplayer Playground

Лёгкий стартер для 3D-мультиплеерного мира на базе Three.js, React, Vite и SpacetimeDB. Это не просто playground — это фундамент для будущей метавселенной, где каждая сцена — модуль, каждый игрок — событие, а каждый шаг — запись в базе.

---

## 🚀 Что умеет этот проект

* 📡 **Мгновенный мультиплеер** — SpacetimeDB синхронизирует игроков в реальном времени
* 🧍‍♂️ **3D-персонажи** — перемещение, вращение, анимация
* 🔌 **Modular architecture** — легко встраивать свои механики
* 🧠 **Готов для AI-авторасширения** — под ключ
* 🔥 **Vite + React + Three.js** — производительно и современно

---

## 📦 Установка и запуск

### 📋 Требования:

* Node.js `v18+`
* Rust + Cargo
* SpacetimeDB CLI:

  ```powershell
  cargo install spacetimedb-cli
  ```

### 📁 Установка:

```powershell
git clone https://github.com/shipilovden/metasiberia.git
cd metasiberia
```

### ▶️ Один запуск — два окна (Windows):

```powershell
start powershell -NoExit -Command "cd C:\Three\metasiberia\server; spacetimedb-cli start"; start powershell -NoExit -Command "cd C:\Three\metasiberia\client; npm install; npm run dev"
```

🔗 Открой [http://localhost:5173](http://localhost:5173) — ты в игре.

---

## 🛠 Структура проекта

```
metasiberia/
├── client/                  # фронтенд на React + Three.js
│   └── src/generated/       # TypeScript биндинги SpacetimeDB
├── server/                  # Rust-модуль базы
│   ├── spacetime.toml       # конфигурация базы
│   └── schema.stschema      # описание таблиц и событий
└── start_metasiberia.bat    # запуск сразу сервера и клиента
```

---

## ✨ Идеи для развития

* 🎮 Сражения и PvP
* 🎙 Внутриигровой голос или чат
* 🌍 Порталы между локациями
* 🎯 Коллекционирование предметов, спавн
* 🧠 Интеграция с AI-персонажами и автоописанием действий

---

## ❓ Почему SpacetimeDB?

> Это не просто WebSocket, это база, которая думает, как игровая логика.

SpacetimeDB позволяет тебе описывать события как обработчики, а не как ручной сервер. Код в Rust, биндинги в TypeScript, база = сервер.

---

## 📸 Скриншот (опционально)

Добавь файл `screenshot.png` в корень проекта и вставь:

```md
![Metasiberia preview](./screenshot.png)
```

---

## 🤝 Контакты

* Автор: [@shipilovden](https://github.com/shipilovden)
* Проект: [Metasiberia](https://github.com/shipilovden/metasiberia)
* Команда: Metasiberia Lab

---

> Начни с персонажа. Построй мир. Подключи смысл.
