const cheerio = require('cheerio');

class OrderService {
    constructor(request) {
        this.request = request;
    }

    async getOrderIds(url) {
        return new Promise(((resolve, reject) => {
            this.request({
                method: 'GET',
                url: url,
            }, (err, res) => {
                if (err) {
                    reject(err);
                }
                console.log('Getting order ids...');
                const pooledOrderIds = [];
                const standardOrderIds = [];
                const $ = cheerio.load(res.body);
                $('span[data-order-id]').each((i, elem) => {
                    const orderId = $(elem).attr()['data-order-id'];
                    if (orderId > 31500000) {
                        standardOrderIds.push(orderId);
                    } else if (orderId > 16700000) {
                        pooledOrderIds.push(orderId);
                    }
                });
                resolve({pooledOrderIds, standardOrderIds});
            })
        }));
    }

    async getJsonOrders(orderIds, url) {
        return new Promise((resolve, reject) => {
            if (!orderIds.length) reject(new Error('No order ids!'));
            const htmlOrders = [];
            orderIds.forEach((orderId) => {
                this.request({
                    method: 'get',
                    url: url + `${orderId}&timestamp=${Date.now()}`,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    htmlOrders.push(res.body);
                    if (htmlOrders.length === orderIds.length) {
                        resolve(htmlOrders);
                    }
                });
            });
        });
    }
}

module.exports = OrderService;