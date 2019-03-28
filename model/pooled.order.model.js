class PooledOrder {
    constructor(orderId, totalPrice, restaurantName, companyName, companyAddress, standardOrders) {
        this.totalPrice = totalPrice;
        this.companyAddress = companyAddress;
        this.id = orderId;
        this.restaurantName = restaurantName;
        this.companyName = companyName;
        this.orders = standardOrders;
    }
}

module.exports = PooledOrder;