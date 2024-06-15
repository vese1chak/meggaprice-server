// импорт класса для универсальной обработки ошибок
const ApiError = require('../error/ApiError')
const {Review} = require("../models/models");
// создаём класс, группирующий функции для взаимодействия с сущностью
class ReviewController {
    async create(req, res) {
        // получение данных из тела запроса
        const {goodId, userId, rate, dignity, flaws, comment} = req.body
        const review = await Review.create({goodId, userId, rate, dignity, flaws, comment})
        return res.json(review)
    }

    async getAll(req, res) {
        // получение данных из строки запроса
        const {goodId} = req.query
        const reviews = await Review.findAll({where: {goodId}})
        return res.json(reviews)
    }

    async getOne(req, res) {
        const {userId, goodId} = req.query
        const review = await Review.findOne({where: {userId, goodId}})
        return res.json(review)
    }

    async updateReview(req, res) {
        const {goodId, userId, rate, dignity, flaws, comment} = req.query
        const review = await Review.findOne({where: {userId, goodId}})
        await review.update({rate, dignity, flaws, comment})
        return res.json(review)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new ReviewController()