// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create)
router.get('/', reviewController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router