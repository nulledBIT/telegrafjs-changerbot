const axios = require('axios')
const config = require('../../../config')
const mongoose = require('mongoose');

const addOrderSchema = require('../../models/order');
const Order = mongoose.model('order', addOrderSchema);

const actions = {
    async getBtcCourse() {
        const api = 'https://blockchain.info/ticker';

        return new Promise((resolve, reject) => {
            axios.get(api)
                .then(res => {
                    const course = res.data['RUB'].last;
                    resolve(course);
                });
        });
    },

    async countRubOnBtc(btc) {
        const course = await this.getBtcCourse();
        
        if (course != undefined) {
            const rub = course * +btc;
            const commission =  rub * (config.COMMISSION / 100);
            const result = rub + commission;

            return result.toFixed(0);
        }
    },

    async countBtcOnRub(rub) {
        const course = await this.getBtcCourse();

        const btc = (rub / course);
        const commission =  btc * (config.COMMISSION / 100);
        const result = btc + commission;
        return btc.toFixed(8);
        //return result.toFixed(8);
    },

    getCommission(sum) {
        const commission =  sum * (config.COMMISSION / 100);
        return commission.toFixed(0);
    },

    isMinOrder(rub) {
        return +rub >= config.MIN_ORDER_RUB ? true : false;
    },


    // HANDLERS
    mainNavHandler(ctx, msg) {
        const message = msg.toLowerCase().split(' ').join()

        switch (message) {
            case 'купитьbtc':
                ctx.scene.enter('convertOption')
                break
            case 'отмена':
                ctx.scene.enter('start')
                break
            case 'поддержка':
                ctx.scene.enter('support')
                break
        }
    },

    prepareOrderData(data) {
        const order = {
            id: data.id,
            name: data.name,
            btcWallet: data.wallet,
            btcSum: data.btc,
            rubSum: data.rub,
            chatId: data.chatId
        }
        return order
    },

    saveOrder(data) {
        const order = new Order(data);
        console.log(data);

        return order.save((err, orders) => {
            if (err) {
                console.log('ORDER ERROR!')
                throw err;
                return false
            } else {
                console.log('THE ORDER HAS BEEN SAVED!')
                return true
            }
        });
    },

}

module.exports = actions