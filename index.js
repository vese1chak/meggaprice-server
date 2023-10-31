// с этого файла начинается запуск приложения
// с помощью require импортируем модули в файл
// чтобы сервер мог считывать переменные окружения из файла .env, его необходимо импортировать из модуля dotenv
require('dotenv').config()
// библиотека express для разработки backend на node.js
const express = require('express')
// импортируем объект с конфигурацией подключения к БД
const sequelize = require('./db')
// импортируем модели данных
const models = require('./models/models')
// импорт библиотеки cors для запросов к БД с браузера
const cors = require('cors')
// регистрируем модуль для работы с файлами
const fileUpload = require('express-fileupload')
// импорт основного роутера, который связывает все остальные
const router = require('./routes/index')
// импорт middleware функции для обработки ошибок
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// импорт модуля для определения текущего каталога
const path = require("path");

// порт, на котором приложение будет работать. Возвращается значение из переменной окружения, или же используется стандартное значение
const PORT = process.env.PORT || 5000

// создаём объект express, с которого и начинается запуск приложения
const app = express()
// функция промежуточного обработчика (middleware) cors() выполняется перед обработкой основного обработчика маршрута и используется для выполнения различных задач, таких как декодирование входящих запросов, проверка аутентификации пользователя или обработка ошибок.
app.use(cors())
// строка ниже позволяет приложению парсить формат json
app.use(express.json())
// указываем серверу, что файлы из папки static нужно раздавать как доступные
app.use(express.static(path.resolve(__dirname, 'static')))
// добавляем в цепочку middleware функций ещё одну для обработки файлов
app.use(fileUpload({}))
// назначаем middleware функцию - router, который должен отрабатывать по адресу api
app.use('/api', router)
// обязательно регистрируем middleware для обработки ошибки в самом конце, чтобы результат выводился на основании окончания работы всех предыдущих middleware функции
app.use(errorHandler)

// Функция подключения к БД. Все операции с БД являются асинхронными - используем async/await
const start = async () => {
    // Обрабатываем всевозможные ошибки при подключении к БД
    try {
        // Вызываем метод объекта, с помощью которого осуществляется прямое подключение к БД. Операция связана с БД - используем await
        await sequelize.authenticate()
        // Вызываем метод объекта, который сверяет состояние БД со схемой данных, которая будет описана позже. Операция связана с БД - используем await
        await sequelize.sync()
        // указываем серверу, какой порт он должен прослушивать
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        // Выводим в консоль объект ошибки, чтобы получить о нём всю информацию
        console.log(e)
    }
}

// Запускаем сервер
start()