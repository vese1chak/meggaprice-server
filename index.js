// с этого файла начинается запуск приложения
// с помощью require импортируем модули в файл
// чтобы сервер мог считывать переменные окружения из файла .env, его необходимо импортировать из модуля dotenv
require('dotenv').config()
// импортируем объект с конфигурацией подключения к БД из db.js
const sequelize = require('./db')
const express = require('express')

// порт, на котором приложение будет работать. Возвращается значение из переменной окружения, или же используется стандартное значение
const PORT = process.env.PORT || 5000

// создаём объект express, с которого и начинается запуск приложения
const app = express()

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
