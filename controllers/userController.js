// создаём класс, группирующий функции для взаимодействия с сущностью
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res) {
        const {id} = req.query
    }
}

// экспорт объекта для использования в других файлах
module.exports = new UserController()