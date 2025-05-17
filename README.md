# 🧠 Metasiberia: 3D Multiplayer Playground

Metasiberia — это лёгкий, но мощный стартер для создания 3D-мультиплеерных миров на базе **Three.js**, **React**, **Vite** и **SpacetimeDB**.  
Это фундамент метавселенной, где каждый шаг игрока — событие в базе, каждая сцена — модуль.

### 🔗 Онлайн-версия проекта:
👉 https://metasiberia.vercel.app/  
> Здесь публикуются все **последние обновления проекта**

---

![Metasiberia preview](./screenshot.png)

## 🚀 Что умеет этот проект?
📡 Мгновенный мультиплеер на SpacetimeDB (все игроки видят друг друга в реальном времени)

🧍‍♂️ Персонажи: 3D-анимация, перемещение, прыжки

🔌 Архитектура для расширения: легко встраивать логику, добавлять объекты и взаимодействие

🧠 Подходит для интеграции с AI-агентами

⚡ Построен на Vite + React + Three.js

📦 Как развернуть проект (Windows + PowerShell)
Эта инструкция предназначена для пользователей Windows, команды выполняются через PowerShell.

## Инструкция:

## 📋 1. Установите зависимости
Установите Node.js v18+

Установите Rust + Cargo

Установите CLI SpacetimeDB:

powershell
cargo install spacetimedb-cli
Установите Vercel CLI (для деплоя):

powershell
npm install -g vercel
## 📁 2. Создайте рабочую папку и клонируйте проект
powershell

mkdir C:\Three

cd C:\Three

git clone https://github.com/shipilovden/metasiberia.git
cd metasiberia
## 🧰 3. Создайте .bat для быстрого запуска
Создай файл start_metasiberia.bat в корне (C:\Three\metasiberia) с содержанием:

bat
@echo off
start powershell -NoExit -Command "cd server; spacetimedb-cli start"
start powershell -NoExit -Command "cd client; spacetimedb-cli generate --lang typescript --out-dir src/generated; npm install; npm run dev"
Запуск:

powershell
.\start_metasiberia.bat
## 🌐 4. Открой в браузере
arduino
http://localhost:5173
## 🧠 Мультиплеер на базе SpacetimeDB
В проекте используется SpacetimeDB — это не просто WebSocket, а полноценная игровая база данных в реальном времени.

Каждый игрок — это запись в таблице. Каждое действие — событие, обрабатываемое на сервере.

📡 Как опубликовать базу данных на SpacetimeDB Cloud
Чтобы мультиплеер работал не только локально, нужно опубликовать серверную базу.

## 📌 1. Убедись, что spacetime.toml настроен:
toml
name = "metasiberia"
uuid = "твой-уникальный-id" # можно сгенерировать автоматически
client_path = "../client/src/generated"
## ⚙️ 2. Сгенерируй биндинги:
powershell
cd C:\Three\metasiberia\server
spacetimedb-cli generate --lang typescript --out-dir ../client/src/generated
## 🧱 3. Построй и опубликуй базу:
powershell
spacetimedb-cli publish metasiberia
В ответ появится предупреждение: Are you sure you want to publish to maincloud...?

Введи y и нажми Enter

База станет доступна на maincloud.spacetimedb.com, и твой клиент сможет подключаться из интернета.

## 🔁 4. В коде клиента автоматически выбирается:
ts
const dbHost = import.meta.env.PROD
  ? "maincloud.spacetimedb.com"
  : "localhost:3000";
При деплое клиент подключится к опубликованной базе, если ты предварительно сделал publish.

☁️ Как задеплоить клиент на Vercel
Деплой осуществляется из папки client, и только frontend.

## 1. Перейди в папку клиента
powershell
cd C:\Three\metasiberia\client
## 2. Выполни деплой:
powershell
vercel --prod
При первом запуске:

Вопрос	Ответ
Set up and deploy?	Yes
Which scope?	Выбери свой аккаунт
Link to existing project?	No (если первый раз)
What’s your project’s name?	metasiberia (или своё)
In which directory is your code located?	. (оставь как есть)
Want to modify settings?	No

После деплоя ты получишь ссылку, например:

arduino
https://metasiberia.vercel.app
💾 Как сохранять изменения в проект
Открой PowerShell:

powershell
cd C:\Three\metasiberia
Добавь все изменения:

powershell
git add .
Сделай коммит:

powershell
git commit -m "fix: обновлён ридми и сцена"
Отправь в репозиторий:

powershell
git push origin main

## 🛠 Структура проекта

csharp
metasiberia/
├── client/                  # Фронтенд (React + Three.js)
│   ├── public/              # Модели, ассеты, fbx
│   └── src/
│       └── generated/       # Автоматически создаются биндинги из сервера
├── server/                  # Серверная часть (Rust + SpacetimeDB)
│   ├── src/
│   ├── schema.stschema      # Таблицы и события
│   └── spacetime.toml       # Конфигурация SpacetimeDB
├── start_metasiberia.bat    # Быстрый запуск проекта
├── README.md
└── .vercel/                 # Создаётся автоматически при первом деплое

## ✨ Идеи для развития
🎮 Бой и PvP с хитбоксами

🎯 Предметы, инвентарь, спавн

🎙 Голосовой или текстовый чат

🌍 Порталы между сценами и картами

🧠 AI-персонажи, автоописание действий

---

## 🤝 Контакты
Автор: @shipilovden

## Проект: https://metasiberia.vercel.app/ 

## Команда: Metasiberia Lab