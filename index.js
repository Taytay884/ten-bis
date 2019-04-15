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
const SaveDatabaseService = require('./services/save-database');
const LoadDatabaseService = require('./services/load-database');

const LOGIN_URL = 'http://10bis.co.il/reshome/Account/LogOn?ReturnUrl=%2freshome%2f';
const MAIN_URL = 'https://www.10bis.co.il/reshome/';
const STANDARD_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Standard?id=';
const POOLED_ORDER_URL = 'https://www.10bis.co.il/reshome/Orders/Pooled?id=';

let scheduleIsRunning = false;

cron.schedule('*/2 * * * *', init, {});

async function init() {
    if (scheduleIsRunning) {
        return;
    }
    scheduleIsRunning = true;
    try {
        await grabDataAndInsertToDatabase();
        console.log('Done scheduled job.')
        scheduleIsRunning = false;
    } catch (err) {
        scheduleIsRunning = false;
        console.log('Error', err);
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
    const res = await SaveDatabaseService.insertOrdersData(pooledOrders, standardOrders);
    return res;
}

async function initLogin() {
    return await LoginService.login(LOGIN_URL);
}

async function getData() {
    return await LoadDatabaseService.getData();
}

express()
    .use(express.static(__dirname + '/frontend'))
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/frontend/index.html'));
    })
    .get('/get-data', async (req, res) => {
        try {
            const data = await getData();
            res.send(data);
        } catch (err) {
            res.status(500).send(new Error( 'Failed to get data.'));
        }
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
