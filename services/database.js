const Sequelize = require('sequelize');
const sequelize = new Sequelize('itaydb884', 'taytay884', 'Thecool1', {
    dialect: 'mysql',
    host: "www.db4free.net",
    port: 3306,
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000
    },
});

class DatabaseService {
    constructor() {

    }

    async insertPooledOrder(pooledOrder) {
        const transaction = await sequelize.transaction();
        try {
            await this.insertCompany(pooledOrder, transaction);
            return await transaction.commit();
        } catch (err) {
            console.log(err);
            console.log('CATCHED');
            return await transaction.rollback();
        }
    }

    async insertCompany(pooledOrder, transaction) {
        await sequelize.query(`
                INSERT INTO itaydb884.company (name, address) 
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

}

module.exports = new DatabaseService();