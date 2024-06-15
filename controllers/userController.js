// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
// импорт модуля для хеширования пароля
const bcrypt = require('bcrypt')
// импорт модели пользователя
const {User} = require('../models/models')
// импорт модуля jwt
const jwt = require('jsonwebtoken')
const uuid = require("uuid");
const path = require("path");

// функция для универсальной генерации токена
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '365d'}
    )
}

// создаём класс, группирующий функции для взаимодействия с сущностью
class UserController {
    async registration(req, res, next) {
        // получение данных из тела запроса
        const {firstname, lastname, patronymic, birthdate, phonenumber, email, password, role} = req.body
        // проверка на правильность полученных данных
        if (!firstname || !lastname || !patronymic || !birthdate || !phonenumber || !email || !password) {
            return next(ApiError.badRequest('Введены некорректные данные'))
        }
        // проверка наличия пользователя в БД
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        // если все проверки пройдены, продолжаем работу
        // параметрами метода hash передаём сколько раз нужно захешировать пароль
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({firstname, lastname, patronymic, birthdate, phonenumber, email, password: hashPassword, role})
        // генерируем токен
        const token = generateJwt(user.id, user.email, user.role)
        // возвращаем токен на клиент
        return res.json({token})
    }

    async login(req, res, next) {
        // получение данных из тела запроса
        const {email, password} = req.body
        // проверка наличия пользователя в БД
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        // Проверка пароля
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        try {
            // передаём аргументами функции данные из поля user запроса
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            return res.json({message: 'Не авторизован. check => userController.js'})
        }
    }

    async profile(req, res) {
        try {
            const {id} = req.params
            const user = await User.findOne({where: {id}})
            return res.json({user})
        } catch (e) {
            console.log(e.message)
            return res.status(404).json({message: 'Не авторизован. profile => userController.js'})
        }
    }

    async updateProfile(req, res) {
        const {id, firstname, lastname, patronymic, email, phonenumber} = req.body
        if (req.files) {
            const {img} = req.files
        }

        const user = await User.findOne({where: {id}})
        if (req.files) {
            const fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await user.update({firstname, lastname, patronymic, email, phonenumber, img: fileName})
        } else {
            await user.update({firstname, lastname, patronymic, email, phonenumber})
        }
        return res.json(user)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new UserController()