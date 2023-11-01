# Mesto

Веб-приложение MERN (MongoDB, Express, React, Node.js), которое позволяет пользователям делится картинками, редактировать свой профиль (аватар, описание, имя), регистрироваться и входить в систему с аутентификацией JWT, ставить лайк и удалять свои карточки.

## Содержание

- [Особенности и функционал](#особенности-и-функционал)
- [Стек и инструменты](#стек-и-инструменты)
- [Внешний вид](#внешний-вид)
- [Установка](#установка)

## Особенности и функционал

- Регистрация и аутентификация пользователей с использованием JWT (JSON Web Tokens).
- Лайки карточек для зарегистрированных пользователей с добавлением значений в базу данных.
- Редактирование профиля с валидацией полей на корректность.
- Смена аватарки по предоставленной ссылке.
- Клик по картинке открывает ее на весь экран. Используются анимации CSS для плавности.
- Загрузка собственной карточки.
- Пользователь, который загрузил картинку, может ее удалить.
- Пользовательский интерфейс создан с помощью React и + CRA.
- Внутренний API создан с помощью Node.js и Express по архитектуре REST.
- Хранение и извлечение данных с помощью MongoDB.

## Стек и инструменты

- **Frontend:**

  - React
  - React Router
  - CSS по БЭМ

- **Backend:**

  - Node.js
  - Express
  - MongoDB (+ Mongoose)
  - JSON Web Tokens (JWT) для авторизации
  - Подключено логирование
  - Настроен CORS
  - Созданы собственные классы ошибок

- **Deployment:**
  - Приложение было задеплоено на яндекс клауд через nginx.

## Внешний вид

<div align="center">
  
### Авторизация
![login](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/c6ec39ad-8223-4204-9c06-adadc4c96523)

### Загрузка карточки
![upload](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/d691abf3-fccd-4299-9df9-edfd44b963d8)

### Удаление карточки
![delete](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/ba7fe6ee-2e34-4558-99bb-351247a04e6e)

### Лайк
![like](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/824d2019-03d1-40b6-ad67-afea40bf015a)

### Клик по карточке
![expand](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/745aec7b-879a-45c1-a97a-3e642369041c)

### Редактирование информации профиля
![edit](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/3aca5282-5540-4a56-abed-4ed7901da1cb)

### Редактирование аватара
![pfp](https://github.com/neequu/react-mesto-api-full-gha/assets/69749247/8329626c-ac37-4083-a057-a15e66c5f25e)


</div>

## Установка

1. Склонируйте репозиторий:

```bash
git clone https://github.com/neequu/react-mesto-api-full-gha.git
```

3. Установите зависимости фронта и бэка:

```bash
  cd frontend
  npm install
  cd backend
  npm install
```

3. Запустите dev сервер для фронта и бэка:

Frontend:

```bash
cd frontend
npm run start
```

Backend:

```bash
cd backend
npm run dev
```

Бэкенд должен запуститься по адресу http://localhost:3000, Фроентед по адресу http://localhost:3001
