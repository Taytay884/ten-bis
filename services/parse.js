const PooledOrder = require('../model/pooled.order.model');
const StandardOrder = require('../model/standard.order.model');
const Dish = require('../model/dish.model');
const Customer = require('../model/customer.model');
const SaladIngredient = require('../model/salad-ingredient.model');

class ParseService {
    constructor() {
    }

    mapJsonPooledOrdersToOrders(jsonOrders) {
        const orders = jsonOrders.map((jsonOrder) => {
            const orderId = jsonOrder.PooledOrderID;
            const restaurantName = jsonOrder.ResName;
            const companyName = jsonOrder.Address.CompanyName;
            const companyAddress = jsonOrder.Address.AddressLine;
            const totalPrice = jsonOrder.TotalSum;
            const standardOrders = jsonOrder.PrintedOrders.map((standardOrder) => {
                return this.parseJsonStandardOrderToStandardOrder(standardOrder);
            });
            return new PooledOrder(orderId, totalPrice, restaurantName, companyName, companyAddress, standardOrders);
        });
        return orders;
    }

    mapJsonStandardOrdersToOrders(jsonOrders) {
        const orders = jsonOrders.map((jsonOrder) => {
            const order = this.parseJsonStandardOrderToStandardOrder(jsonOrder);
            return order;
        });
        return orders;
    }

    parseJsonStandardOrderToStandardOrder(standardOrder) {
        const timestamp = Number(standardOrder.SubmitTime.substring(6, 19)); // Remove /Date(...)/ From "/Date(1553666880000)/"
        let customerPhoneNumber = this.checkPhoneIsValid(standardOrder.User.Phone01) ? standardOrder.User.Phone01 : null;
        if (!customerPhoneNumber) {
            customerPhoneNumber = this.checkPhoneIsValid(standardOrder.User.Phone02) ? standardOrder.User.Phone02 : null;
        }
        const customer = new Customer(standardOrder.User.Name, customerPhoneNumber, standardOrder.User.Email);
        const totalPrice = standardOrder.Payment.TotalDishPrice;
        const address = standardOrder.DeliveryAddress.AddressLine;
        const dishes = standardOrder.Dishes.map((dish) => {
            const saladIngredients = [];
            dish.Choices.forEach((choice) => {
                if (choice.Desc) {
                    if (choice.Desc.includes("סלט")) { // Salad Ingredients ID.
                        choice.Subs.forEach((sub) => {
                            const saladIngredient = new SaladIngredient(sub.ID, sub.Desc, sub.Price);
                            saladIngredients.push(saladIngredient);
                        })
                    }
                }
            });
            return new Dish(dish.ID, dish.Name, dish.TotalPrice, saladIngredients)
        });

        return new StandardOrder(standardOrder.OrderID, timestamp, customer, totalPrice, dishes, address);
    }

    checkPhoneIsValid(phone) {
        return (phone && phone.length === 10 && phone.match(/^[0-9]+$/) != null);
    }

    parseJsonStringsToJson(JsonStrings) {
        return JsonStrings.map((jsonString) => JSON.parse(jsonString));
    }

}

module.exports = new ParseService();

