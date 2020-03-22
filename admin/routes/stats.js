const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('stats', {
        layout: 'admin',
        title: 'Статистика',
        isStats: true,
    });
});

module.exports = router;