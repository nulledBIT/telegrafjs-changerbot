const { Router } = require('express');
const router = Router();
const fn = require('../functions');

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Авторизация',
    });
});

module.exports = router;