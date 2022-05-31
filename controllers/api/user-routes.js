const router = require('express').Router();
const { User, Coffee, CoffeeCommits } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'email', 'username', 'password', 'city_name']
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        city_name: req.body.city_name,
        coffee_id: req.body.coffee_id
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;