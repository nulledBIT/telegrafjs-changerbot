const { Router } = require('express');
const router = Router();
const fn = require('../functions');
//const bot = require('../../bot/bot');

router.get('/', (req, res) => {

    fn.getAllOrders()
    .then(orders => {

        const accepted = orders.filter(order => order.isAccepted);
        const processing = orders.filter(order => !order.isAccepted);

        res.render('admin', {
            layout: 'admin',
            title: 'Главная',
            isAdmin: true,
            orders,
            accepted,
            processing
        });

    });

});





module.exports = router;