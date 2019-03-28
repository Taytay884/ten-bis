class StandardOrder {
    constructor(orderId, orderTimeStamp, customer, totalPrice, dishes, address) {
        this.id = orderId;
        this.date = new Date(orderTimeStamp);
        this.customer = customer;
        this.dishes = dishes;
        this.address = address;
        this.price = totalPrice;
    }
}

module.exports = StandardOrder;