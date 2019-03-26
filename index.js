const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
// const axios = require('axios');
const requestLib = require('request');
const j = requestLib.jar();
const request = requestLib.defaults({jar: j});
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const cors = require('cors');

const LoginServiceClass = require('./services/login');
const LoginService = new LoginServiceClass(request);
const OrderServiceClass = require('./services/order');
const OrderService = new OrderServiceClass(request);
const ParseService = require('./services/parse');

const LOGIN_URL = 'http://10bis.co.il/reshome/Account/LogOn?ReturnUrl=%2freshome%2f';
const MAIN_URL = 'https://www.10bis.co.il/reshome/';
const STANDARD_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Standard?id=';
const POOLED_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Pooled?id=';

async function initLogin() {
    return await LoginService.login(LOGIN_URL);
}

let response = '<h1>lala</h1>';

// const isLoggedIn = initLogin();
const lala = init();

async function init() {
    const isLoggedIn = await initLogin();
    if (!isLoggedIn) {
        console.log('Not logged in!');
        return;
    }
    j.getCookies(LOGIN_URL).forEach((cookie) => {
        const requestCookie = request.cookie(cookie.key + '=' + cookie.value);
        j.setCookie(requestCookie, MAIN_URL);
        j.setCookie(requestCookie, STANDARD_ORDER_URL);
        j.setCookie(requestCookie, POOLED_ORDER_URL);
    });
    const orderIds = await OrderService.getOrderIds(MAIN_URL);
    console.log(orderIds);
    const pooledHtmlOrders = await OrderService.getOrdersHTML(orderIds.pooledOrderIds, POOLED_ORDER_URL);
    const standardHtmlOrders = await OrderService.getOrdersHTML(orderIds.standardOrderIds, STANDARD_ORDER_URL);
    pooledHtmlOrders.forEach((htmlOrder) => {
        const order = ParseService.mapPooledHtmlOrderToOrder(htmlOrder);
        console.log(order);
    });
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => res.send(response))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
