# Серверная часть приложения, aka Backend
Данные этого репозитория должны располагаться на удалённой локальной машине, на которой должен быть предустановлен **Node.js**
<br/>
Для корректной работы приложения на сервере необходимо в корневой папке создать файл **.env** со следующими полями:
<br/>
*PORT=5000* <br/>
*DB_NAME=meggaprice* <br/>
*DB_USER=postgres* <br/>
*DB_PASSWORD=[актуальный пароль]* <br/>
*DB_HOST=[актуальный хост, адрес расположения БД]* <br/>
*DB_PORT=5432* <br/>
* Запускать приложение **из терминала** командой *npm run dev*
## Используемые инструменты
* express - фреймворк для написания бекенда на node.js
* postgresql (с установленными модулями pg и pg-hstore) - СУБД
* sequelize - ORM для реляционных баз данных на node.js
* cors - плагин, позволяющий обращаться с браузера к серверу
* dotenv - модуль, позволяющий задавать переменные окружения
* nodemon - модуль, автоматически перезапускающий сервер при измененении кода
