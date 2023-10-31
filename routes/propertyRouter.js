// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const propertyController = require('../controllers/propertyController')

router.post('/', propertyController.create)
router.get('/', propertyController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router