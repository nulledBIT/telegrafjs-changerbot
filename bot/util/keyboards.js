const Telegraf = require('telegraf')
const { Markup, Extra } = require('telegraf')

// const keyboards = {
//     regular: {
//         mainNavKeyboard: [['Купить BTC'], ['Поддержка']],
//         cancelNavKeyboard: [['Отмена'], ['Поддержка']],
//         updateOrderNavKeyboard: [['Проверить заказ'], ['Поддержка']],

//     },
//     inline: {
//         onCountInlineKeyboard: [
//             {
//                 text: 'Количество BTC',
//                 callback_data: 'countOnBTC'
//             },
//             {
//                 text: 'Сумма в RUB',
//                 callback_data: 'countOnRUB'
//             }
//         ],
//         onAgreePaymentInlineKeyboard: [
//             {
//                 text: '👉🏻 Перейти к оплате',
//                 callback_data: 'agreePayment'
//             }
//         ],
//         onConfirmInlineKeyboard: [
//             {
//                 text: '👌🏻 Я оплатил',
//                 callback_data: 'confirmPayment'
//             }
//         ]
//     }
// };

const keyboards = {}

keyboards.mainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('Купить BTC'),
        m.callbackButton('Поддержка')
    ]).resize())


keyboards.adminMainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('👌🏻')
    ]).resize())

keyboards.orderMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard([
        m.callbackButton('Отмена'),
        m.callbackButton('Поддержка')
    ]).resize())

keyboards.chooseConvert = Telegraf.Extra
.markdown()
.markup((m) => m.inlineKeyboard([
    m.callbackButton('Количество BTC', 'btcToOrder'),
    m.callbackButton('Сумма в RUB', 'rubToOrder')
]))

keyboards.moveToPayment = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('👉🏻 Перейти к оплате', 'moveToPayment')
    ]))

keyboards.confirmPayment = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
        m.callbackButton('👉🏻 Я оплатил', 'confirmPayment')
    ]))

module.exports = keyboards;