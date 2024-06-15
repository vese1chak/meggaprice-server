// здесь пишем middleware для определения роли пользователя
const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            // Забираем 1й по индексу элемент, являющийся токеном. 0й элемент - тип токена (Bearer)
            const token = req.headers.authorization.split(' ')[1]
            // проверка существования токена
            if (!token) {
                return res.status(401).json({message: "Не авторизован. checkRoleMiddleware.js"})
            }
            // проверка токена на валидность
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(500).json({message: "Непредвиденная ошибка!"})
        }
    };
}