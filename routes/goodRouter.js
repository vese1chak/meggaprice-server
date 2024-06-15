// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const goodController = require('../controllers/goodController')

router.post('/', goodController.create)
router.get('/', goodController.getAll)
router.get('/:id', goodController.getOne)
router.get('/existing', goodController.existing)

// экспорт объекта для использования в других файлах
module.exports = router