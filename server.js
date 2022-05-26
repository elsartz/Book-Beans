const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require("./config/connection.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./controllers/'));


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});