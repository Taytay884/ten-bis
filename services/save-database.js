const Sequelize = require('sequelize');
config = {
    database: 'tenbis1',
    username: 'taytay884',
    password: 'Thecool1',
    host: 'www.db4free.net',
    port: 3306,
};

class SaveDatabaseService {
    constructor() {

    }

    async insertOrdersData(pooledOrders, standardOrders) {
        console.log('Connecting to databse...');
        const sequelize = await this.connectDatabase();
        console.log('Creating a transaction...');
        const transaction = await sequelize.transaction();
        console.log('Inserting data to database...');
        try {
            const res = [];
            const insertPooledOrderPromises = pooledOrders.map((pooledOrder) => {
                return this.insertPooledOrder(sequelize, transaction, pooledOrder);
            });
            const insertStandardOrdersPromises = standardOrders.map((standardOrder) => {
                return this.insertStandardOrder(sequelize, transaction, standardOrder);
            });
            res.push(await Promise.all(insertPooledOrderPromises));
            res.push(await Promise.all(insertStandardOrdersPromises));
            await transaction.commit();
            console.log('Transaction committed.');
            await sequelize.close();
            console.log('Database connection closed.');
            return res;
        } catch (err) {
            console.log(err);
            if (transaction) {
                await transaction.rollback();
            }
            if (sequelize) {
                await sequelize.close();
            }
            throw err;
        }
    }

    async insertPooledOrder(sequelize, transaction, pooledOrder) {
        const res = {};
        res.insertCompany = await this.insertCompany(sequelize, pooledOrder, transaction);
        res.insertPooledOrderData = await this.insertPooledOrderData(sequelize, transaction, pooledOrder.id, pooledOrder.companyName, pooledOrder.restaurantName);
        const promises = pooledOrder.orders.map((standardOrder) => {
            return this.insertStandardOrder(sequelize, transaction, standardOrder, pooledOrder.id);
        });
        res.insertStandardOrders = await Promise.all(promises);
        return res;
    }

    async insertStandardOrder(sequelize, transaction, standardOrder, pooledOrderId) {
        const res = {};
        res.insertCustomer = await this.insertCustomer(
            sequelize,
            transaction,
            standardOrder.customer.name,
            standardOrder.customer.phone,
            standardOrder.customer.email
        );
        res.insertDishes = await this.insertDishes(sequelize, standardOrder, transaction);
        res.insertSaladIngredients = await this.insertSaladIngredients(sequelize, standardOrder, transaction);
        res.insertStandOrderData = await this.insertStandardOrdersData(sequelize, transaction, standardOrder, pooledOrderId);
        res.insertStandardOrdersToDishes = await this.insertStandardOrdersToDishes(sequelize, transaction, standardOrder);
        res.insertDishesToSaladIngredients = await this.insertDishesToSaladIngredients(sequelize, transaction, standardOrder);
        console.log('ORDER ID: ', standardOrder.id);
        return res;
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

    async insertDishes(sequelize, standardOrder, transaction) {
        const promises = standardOrder.dishes.map((dish) => {
            return this.insertDish(sequelize, transaction, dish.id, dish.name, dish.price);
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

    async insertSaladIngredients(sequelize, standardOrder, transaction) {
        const promises = standardOrder.dishes.map((dish) => {
            return dish.saladIngredients.map((saladIngredient) => {
                return this.insertSaladIngredient(sequelize, transaction, saladIngredient.id, saladIngredient.name, saladIngredient.price);
            });
        });
        return Promise.all(promises);
    }

    async insertSaladIngredient(sequelize, transaction, id, name, price) {
        return await sequelize.query(`
                INSERT INTO tenbis1.salad_ingredient (name) 
                VALUES (?)`,
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
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertStandardOrdersData(sequelize, transaction, standardOrder, pooledOrderId) {
        return this.insertStandardOrderData(
            sequelize,
            transaction,
            standardOrder.id,
            new Date(standardOrder.date),
            standardOrder.price,
            standardOrder.address,
            pooledOrderId,
            standardOrder.restaurantName,
            standardOrder.customer);
    }

    async insertStandardOrderData(sequelize, transaction, orderId, date, price, address, pooledOrderId, restaurantName, customer) {
        return await sequelize.query(`
                INSERT INTO tenbis1.standard_order (id, date, price, address, pooled_order_id, restaurant_name, customer_id) 
                VALUES (?, ?, ?, ?, ?, ?,
                       (SELECT tenbis1.customer.id
                       FROM tenbis1.customer
                       WHERE tenbis1.customer.name = ? AND customer.email = ?))`,
            {
                replacements: [orderId, date, price, address, pooledOrderId, restaurantName, customer.name, customer.email],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch((err) => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        });
    }

    async insertStandardOrdersToDishes(sequelize, transaction, standardOrder) {
        const promises = standardOrder.dishes.map((dish) => {
            return this.insertStandardOrderToDish(sequelize, transaction, standardOrder.id, dish.id);
        });
        return Promise.all(promises);
    }

    async insertStandardOrderToDish(sequelize, transaction, orderId, dishId) {
        return await sequelize.query(`
                INSERT INTO tenbis1.order_to_dish (order_id, dish_id) 
                VALUES (?, ?)`,
            {
                replacements: [orderId, dishId],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch(err => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        })
    }

    async insertDishesToSaladIngredients(sequelize, transaction, standardOrder) {
        const promises = standardOrder.dishes.map((dish) => {
            return dish.saladIngredients.map((saladIngredient) => {
                return this.insertDishToSaladIngredient(sequelize, transaction, dish.id, saladIngredient.name);
            });
        });
        return Promise.all(promises);
    }

    async insertDishToSaladIngredient(sequelize, transaction, dishId, saladIngredientName) {
        return await sequelize.query(`
                INSERT INTO tenbis1.dish_to_salad_ingredient (dish_id, salad_ingredient_id) 
                VALUES (?, (SELECT id FROM salad_ingredient WHERE TRIM(name) = TRIM(?)))`,
            {
                replacements: [dishId, saladIngredientName],
                type: Sequelize.QueryTypes.INSERT,
                transaction: transaction
            }).catch(err => {
            if (err.name != 'SequelizeUniqueConstraintError') {
                throw err;
            }
        })
    }

    async connectDatabase() {
        return new Sequelize(config.database, config.username, config.password, {
            dialect: 'mysql',
            host: config.host,
            port: config.port,
            pool: {
                maxIdleTime: 10000
            },
        });
    }

}

module
    .exports = new SaveDatabaseService();