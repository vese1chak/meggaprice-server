// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const usergoodController = require('../controllers/usergoodController')

router.post('/', usergoodController.create)
router.get('/', usergoodController.getAll)

// экспорт объекта для использования в других файлах
module.exports = router