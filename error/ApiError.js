// создаём класс, группирующий функции для универсальной обработки ошибок
class ApiError extends Error {
    constructor(status, message) {
        // вызов родительской конструкции
        super()
        this.status = status
        this.message = message
    }

    // статические функции можно вызывать без создания объекта. Можно обратиться к классу и вызвать функцию
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError