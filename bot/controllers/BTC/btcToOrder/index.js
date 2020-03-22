const Scene = require('telegraf/scenes/base')
const config = require('../../../../config')
const f = require('../actions')
const msg = require('../../../util/messages')
const kb = require('../../../util/keyboards')
const Wizard = require('telegraf/scenes/wizard')
const telegram = require('telegraf/telegraf')
const botConfig = require('../../../bot-config')

const btcToOrder = new Wizard(
    'btcToOrder',
    (ctx) => {

                

        // Стираем старые данные
        ctx.session.order.btc = 0
        ctx.session.order.rub = 0
        ctx.session.order.wallet = ''

         // Обрабатываем callback запросы... 
         btcToOrder.on('callback_query', ctx => {
            switch (ctx.callbackQuery.data) {
                case 'moveToPayment':
                    ctx.reply('Введите свой BTC кошелек ниже:');
                    return ctx.wizard.next();
                    break

                case 'confirmPayment':
                    const orderId = ctx.session.order.id.split('-')[0]
                    ctx.reply(`Ваш заказ #${orderId} принят. ${msg.main.paymentProcessDesc}`, kb.mainMenu)
                
                    // Отправляем заказ в бд...
                    const orderData = f.prepareOrderData(ctx.session.order)
                    f.saveOrder(orderData)

                    // Отправляем админу уведомление
                    const { name, btc, rub, wallet} = ctx.session.order
                    const link = `https://t.me/${name}`
                    const adminOrderInfo = `Имя ${name}\nBTC ${btc}\nRUB: ${rub} ₽\nКошелек: ${wallet}`
                    ctx.telegram.sendMessage(botConfig.adminId, `ЗАКАЗ #${orderId}\n\n${adminOrderInfo}\n\nОбработаешь? 😏\n${link}\n${link}`)
        
                    return ctx.scene.leave()
                    break
                    
                case 'btcToOrder':
                    ctx.reply(msg.main.countOnBTC, kb.orderMenu)
                    return ctx.wizard.next();
                    break
                    
                default:
                    ctx.reply('Возникла ошибка!')
                    break
                }
        })

        ctx.reply(msg.main.countOnBTC, kb.orderMenu)
        return ctx.wizard.next();
    },
    async (ctx) => {

        // Получаем сумму BTC в RUB
        if (!isNaN(ctx.message.text)) {
            await f.countRubOnBtc(ctx.message.text)
                .then(rub => {
                    ctx.session.order.btc = +ctx.message.text;
                    ctx.session.order.rub = +rub;
                })
            
            const {btc, rub} = ctx.session.order

            if (rub >= config.MIN_ORDER_RUB) {
                ctx.reply(`Для покупки ${btc} BTC\nВам нужно перевести на карту банка ${rub} RUB\n\n${msg.main.paymentWarning}`, kb.moveToPayment);
            } else {
                ctx.reply(`Минимальная сумма ${config.MIN_ORDER_RUB} RUB!\nХотите меньше? -Пишите оператору.\nhttps://t.me/BtcOneChange`, { disable_web_page_preview: true })
                return
            }
        } else {
            f.mainNavHandler(ctx, ctx.message.text)
            return
        }

    },
    async ctx => {
        ctx.session.order.wallet = ctx.message.text;

        if (ctx.message.text === 'Отмена') {
            f.mainNavHandler(ctx, ctx.message.text)
        } else {
            ctx.reply(`ВНИМАНИЕ, КЛИЕНТ! ❗️❗️❗️\nУ Вас есть 40 минут чтобы перевести ${ctx.session.order.rub} RUB на карту:\n👉🏻 ${config.CARD} (БЕЗ КОММЕНТАРИЕВ!)\n\n${msg.main.paymentDesc}`, kb.confirmPayment)
        }
    }
)

btcToOrder.leave(ctx => {
    // ...
})


module.exports = btcToOrder