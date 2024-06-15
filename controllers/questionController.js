// создаём класс, группирующий функции для взаимодействия с сущностью
const {Question} = require("../models/models");

class QuestionController {
    async create(req, res) {
        const {role, id, message} = req.body
        if (role === 'USER') {
            await Question.create({text: message, userId: id})
        } else if (role === 'SELLER') {
            await Question.create({text: message, sellerId: id})
        }
        return res.status(200).json({message: 'УСПЕШНО ДОБАВЛЕН ВОПРОС'})
    }

    async getAll(req, res) {
        const {role, id} = req.query
        let questions;
        if (role === 'USER') {
            questions = await Question.findAll({where: {userId: id}})
        } else if (role === 'SELLER') {
            questions = await Question.findAll({where: {sellerId: id}})
        } else if (role === 'ALL') {
            questions = await Question.findAll()
        }
        return res.json(questions)
    }

    async getDialogs(req, res) {
        let dialogs = await Question.findAll()
        dialogs = dialogs.map(item => item.dataValues.userId)
        const output = await Question.findAll({where: {userId: [...new Set(dialogs)]}})
        console.log(output)
        return res.json(output)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new QuestionController()