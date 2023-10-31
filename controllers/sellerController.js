// импорт модели продавца
const {Seller} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// создаём класс, группирующий функции для взаимодействия с сущностью
class SellerController {
    async create(req, res, next) {
        // предостережение от ошибок
        try {
            const {name, phonenumber, email, password} = req.body
            const seller = await Seller.create({name,
                phonenumber, email, password})
            return res.json(seller)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        // получение записей из БД
        const sellers = await Seller.findAll()
        return res.json(sellers)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new SellerController()