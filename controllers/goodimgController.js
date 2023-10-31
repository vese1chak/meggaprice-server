// устанавливаем модуль по генерации уникальных имен
const uuid = require('uuid')
// импорт модуля для определения текущего каталога
const path = require('path')
// импорт модели картинок товара
const {GoodImg} = require("../models/models");
// импорт класса для универсальной обработки ошибок
const ApiError = require("../error/ApiError");

// создаём класс, группирующий функции для взаимодействия с сущностью
class GoodimgController {
    async create(req, res, next) {
        try {
            const {img} = req.files
            // генерация имени файла
            const fileName = uuid.v4() + '.jpg'
            // перемещаем файл в папку static
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const goodimg = await GoodImg.create({img: fileName})
            return res.json(goodimg)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

    }
}

// экспорт объекта для использования в других файлах
module.exports = new GoodimgController()