// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const ordergoodController = require('../controllers/ordergoodController')

router.post('/', ordergoodController.create)
router.get('/', ordergoodController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router