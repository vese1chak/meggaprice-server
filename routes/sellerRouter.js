// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const sellerController = require('../controllers/sellerController')

router.post('/', sellerController.create)
router.get('/', sellerController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router