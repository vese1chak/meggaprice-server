// импорт модели категории
const {Type} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// создаём класс, группирующий функции для взаимодействия с сущностью
class TypeController {
    async create(req, res) {
        // деструктуризацией получаем параметры из тела запроса
        const {name, parent} = req.body
        // добавление новой категории в БД
        const type = await Type.create({name, parent})
        return res.json(type)
    }

    async getAll(req, res) {
        // получение записей из БД
        const types = await Type.findAll()
        return res.json(types)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new TypeController()