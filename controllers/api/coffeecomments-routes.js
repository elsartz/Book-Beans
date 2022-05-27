const router = require('express').Router();
const { CoffeeComments } = require('../../models');

router.get('/', (req, res) => {
    CoffeeComments.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    CoffeeComments.create({
        comment_text: req.body.comment_text
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;