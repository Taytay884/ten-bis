const DatabaseService = require('./services/database');
const ParseService = require('./services/parse');
const pooledOrdersMock = require('./mock/pooled-orders');
const parsedPooledOrders = ParseService.parseJsonStringsToJson(pooledOrdersMock);
const pooledOrders = ParseService.mapJsonPooledOrdersToOrders(parsedPooledOrders);
const standardOrdersMock = require('./mock/standard-orders');
const parsedStandardOrders = ParseService.parseJsonStringsToJson(standardOrdersMock);
const standardOrders = ParseService.mapJsonStandardOrdersToOrders(parsedStandardOrders);


init().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log('CATCHED ERROR!');
});

async function init() {
    const sequelize = await DatabaseService.connectDatabase();
    const transaction = await sequelize.transaction();
    try {
        const res = [];
        const insertPooledOrderPromises = pooledOrders.map((pooledOrder) => {
            return DatabaseService.insertPooledOrder(sequelize, transaction, pooledOrder);
        });
        const insertStandardOrdersPromises = standardOrders.map((standardOrder) => {
            return DatabaseService.insertStandardOrder(sequelize, transaction, standardOrder);
        });
        res.push(await Promise.all(insertPooledOrderPromises));
        res.push(await Promise.all(insertStandardOrdersPromises));
        await transaction.commit();
        await sequelize.close();
        return res;
    } catch (err) {
        console.log(err);
        if (sequelize) {
            await sequelize.close();
        }
        if (transaction) {
            await transaction.rollback();
        }
        throw err;
    }
}
