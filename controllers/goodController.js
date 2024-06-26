// импорт модели товара
const {Good, GoodInfo} = require('../models/models')
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
            let {title, description, price, typeId, sellerId, info} = req.body
            const {img} = req.files
            // генерация имени файла
            const fileName = uuid.v4() + '.jpg'
            // перемещаем файл в папку static
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const good = await Good.create({title,
                description, price, typeId, sellerId, img: fileName})

            if (info) {
                // Парсим данные из formdata в JS объект
                let parsedInfo = JSON.parse(info)
                console.log(parsedInfo)
                // для каждого поля создаём отдельную строку в БД
                parsedInfo.forEach(i =>
                    GoodInfo.create({
                        characteristic: i.title,
                        description: i.description,
                        goodId: good.id
                    })
                )
            }

            return res.json(good)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        // получаем параметры из строки запроса
        let {typeId} = req.query
        let goods;
        // реализация фильтрации. Чтобы реализовать пагинацию на клиенте, надо знать общее количество товаров, которое вернётся по заданной строке запроса. Используем предназначенный для этого метод findAndCountAll
        if (!typeId) {
            goods = await Good.findAll()
        }
        else {
            goods = await Good.findAll({where: {typeId}})
        }
        return res.json(goods)
    }

    async getOne(req, res) {
        // получаем данные из параметров запроса
        const {id} = req.params
        // отображаем товар по id
        const good = await Good.findOne(
            {
                where: {id},
                // помимо самого товара, получаем также массив его характеристик
                include: [{model: GoodInfo, as: 'info'}]
            }
        )
        return res.json(good)
    }

    async existing(req, res) {
        const {title} = req.query
        const good = await Good.findOne({where: {title}})
        return res.json(good)
    }
}

// экспорт объекта для использования в других файлах
module.exports = new GoodController()