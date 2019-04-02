const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const requestLib = require('request');
const j = requestLib.jar();
const request = requestLib.defaults({jar: j});
const cron = require('node-cron');

const LoginServiceClass = require('./services/login');
const LoginService = new LoginServiceClass(request);
const OrderServiceClass = require('./services/order');
const OrderService = new OrderServiceClass(request);
const ParseService = require('./services/parse');
const DatabaseService = require('./services/database');

const LOGIN_URL = 'http://10bis.co.il/reshome/Account/LogOn?ReturnUrl=%2freshome%2f';
const MAIN_URL = 'https://www.10bis.co.il/reshome/';
const STANDARD_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Standard?id=';
const POOLED_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Pooled?id=';

let response = '<h1>lala</h1>';

cron.schedule('0 22 * * *', init, {});

async function init() {
    try {
        const res = await grabDataAndInsertToDatabase();
        console.log(res);
    } catch (err) {
        // todo: if err === timeout.
        setTimeout(() => init(), 5000);
    }
}

async function grabDataAndInsertToDatabase() {
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
    const jsonStringsPooledOrders = await OrderService.getJsonOrders(orderIds.pooledOrderIds, POOLED_ORDER_URL);
    const jsonStringsStandardOrders = await OrderService.getJsonOrders(orderIds.standardOrderIds, STANDARD_ORDER_URL);
    const jsonPooledOrders = ParseService.parseJsonStringsToJson(jsonStringsPooledOrders);
    const jsonStandardOrders = ParseService.parseJsonStringsToJson(jsonStringsStandardOrders);
    const pooledOrders = ParseService.mapJsonPooledOrdersToOrders(jsonPooledOrders);
    const standardOrders = ParseService.mapJsonStandardOrdersToOrders(jsonStandardOrders);
    const res = await DatabaseService.insertOrdersData(pooledOrders, standardOrders);
    return res;
}

async function initLogin() {
    return await LoginService.login(LOGIN_URL);
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => res.send(response))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
