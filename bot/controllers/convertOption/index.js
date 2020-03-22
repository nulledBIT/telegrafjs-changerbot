const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const msg = require('../../util/messages')
const kb = require('../../util/keyboards')

const convertOption = new Scene('convertOption')

convertOption.enter(async ctx => {
    await ctx.reply(msg.main.buyBTC, kb.chooseConvert)

    convertOption.on('callback_query', ctx => {
        const query = ctx.callbackQuery.data
        
        switch (query) {
            case 'btcToOrder':
                ctx.scene.enter('btcToOrder')
                break
            case 'rubToOrder':
                ctx.scene.enter('rubToOrder')
                break
        }

    })
})

module.exports = convertOption