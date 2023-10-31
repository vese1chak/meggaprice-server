// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const goodimgController = require('../controllers/goodimgController')

router.post('/', goodimgController.create)
router.get('/', goodimgController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router