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
    // Companies, how much money they spent. V
    // Salad ingredients | how many time ordered. V
    // Sum of standardOrders costs for today. V
    // Sum of standardOrders costs for the month. V
    // Customers with phone and email. V

    async getData() {
        const sequelize = await this.connectDatabase();
        try {
            const res = {};
            res.mostPopularDishForToday = await this.getMostPopularDishForToday(sequelize);
            res.mostPopularDishForLastMonth = await this.getMostPopularDishForLastMonth(sequelize);
            res.companiesSpendForLastMonth = await this.getCompaniesSpendForLastMonth(sequelize);
            res.saladIngredientCountOrdersForLastMonth = await this.getSaladIngredientCountForLastMonth(sequelize);
            res.ordersSumForLastMonth = await this.getOrdersSumForLastMonth(sequelize);
            res.customers = await this.getCustomers(sequelize);
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
                WHERE so.date > DATE(?) AND so.date < DATE(?)
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
                SELECT c.name, sum(so.price) as price  FROM tenbis1.pooled_order as po
                JOIN tenbis1.standard_order as so ON so.pooled_order_id = po.id
                JOIN tenbis1.company as c ON po.company_id = c.id
                WHERE so.date > DATE(?) AND so.date < DATE(?)
                group by name
                order by price desc`,
            {
                replacements: [before30Days, today],
                type: Sequelize.QueryTypes.SELECT,
            });
    }

    async getSaladIngredientCountForLastMonth(sequelize) {
        const today = new Date();
        const before30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return await sequelize.query(`
        SELECT si.name, count(si.name) as orders FROM standard_order so
        JOIN order_to_dish otd on otd.order_id = so.id
        JOIN dish on dish.id = otd.dish_id
        JOIN dish_to_salad_ingredient dtsi on dtsi.dish_id = dish.id
        JOIN salad_ingredient si on dtsi.salad_ingredient_id = si.id
        WHERE so.date > DATE(?) AND so.date < DATE(?)
        GROUP by si.name
        ORDER BY count(si.name) DESC;`,
            {
                replacements: [before30Days, today],
                type: Sequelize.QueryTypes.SELECT,
            });
    }

    async getOrdersSumForLastMonth(sequelize) {
        const today = new Date();
        const before30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return await sequelize.query(`
        SELECT date, sum(price) as total_order_price FROM tenbis1.standard_order
        WHERE date > DATE(?) AND date < DATE(?)
        GROUP BY date
        ORDER BY date DESC`,
            {
                replacements: [before30Days, today],
                type: Sequelize.QueryTypes.SELECT,
            });
    }

    async getCustomers(sequelize) {
        const today = new Date();
        const before30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return await sequelize.query(`
        SELECT TRIM(name) as name, phone, email FROM tenbis1.customer
        ORDER BY TRIM(name) ASC`,
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