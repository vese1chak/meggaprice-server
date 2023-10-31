// импорт модели значения свойства
const {Value} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// создаём класс, группирующий функции для взаимодействия с сущностью
class ValueController {
    async create(req, res) {
        // деструктуризацией получаем параметры из тела запроса
        const {value, propertyId} = req.body
        // добавление нового свойства категории/подкатегории в БД
        const curValue = await Value.create({value, propertyId})
        return res.json(curValue)
    }

    async getAll(req, res) {
        // получение записей из БД
        const values = await Value.findAll()
        return res.json(values)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new ValueController()