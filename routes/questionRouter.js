// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const questionController = require('../controllers/questionController')

router.post('/', questionController.create)
router.get('/', questionController.getAll)
router.get('/dialogs', questionController.getDialogs)

// экспорт объекта для использования в других файлах
module.exports = router