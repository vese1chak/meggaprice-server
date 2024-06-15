// импорт модели продавца
const {Seller, User, Good} = require('../models/models')
// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// импорт модуля jwt
const jwt = require('jsonwebtoken')
// импорт модуля для хеширования пароля
const bcrypt = require('bcrypt')

// функция для универсальной генерации токена
const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '365d'}
    )
}

// создаём класс, группирующий функции для взаимодействия с сущностью
class SellerController {
    async create(req, res, next) {
        // предостережение от ошибок
        try {
            const {name, phonenumber, email, password} = req.body
            const seller = await Seller.create(
                {name, phonenumber, email, password}
            )
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            // получение данных из тела запроса
            const {email, password} = req.body
            // проверка наличия пользователя в БД
            const seller = await Seller.findOne({where: {email}})
            if (!seller) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            // Проверка пароля
            let comparePassword = bcrypt.compareSync(password, seller.password)
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJwt(seller.id, seller.email)
            return res.json({token})
        } catch (e) {
            console.log(e.message, 'sellerController.login')
        }
    }

    async check(req, res) {
        // получение записей из БД
        try {
            console.log(req.data, 'sellerController.check')
            // передаём аргументами функции данные из поля user запроса
            const token = generateJwt(req.seller.id, req.seller.email)
            return res.json({token})
        } catch (e) {
            return res.json({message: 'Не авторизован'})
        }
    }

    async profile(req, res) {
        try {
            const {id} = req.params
            const seller = await Seller.findOne({where: {id}})
            return res.json({seller})
        } catch (e) {
            console.log(e.message)
            return res.status(404).json({message: 'Не авторизован'})
        }
    }

    async goods(req, res) {
        const {sellerId} = req.query
        const goods = await Good.findAll({where: {sellerId}})
        return res.json(goods)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new SellerController()