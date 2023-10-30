// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импортируем логику для работы с сущностью
const UserController = require('../controllers/userController')

// 2 параметром передаём метод для взаимодействия с сущностью
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
// первым параметром get запроса передаём адрес, по которому запрос будет отрабатывать, вторым - callback, принимающий параметрами запрос и ответ
router.get('/auth', UserController.check)

// экспорт объекта для использования в других файлах
module.exports = router