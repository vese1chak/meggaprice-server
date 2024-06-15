// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const sellerController = require('../controllers/sellerController')
// импорт middleware функции для проверки валидности и декодирования токена
const authSellerMiddleware = require('../middleware/authSellerMiddleware')

router.post('/', sellerController.create)
router.post('/login', sellerController.login)
router.get('/auth', authSellerMiddleware, sellerController.check)
router.get('/:id', sellerController.profile)
router.get('/', sellerController.goods)

// экспорт объекта для использования в других файлах
module.exports = router