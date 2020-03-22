const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const WizardScene = require('telegraf/scenes/wizard');

//const config = require('../config')
const uuid = require('uuid/v4')
const fn = require('./util/functions')


// Подключаем MongoDB
fn.startMongodb();

// Подключаем сцены
const startScene = require('./controllers/start')
const supportScene = require('./controllers/support')
const convertOptionScene = require('./controllers/convertOption')
// const orderScene = require('./controllers/order')

const btcToOrderWizard = require('./controllers/BTC/btcToOrder')
const rubToOrderWizard = require('./controllers/BTC/rubToOrder')

const stage = new Stage([
    startScene,
    supportScene,
    convertOptionScene,
    btcToOrderWizard,
    rubToOrderWizard
])

const botConfig = require('./bot-config')
const bot = new Telegraf(botConfig.TOKEN)
bot.use(session())
bot.use(stage.middleware())


bot.start(ctx => {
    ctx.scene.enter('start')
});

bot.on('message', (ctx, msg) => {
    const { text } = ctx.update.message;
    const message = text.toLowerCase().split(' ').join('')

    ctx.session.order = {}
    ctx.session.order.id = uuid()
    ctx.session.order.name = ctx.update.message.chat.first_name
    ctx.session.order.chatId = ctx.update.message.chat.id

    switch (message) {
        case 'купитьbtc':
            ctx.scene.enter('convertOption')
            break
        case 'отмена':
            ctx.scene.enter('convertOption')
            break
        case 'поддержка':
            ctx.scene.enter('support')
            break
    }

})


bot.launch()



