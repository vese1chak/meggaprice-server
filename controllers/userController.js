// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// создаём класс, группирующий функции для взаимодействия с сущностью
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) {
        // получаем данные из параметра строки запроса
        const {id} = req.query
        // если в строке запроса нет ключа id, возвращаем на клиент ошибку. Иначе продолжаем выполнение функции
        if (!id) {
            return next(ApiError.badRequest('Не задан ID!'))
        }
        res.json(id)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new UserController()