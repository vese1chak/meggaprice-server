// импорт модели свойства категории/подкатегории
const {Property} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// создаём класс, группирующий функции для взаимодействия с сущностью
class PropertyController {
    async create(req, res) {
        // деструктуризацией получаем параметры из тела запроса
        const {title, typeId} = req.body
        // добавление нового свойства категории/подкатегории в БД
        const property = await Property.create({title, typeId})
        return res.json(property)
    }

    async getAll(req, res) {
        // получение записей из БД
        const properties = await Property.findAll()
        return res.json(properties)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new PropertyController()