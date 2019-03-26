const cheerio = require('cheerio');

class ParseService {
    constructor() {
    }

    mapPooledHtmlOrderToOrder(htmlOrder) {
        const order = {
            companyName: null,
            saladIngredients: [],
            dishName: null,
            dishPrice: null,
            customerName: null,
            customerPhone: null
        };
        const $ = cheerio.load(htmlOrder);
        order.companyName = $('.OrderCustomerBoldClass.CustomerHighlightData').first().text().trim();
        order.customerName = $('.PooledOrderSerialNumberClass .CustomerHighlightData').text();
        order.customerPhone = $('.PooledOrderSerialNumberClass').children()[6].next.data.trim();
        order.dishPrice = +$('[style="text-decoration: underline;"]').text().trim().substring(1);
        const fullDishName = $('.OrderDishNameClass').text();
        order.dishName = fullDishName.substring(fullDishName.indexOf('>>') + 2).trim();
        $('.OrderItemsSubDescClass').each((i, elem) => {
            order.saladIngredients.push(elem.children[0].data.trim());
        });
        console.log(order);
        return order;
    }

}

module.exports = new ParseService();

