// основной router приложения
// импорт функции из библиотеки express
const Router = require('express')
// создание объекта функции
const router = new Router()
// импорт основных роутеров
const goodRouter = require('./goodRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const goodimgRouter = require('./goodimgRouter')
const ordergoodRouter = require('./ordergoodRouter')
const cardRouter = require('./cardRouter')
const propertyRouter = require('./propertyRouter')
const questionRouter = require('./questionRouter')
const reviewRouter = require('./reviewRouter')
const sellerRouter = require('./sellerRouter')
const usergoodRouter = require('./usergoodRouter')
const valueRouter = require('./valueRouter')

// т.к. остальные роутеры являются подроутерами, указываем, что нужно обрабатывать их как middleware функции. 1 аргументом передаём url, по которому роутер будет отрабатывать, 2 аргумент - сам роутер
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/good', goodRouter)
router.use('/goodimg', goodimgRouter)
router.use('/ordergood', ordergoodRouter)
router.use('/paymentcard', cardRouter)
router.use('/property', propertyRouter)
router.use('/question', questionRouter)
router.use('/review', reviewRouter)
router.use('/seller', sellerRouter)
router.use('/usergood', usergoodRouter)
router.use('/value', valueRouter)

// экспорт объекта для использования в других файлах
module.exports = router