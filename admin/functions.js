const fs = require('fs')
const path = require('path')
const Telegram = require('telegraf/telegram')
const botConfig = require('../bot/bot-config')
const telegram = new Telegram(botConfig.TOKEN)

const config = require('../config');
const mongoose = require('mongoose');

const orderSchema = require('./models/order');
const Order = mongoose.model('orders', orderSchema);

const settingsSchema = require('./models/settings');
const Settings = mongoose.model('settings', settingsSchema);

const functions = {

    // ORDERS HANDLERS

    async notifyClient(chat, order) {
        const orderId = order.split('-')[0]
        telegram.sendMessage(chat, `Ваш заказ #${orderId} успешно выполнен!`)
    },

    async getAllOrders() {
        return await Order.find({}, (err, orders) => {
            if (err) {
                console.log(err);
            } else {
                const allOrdersList = {
                    list: orders.map(order => {
                        return {
                            id: order.id,
                            name: order.name,
                            btcWallet: order.btcWallet,
                            btcSum: order.btcSum,
                            rubSum: order.rubSum,
                            received: this.parseDate(order.received),
                            isAccepted: order.isAccepted       
                        }
                    })
                };
                return allOrdersList.list[0];
            }
        });
    },

    async getOrderById(id) {
        return await Order.find({ id: id}, (err, orders) => {
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
                            received: this.parseDate(order.received),
                            isAccepted: order.isAccepted       
                        }
                    })
                };
                return singleOrderList
            }
    
        });
    },
    
    async acceptOrder(id) {
        return this.getOrderById(id)
            .then(orderData => {
                const data = orderData[0]

                data.isAccepted = true;
                const order = new Order(data);
                order.save((err, order) => {
                    if (err) throw err;
                });

                return data;
            });
    },

    async denyOrder(id) {
        return this.getOrderById(id)
            .then(orderData => {
                const data = orderData[0]
                
                data.isAccepted = false;
                const order = new Order(data);

                order.save((err, order) => {
                    if (err) throw err; 
                });

                return data;
            });
    },


    // CONFIG HANDLERS
    async getSettings(config) {
        return await Settings.find({}, (err, settings) => {
            if (err) {
                console.log(err);
            } else {
                return settings;
            }
        });
    },
    
    async updateSettings(data) {

        const config = JSON.stringify(data)
        
        try {
            const conf = fs.writeFileSync(path.join(__dirname, '../', 'conf.json'), config)
        } catch (err) {
            console.log(err)
        }

        //const settingHandler = new Settings(config);

        // await settingHandler.save(err => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('Settings have been updated!');
        //     }
        // });
    },


    //OTHER HANDLERS
    parseDate(date) {
        const mnth = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        const result = `${d}/${mnth} ${h}:${m}`;
        return result;
    },
};

module.exports = functions;