const config = require('../../config');

const messages = {
    main: {
        hello1: `Здравствуйте, `,
        hello2: `Для покупки доступен только BTC.\nЖелаете приобрести? 🤔`,
        buyBTC: `Выберите способ расчета суммы`,
        support: `❓ОНЛАЙН ПОДДЕРЖКА\nОператор отвечает с 09 до 23 по МСК\n\n- https://t.me/BtcOneChange\n- https://t.me/BtcOneChange\n- https://t.me/BtcOneChange\n\nНапишите свой вопрос и ожидайте ответа.`,
        countOnBTC: `Сколько BTC покупаете? 🤔\n(в формате 0.ХХХXXX)`,
        countOnRUB: `На какую сумму RUB покупаете BTC?`,
        paymentWarning: '❗️Не принимаем оплату на Сбербанк с номера 900\n❗️Вводите точную сумму, которую Вам указал бот\n❗️При не соблюдении данных правил - деньги возврату не подлежат\n\nВы готовы получить реквизиты для оплаты? 🤔',
        paymentDesc: `- Если Вы оплатили не точную сумму бот не выдаст код!\n- Как оплатите, нажмите на кнопку "Я оплатил"`,
        paymentProcessDesc: `Заявка обрабатывается вручную нашим оператором не более 20 минут.\nОжидайте подтверждения! 😉`,
        typeYourBtcWallet: `Укажите свой <strong>BTC кошелек</strong> ниже:`
    },
    error: {
        notCorrectBtc: `Введите корректное кол-во BTC <strong>в формате 0.XXXXXX</strong>!`,
        notCorrectBtc: `Введите корректную сумму в BTC <strong>в формате 0.XXXXXX</strong>!`,
        isMinOrder: `Минимальная сумма покупки BTC - <strong>500 RUB</strong>!`
    }
};

module.exports = messages;

