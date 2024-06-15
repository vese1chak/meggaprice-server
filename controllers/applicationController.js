// создаём класс, группирующий функции для взаимодействия с сущностью
const {User, Seller, Application} = require("../models/models");
// импорт класса для универсальной обработки ошибок
const ApiError = require("../error/ApiError");
// импорт модуля для хеширования пароля
const bcrypt = require('bcrypt')

class ApplicationController {
    async create(req, res, next) {
        const {name, email, phone, password, reason} = req.body

        const candidate = await User.findOne({where: {email}})
        const sellerCandidate = await Seller.findOne({where: {email}})
        if (candidate || sellerCandidate) {
            return next(ApiError.badRequest('Пользователь или продавец с таким email уже существует'))
        }
        // если все проверки пройдены, продолжаем работу
        // параметрами метода hash передаём сколько раз нужно захешировать пароль
        const hashPassword = await bcrypt.hash(password, 5)
        const application = await Application.create({name, email, phone, password: hashPassword, reason})
    }

    async getAll(req, res) {
        const applications = await Application.findAll()
        return res.json(applications)
    }

    async getOne(req, res) {
        const {email} = req.query
        const candidate = await Application.findOne({where: {email}})
        return res.json(candidate)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new ApplicationController()