const Sequelize = require('sequelize');
config = {
    database: 'tenbis1',
    username: 'taytay884',
    password: 'Thecool1',
    host: 'www.db4free.net',
    port: 3306
};

class DatabaseService {
    constructor() {

    }

    async insertPooledOrder(sequelize, pooledOrder) {
        const transaction = await sequelize.transaction();
        try {
            const res = {};
            res.insertCompany = await this.insertCompany(sequelize, pooledOrder, transaction);
            res.insertCustomers = await this.insertCustomers(sequelize, pooledOrder, transaction);
            res.insertDishes = await this.insertDishes(sequelize, pooledOrder, transaction);
            res.insertSaladIngredients = await this.insertSaladIngredients(sequelize, pooledOrder, transaction);
            res.insertPooledOrderData = await this.insertPooledOrderData(sequelize, transaction, pooledOrder.id, pooledOrder.companyName, pooledOrder.restaurantName);
            res.insertStandOrderData = await this.insertStandardOrdersData(sequelize, transaction, pooledOrder);
            // todo: insert order to dish.
            // todo: insert dish to salad ingredient.
            await transaction.commit();
            return res;
        } catch (err) {
            console.log('CATCHED');
            await transaction.rollback();
            throw err;
        }
    }

    async insertCompany(sequelize, pooledOrder, transaction) {
        return await sequelize.query(`
                INSERT INTO tenbis1.company (name, address) 
                VALUES (?, ?)`,
            {
                replacements: [pooledOrder.companyName, pooledOrder.companyAddress],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertCustomers(sequelize, pooledOrder, transaction) {
        const promises = pooledOrder.orders.map((order) => {
            return this.insertCustomer(sequelize, transaction, order.customer.name, order.customer.phone, order.customer.email);
        });
        return Promise.all(promises);
    }

    async insertCustomer(sequelize, transaction, name, phone, email) {
        return await sequelize.query(`
                INSERT INTO tenbis1.customer (name, phone, email) 
                VALUES (?, ?, ?)`,
            {
                replacements: [name, phone, email],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertDishes(sequelize, pooledOrder, transaction) {
        const promises = pooledOrder.orders.map((order) => {
            return order.dishes.map((dish) => {
                return this.insertDish(sequelize, transaction, dish.id, dish.name, dish.price);
            });
        });
        return Promise.all(promises);
    }

    async insertDish(sequelize, transaction, id, name, price) {
        return await sequelize.query(`
                INSERT INTO tenbis1.dish (id, name, price) 
                VALUES (?, ?, ?)`,
            {
                replacements: [id, name, price],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertSaladIngredients(sequelize, pooledOrder, transaction) {
        const promises = pooledOrder.orders.map((order) => {
            return order.dishes.map((dish) => {
                return dish.saladIngredients.map((saladIngredient) => {
                    return this.insertSaladIngredient(sequelize, transaction, saladIngredient.id, saladIngredient.name, saladIngredient.price);
                });
            });
        });
        return Promise.all(promises);
    }

    async insertSaladIngredient(sequelize, transaction, id, name, price) {
        return await sequelize.query(`
                INSERT INTO tenbis1.salad_ingredient (id, name, price) 
                VALUES (?, ?, ?)`,
            {
                replacements: [id, name, price],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertPooledOrderData(sequelize, transaction, pooledOrderId, companyName, restaurantName) {
        return await sequelize.query(`
                INSERT INTO tenbis1.pooled_order (id, company_id, restaurant_name) 
                VALUES (?, (SELECT tenbis1.company.id
                         FROM tenbis1.company
                         WHERE tenbis1.company.name = ?)
                         , ?)`,
            {
                replacements: [pooledOrderId, companyName, restaurantName],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            });
    }

    async insertStandardOrdersData(sequelize, transaction, pooledOrder) {
        const promises = pooledOrder.orders.map((order) => {
            return this.insertStandardOrderData(
                sequelize,
                transaction,
                order.id,
                new Date(order.date),
                order.price,
                order.address,
                pooledOrder.id,
                order.customer)
        });
        return Promise.all(promises);
    }

    async insertStandardOrderData(sequelize, transaction, orderId, date, price, address, pooledOrderId, customer) {
        return await sequelize.query(`
                INSERT INTO tenbis1.standard_order (id, date, price, address, pooled_order_id, customer_id) 
                VALUES (?, ?, ?, ?, ?,
                       (SELECT tenbis1.customer.id
                       FROM tenbis1.customer
                       WHERE tenbis1.customer.name = ? AND customer.email = ?))`,
            {
                replacements: [orderId, date, price, address, pooledOrderId, customer.name, customer.email],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            });
    }

    async connectDatabase() {
        return new Sequelize(config.database, config.username, config.password, {
            dialect: 'mysql',
            host: config.host,
            port: config.port,
            pool: {
                max: 15,
                min: 5,
                idle: 20000,
                evict: 15000,
                acquire: 30000
            },
        });
    }

}

module.exports = new DatabaseService();