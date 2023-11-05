// здесь пишем middleware для проверки валидности токена и его декодирования
// импорт модуля jwt
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // пропускаем работу функции, если метод запроса - options. Если же методом запроса являются get, post, put, delete - продолжаем
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        // Забираем 1й по индексу элемент, являющийся токеном. 0й элемент - тип токена (Bearer)
        const token = req.headers.authorization.split(' ')[1]
        // проверка существования токена
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }
        // проверка токена на валидность
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // параметру user запроса передаём декодированные данные
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }
}