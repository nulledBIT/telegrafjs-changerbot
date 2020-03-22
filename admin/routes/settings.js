const { Router } = require('express');
const router = Router();
const fn = require('../functions');


router.get('/', (req, res) => {
    
    // Получаем и выводим настройки
    fn.getSettings()
        .then(data => {

            const config = {
                list: data.map(set => {
                    return {
                        minOrder: set.minOrder,
                        commission: set.commission,
                        paymentCard: set.paymentCard,
                    }
                })
            };
            const length =  config.list.length;
            const last = config.list.length - 1;
            
            res.render('settings', {
                layout: 'admin',
                title: 'Настройки',
                isSettings: true,
                config: config.list[last]
            });
        });
});




router.post('/saved', (req, res) => {

    const sets = req.body;
    const config = {
        MIN_ORDER_RUB: +sets['min-order'],
        COMMISSION: +sets['commission'],
        CARD: sets['payment-card']
    };

    fn.updateSettings(config);

    setTimeout(() => {
        res.redirect(`/admin/settings`);
    }, 300);

});

module.exports = router;