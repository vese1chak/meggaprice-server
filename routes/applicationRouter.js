// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт логики для отработки маршрутов
const applicationController = require('../controllers/applicationController')

router.post('/', applicationController.create)
router.get('/', applicationController.getAll)
router.get('/candidate', applicationController.getOne)

// экспорт объекта для использования в других файлах
module.exports = router