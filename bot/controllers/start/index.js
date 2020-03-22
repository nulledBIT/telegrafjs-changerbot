
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const msg = require('../../util/messages')
const kb = require('../../util/keyboards')
const telegram = require('telegraf/telegram')
const botConfig = require('../../bot-config')
const start = new Scene('start')

start.enter(async ctx => {

    const isAdmin = ctx.chat.id === botConfig.adminId ? true : false

    if (isAdmin) {
        await ctx.reply(`Приветствую, ${ctx.chat.first_name}! Ты у нас вроде админ 😏`, kb.adminMainMenu)
        await ctx.reply('Готов принимать заказы?')
    } else {
        const {first_name} = await ctx.chat
        await ctx.reply(msg.main.hello1 + first_name, kb.mainMenu)
        await ctx.reply(msg.main.hello2)
    }
})

module.exports = start