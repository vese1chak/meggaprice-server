// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импортируем логику для работы с сущностью
const userController = require('../controllers/userController')
// импорт middleware функции для проверки валидности и декодирования токена
const authMiddleware = require('../middleware/authMiddleware')

// 2 параметром передаём метод для взаимодействия с сущностью
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/', userController.updateProfile)
// реализуем get запрос по проверке на авторизованность
// первым параметром get запроса передаём адрес, по которому запрос будет отрабатывать, вторым - функцию по проверке на авторизованность, третьим - callback, принимающий параметрами запрос и ответ
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.profile)

// экспорт объекта для использования в других файлах
module.exports = router