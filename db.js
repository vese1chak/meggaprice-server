// здесь происходит конфигурация подключения к базе данных
// испортируем класс из модуля, применив деструктуризацию
const {Sequelize} = require('sequelize')

// экспортируем объект, в котором содержатся данные для подключения к соответствующей БД
module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Имя пользователя, под которым подключаемся к БД
    process.env.DB_PASSWORD, // Пароль от БД
    {
        dialect: 'postgres', // Определяем используемую БД
        host: process.env.DB_HOST, // Определяем хост БД
        port: process.env.DB_PORT // Обозначаем порт БД
    }
)
