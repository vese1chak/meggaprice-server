// импорт модели товара
const {Good} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// устанавливаем модуль по генерации уникальных имен
const uuid = require("uuid");
// импорт модуля для определения текущего каталога
const path = require("path");
// создаём класс, группирующий функции для взаимодействия с сущностью
class GoodController {
    async create(req, res, next) {
        // предостережение от ошибок
        try {
            const {title, description, price, typeId, sellerId} = req.body
            const {img} = req.files
            // генерация имени файла
            const fileName = uuid.v4() + '.jpg'
            // перемещаем файл в папку static
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const good = await Good.create({title,
                description, price, typeId, sellerId, img: fileName})
            return res.json(good)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}

// экспорт объекта для использования в других файлах
module.exports = new GoodController()