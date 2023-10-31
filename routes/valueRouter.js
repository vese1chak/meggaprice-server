// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const valueController = require('../controllers/valueController')

router.post('/', valueController.create)
router.get('/', valueController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router