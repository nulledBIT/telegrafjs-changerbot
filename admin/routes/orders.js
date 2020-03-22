const { Router } = require('express');
const router = Router();

const fn = require('../functions');
const mongoose = require('mongoose');

const orderSchema = require('../models/order');
const order = mongoose.model('order', orderSchema);

router.get('/', async (req, res) => {

    await order.find({}, (err, orders) => {
        if (err) console.log(err);

        const orderList = {
            list: orders.map(order => {
                return {
                    id: order.id,
                    name: order.name,
                    btcWallet: order.btcWallet,
                    btcSum: order.btcSum,
                    rubSum: order.rubSum,
                    received: fn.parseDate(order.received),
                    isAccepted: order.isAccepted  
                }
            })
        }
        
        res.render('orders', {
            layout: 'admin',
            title: 'Заказы',
            isOrders: true,
            orders: orderList.list,
        });

    });
});

router.get('/:id', async (req, res) => {


    await order.find({ id: req.params.id}, (err, orders) => {
        if (err) {
            console.log(err);
        } else {
            const singleOrderList = {
                list: orders.map(order => {
                    return {
                        id: order.id,
                        name: order.name,
                        btcWallet: order.btcWallet,
                        btcSum: order.btcSum,
                        rubSum: order.rubSum,
                        received: fn.parseDate(order.received),
                        isAccepted: order.isAccepted, 
                        chatId: order.chatId 
                    }
                })
            };
            
            res.render('order', {
                layout: 'admin',
                title: `Заказ #${req.params.id.split('-')[0]}`,
                isOrders: true,
                order: singleOrderList.list,
            });
        }

    });
});

router.post('/:id/accepted', async (req, res) => {
    const data = Object.values(req.body);
    const chatId = data[0]
    const orderId = data[1]

    await fn.acceptOrder(orderId);
    await fn.notifyClient(chatId, orderId)

    setTimeout(() => {
        res.redirect(`/admin/orders/${orderId}`);
    }, 300);
});


router.post('/:id/denied', async (req, res) => {
    const id = Object.values(req.body).toString();
    const order = await fn.denyOrder(id);

    setTimeout(() => {
        res.redirect(`/admin/orders/${id}`);
    }, 300);
});



module.exports = router;