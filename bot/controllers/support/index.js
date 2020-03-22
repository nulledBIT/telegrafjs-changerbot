const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const msg = require('../../util/messages')
const kb = require('../../util/keyboards')

const telegram = require('telegraf/telegram')
const support = new Scene('support')

support.enter(async ctx => {
    await ctx.reply(msg.main.support, { disable_web_page_preview: true } )
})

module.exports = support