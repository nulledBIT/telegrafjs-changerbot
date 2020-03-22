const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');

// Подключаемся к MongoDB Atlas...
async function startMongodb() {
    try {
      await mongoose.connect(`mongodb+srv://changebot:dZaWTm3mdzDYRFNm@cluster0-dib2b.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (e) {
        console.log(e);
    }
}
startMongodb();

const config = require('../config');
const app = express();
const fn = require('./functions');

fn.getSettings(config)
    .then(data => {
        const lastIndex = data.length - 1;
        const settings = data[lastIndex];

        config.COMMISSION = settings.commission;
        config.MIN_ORDER_RUB = settings.minOrder;
        config.CARD = settings.paymentCard;
        

        // Импортируем роуты
        const indexRoute = require('./routes/index');
        const adminRoute = require('./routes/admin');
        const ordersRoute = require('./routes/orders');
        const statsRoute = require('./routes/stats');
        const settingsRoute = require('./routes/settings');

        const hbs = exphbs.create({
            defaultLayout: 'main',
            extname: 'hbs'
        });
        
        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        app.set('views', `${__dirname}/views`);



        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.urlencoded({ extended:true }));


        app.use('/', indexRoute);
        app.use('/admin', adminRoute);
        app.use('/admin/orders', ordersRoute);
        app.use('/admin/stats', statsRoute);
        app.use('/admin/settings', settingsRoute);


        // Запускаем сервер...
        app.listen(3000, () => { console.log(`App is running...`) });
    });

