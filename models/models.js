// В этом файле описываем модели данных
// Импортируем ранее описанный объект для подключения к БД
const sequelize = require('../db')
// DataTypes описывает типы определённого поля (string, int, etc)
const {DataTypes} = require('sequelize')

// Описываем модель пользователя. Первым аргументом в вызываемом методе пишем название модели, вторым - объект с колонками для таблиц
const User = sequelize.define('user', {
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
            'https://drive.google.com/file/d/1UQhH0mgjTN0zKjgcw8ci1XKDWQ_MP5-b/view?usp=sharing'},
    complaint: {type: DataTypes.INTEGER, defaultValue: 0}, // изменить
})

// Описываем модель данных карточки оплаты
const PaymentCard = sequelize.define('payment_card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cardnumber: {type: DataTypes.INTEGER, allowNull: false},
    cvc: {type: DataTypes.INTEGER, allowNull: false},
    validityperiod: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель продавца
const Seller = sequelize.define('seller', {
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

const Question = sequelize.define('question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false}
})

// Описываем модель связующей таблицы user_good
const UserGood = sequelize.define('user_good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false}
})

// Описываем модель связующей таблицы order_good
const OrderGood = sequelize.define('order_good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phonenumber: {type: DataTypes.INTEGER, allowNull: false},
    amount: {type: DataTypes.INTEGER, defaultValue: 1},
    address: {type: DataTypes.STRING, allowNull: false}, // Изменить
    payment: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: "Создано"}
})

// Описываем модель товара
const Good = sequelize.define('good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // в клиенте указать, что название товара должно быть УНИКАЛЬНЫМ
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
})

const GoodImg = sequelize.define('good_img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель категории/подкатегории
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    parent: {type: DataTypes.INTEGER, defaultValue: null}
})

// Описываем модель свойства для категории/подкатегории
const Property = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель значения для свойства
const Value = sequelize.define('value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
})

// Описываем модель отзыва
const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    text: {type: DataTypes.STRING, defaultValue: ''},
    complaint: {type: DataTypes.INTEGER, defaultValue: 0},
})

// Описываем взаимосвязи моделей. 1. Модель может иметь определённое количество других моделей, 2. Модель принадлежит определённой модели
User.hasMany(UserGood)
UserGood.belongsTo(User)

User.hasMany(OrderGood)
OrderGood.belongsTo(User)

User.hasMany(PaymentCard)
PaymentCard.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Question)
Question.belongsTo(User)

Seller.hasMany(Good)
Good.belongsTo(Seller)

Seller.hasMany(Question)
Question.belongsTo(Seller)

Good.hasMany(OrderGood)
OrderGood.belongsTo(Good)

Good.hasMany(UserGood)
UserGood.belongsTo(Good)

Good.hasMany(Review)
Review.belongsTo(Good)

Good.hasMany(GoodImg)
GoodImg.belongsTo(Good)

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
    UserGood,
    OrderGood,
    Good,
    Type,
    Property,
    Value,
    Review,
    GoodImg,
    Question,
    PaymentCard
}