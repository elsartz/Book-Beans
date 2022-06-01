const router = require('express').Router();
const { Coffee, CoffeeComments, User } = require('../../models');

router.get('/', (req, res) => {
    Coffee.findAll({
        attributes: ['id', 'cafe_name', 'city_name'],
        include: [{
            model: CoffeeComments,
            attributes: ['comment_text'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(dbCoffeeData => res.json(dbCoffeeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Coffee.create({
        cafe_name: req.body.cafe_name,
        city_name: req.body.city_name,
        user_id: req.body.user_id
    })
    .then(dbCoffeeData => res.json(dbCoffeeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Coffee.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbCoffeeData => {
        if (!dbCoffeeData[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
        res.json(dbCoffeeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Coffee.destroy({
        where: {
            id: req.params.id
    }
    })
    .then(dbCoffeeData => {
        if (!dbCoffeeData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
    }
        res.json(dbCoffeeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;