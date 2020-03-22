const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const msg = require('../../util/messages')
const kb = require('../../util/keyboards')

const order = new Scene('order')

order.enter(async ctx => {
    await ctx.reply('Оформляем заказ?')
})

order.leave(async ctx => {
    // ctx.reply('Ты покинул start сцену!')
})

module.exports = order