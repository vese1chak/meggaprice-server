// В этом файле описываем модели данных
// Импортируем ранее описанный объект для подключения к БД
const sequalize = require('../db')
// DataTypes описывает типы определённого поля (string, int, etc)
const {DataTypes} = require('sequelize')

// Описываем модель пользователя. Первым аргументом в вызываемом методе пишем название модели, вторым - объект с колонками для таблиц
const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING, allowNull: false},
    lastname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
    birthdate: {type: DataTypes.DATE, allowNull: false}, // изменить
    phonenumber: {type: DataTypes.INTEGER, allowNull: false}, // изменить
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    img: {type: DataTypes.STRING, defaultValue:
            'https://drive.google.com/file/d/1UQhH0mgjTN0zKjgcw8ci1XKDWQ_MP5-b/view?usp=sharing'}, // изменить
    address: {type: DataTypes.STRING}, // не STRING
    goods: {type: DataTypes.STRING}, // не STRING
    complaint: {type: DataTypes.INTEGER}, // изменить
})

// Описываем модель продавца
const Seller = sequalize.define('seller', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phonenumber: {type: DataTypes.INTEGER, allowNull: false}, // изменить
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    cardimg: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false}, // Изменить
    description: {type: DataTypes.STRING},
    complaint: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Question = sequalize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false}
})

// Описываем модель корзины
const Basket = sequalize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Описываем модель таблицы basket_good
const BasketGood = sequalize.define('basket_good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Описываем модель товара
const Good = sequalize.define('good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // в клиенте указать, что название товара должно быть УНИКАЛЬНЫМ
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель категории/подкатегории
const Type = sequalize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    parent: {type: DataTypes.INTEGER, defaultValue: null}
})

// Описываем модель свойства для категории/подкатегории
const Property = sequalize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель значения для свойства
const Value = sequalize.define('value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель отзыва
const Review = sequalize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    text: {type: DataTypes.STRING, defaultValue: ''},
    complaint: {type: DataTypes.INTEGER, defaultValue: 0},
})

// Описываем взаимосвязи моделей. 1. Модель может иметь определённое количество других моделей, 2. Модель принадлежит определённой модели
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Question)
Question.belongsTo(User)

Basket.hasMany(BasketGood)
BasketGood.belongsTo(Basket)

Basket.hasOne(User)
User.belongsTo(Basket)

BasketGood.hasOne(Good)
Good.belongsTo(BasketGood)

Seller.hasMany(Good)
Good.belongsTo(Seller)

Seller.hasMany(Question)
Question.belongsTo(Seller)

Good.hasMany(Review)
Review.belongsTo(Good)

Good.hasOne(BasketGood)
BasketGood.belongsTo(Good)

Type.hasMany(Good)
Good.belongsTo(Type)

Type.hasMany(Property)
Property.belongsTo(Type)

Property.hasMany(Value)
Value.belongsTo(Property)

// Экспортируем модели в другие файлы
module.exports = {
    User,
    Seller,
    Basket,
    BasketGood,
    Good,
    Type,
    Property,
    Value
}