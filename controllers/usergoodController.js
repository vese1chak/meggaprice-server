// создаём класс, группирующий функции для взаимодействия с сущностью
const {UserGood, Good} = require("../models/models");

class UsergoodController {
    async create(req, res, next) {
        try {
            let {goodId, type, userId} = req.body

            const usergood = await UserGood.create({goodId, type, userId})

            return res.json(usergood)
        } catch (e) {
            console.log('Ошибка в usergoodcontroller.js')
        }
    }

    async getAll(req, res) {
        const {userId, type} = req.query

        const baseGoods = await UserGood.findAll({where: {userId, type}, raw: true})
        const goods = baseGoods.map((item) => item.goodId)
        const output = await Good.findAll({where: {id: goods}})

        return res.json(output)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new UsergoodController()