// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const cardController = require('../controllers/cardController')

router.post('/', cardController.create)
router.get('/', cardController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router