const Sequelize = require('sequelize');
config = {
    database: 'tenbis1',
    username: 'taytay884',
    password: 'Thecool1',
    host: 'www.db4free.net',
    port: 3306
};

class LoadDatabase {
    constructor() {

    }

    // Get the most popular dish for today. V
    // Get the most popular dish for this month. V
    // Companies, how much money they spent.
    // Salad ingredients | how many time ordered.
    // Sum of standardOrders costs for today.
    // Sum of standardOrders costs for the month.
    // Customers with phone and email.

    async getData() {
        const sequelize = await this.connectDatabase();
        try {
            const res = {};
            res.mostPopularDishForToday = await this.getMostPopularDishForToday(sequelize);
            res.mostPopularDishForLastMonth = await this.getMostPopularDishForLastMonth(sequelize);
            // res.push(await Promise.all());
            await sequelize.close();
            return res;
        } catch (err) {
            console.log(err);
            if (sequelize) {
                await sequelize.close();
            }
            throw err;
        }
    }

    async getMostPopularDishForToday(sequelize) {
        const today = new Date();
        return await sequelize.query(`
                SELECT dish.name as dish_name, count(dish.name) as orders_count FROM standard_order so
                JOIN order_to_dish otd on otd.order_id = so.id
                JOIN dish on dish.id = otd.dish_id
                Where so.date = DATE(?)
                GROUP by dish.name
                ORDER BY count(dish.name) DESC;`,
            {
                replacements: [today],
                type: Sequelize.QueryTypes.SELECT,
            });
    }

    async getMostPopularDishForLastMonth(sequelize) {
        const today = new Date();
        const before30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return await sequelize.query(`
                SELECT dish.name as dish_name, count(dish.name) as orders_count FROM standard_order so
                JOIN order_to_dish otd on otd.order_id = so.id
                JOIN dish on dish.id = otd.dish_id
                Where so.date > DATE(?) AND so.date < DATE(?)
                GROUP by dish.name
                ORDER BY count(dish.name) DESC`,
            {
                replacements: [before30Days, today],
                type: Sequelize.QueryTypes.SELECT,
            });
    }

    async getCompaniesSpendForLastMonth(sequelize) {
        const today = new Date();
        const before30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return await sequelize.query(`
                SELECT dish.name as dish_name, count(dish.name) as orders_count FROM standard_order so
                JOIN order_to_dish otd on otd.order_id = so.id
                JOIN dish on dish.id = otd.dish_id
                Where so.date > DATE(?) AND so.date < DATE(?)
                GROUP by dish.name
                ORDER BY count(dish.name) DESC`,
            {
                replacements: [before30Days, today],
                type: Sequelize.QueryTypes.SELECT,
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

module.exports = new LoadDatabase();