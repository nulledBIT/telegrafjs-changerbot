const axios = require('axios');
const mongoose = require('mongoose');
const config = require('../../config')
const mongoURL = 'mongodb+srv://changebot:dZaWTm3mdzDYRFNm@cluster0-dib2b.mongodb.net/test?retryWrites=true&w=majority'


const settingsSchema = require('../models/settings');
const Settings = mongoose.model('settings', settingsSchema);


const functions = {

    getMessages() {
        const messages = require('./messages')
        return messages
    },

    getKeyboards() {
        const keyboards = require('./keyboards')
        return keyboards
    },

    async getSettings() {
        return await Settings.find({}, (err, settings) => {
            if (err) {
                console.log(err);
            } else {
                return settings;
            }
        });
    },

    // Подключаемся к бд...
    async startMongodb() {
        try {
          await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
          console.log('MongoDB is connected')
        } catch (e) {
            console.log(e);
        }
    },

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

    isMinOrder(rub) {
        return +rub >= config.MIN_ORDER_RUB ? true : false;
    },

    getCommission(sum) {
        const commission =  sum * (config.COMMISSION / 100);
        return commission.toFixed(0);
    },

    saveOrder(id, data) {
        const chatMsg = this.getMessages();
        const order = new Order(data);
        console.log(data);
        const orderId = data.id.split('-')[0];

        bot.sendMessage(id, `Ваш заказ #${orderId} ${chatMsg.main.paymentProcessDesc}`, {
            reply_markup: {
                keyboard: kb.regular.mainNavKeyboard,
                resize_keyboard: true
            }
        });

        // return order.save((err, orders) => {
        //     if (err) {
        //         bot.sendMessage(id, `На сервере возникла ошибка! Попробуйте еще раз.`, {
        //             reply_markup: {
        //                 keyboard: kb.regular.mainNavKeyboard,
        //                 resize_keyboard: true
        //             }
        //         });
        //         throw err;
        //     } else {
        //         const orderId = data.id.split('-')[0];
        //         bot.sendMessage(id, `Ваш заказ #${orderId} ${chatMsg.main.paymentProcessDesc}`, {
        //             reply_markup: {
        //                 keyboard: kb.regular.mainNavKeyboard,
        //                 resize_keyboard: true
        //             }
        //         });
        //     }
        // });
        
    },


};

module.exports = functions;