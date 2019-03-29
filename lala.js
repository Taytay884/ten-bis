const DatabaseService = require('./services/database');

const pooledOrder = {
    "totalprice": 75.2,
    "companyAddress": "הגלבוע  4, איירפורט סיטי ",
    "id": 16871500,
    "restaurantName": "למון ליים בר סלטים",
    "companyName": "SodaStream",
    "orders": [
        {
            "id": 31752612,
            "date": "2019-03-28T08:24:00.000Z",
            "customer": {
                "name": "ריטה ג`וב",
                "phone": null,
                "email": "Ritaj@sodastream.com"
            },
            "dishes": [
                {
                    "id": 1480839,
                    "name": "כריך עוף מקסיקני",
                    "price": 40,
                    "saladIngredients": [
                        {
                            "id": 1445824,
                            "price": 0,
                            "name": "עגבניה"
                        },
                        {
                            "id": 1445825,
                            "price": 0,
                            "name": "מלפפון"
                        },
                        {
                            "id": 1445826,
                            "price": 0,
                            "name": "גזר"
                        },
                        {
                            "id": 1445827,
                            "price": 0,
                            "name": "פלפל צבעוני"
                        },
                        {
                            "id": 1445830,
                            "price": 0,
                            "name": "קולורבי"
                        },
                        {
                            "id": 1445837,
                            "price": 0,
                            "name": "סלרי"
                        },
                        {
                            "id": 1445842,
                            "price": 0,
                            "name": "בזיליקום"
                        },
                        {
                            "id": 1445848,
                            "price": 0,
                            "name": "פרוסות זיתים ירוקים"
                        },
                        {
                            "id": 2365117,
                            "price": 0,
                            "name": "סלק חי "
                        },
                        {
                            "id": 2380277,
                            "price": 0,
                            "name": "קוביות מלפפון חמוץ"
                        }
                    ]
                }
            ],
            "address": "הגלבוע  4, איירפורט סיטי ",
            "price": 40
        },
        {
            "id": 31752785,
            "date": "2019-03-28T08:25:00.000Z",
            "customer": {
                "name": "ניצן גולד",
                "phone": null,
                "email": "NitzanG@sodastream.com"
            },
            "dishes": [
                {
                    "id": 1181296,
                    "name": "סלט עוף מקסיקני - מומלץ",
                    "price": 40,
                    "saladIngredients": []
                }
            ],
            "address": "הגלבוע  4, איירפורט סיטי ",
            "price": 40
        }
    ]
};

init().then(() => {
    console.log('done!');
}).catch((err) => {
    console.log('CATCHED ERROR!');
});

async function init() {
    const sequelize = await DatabaseService.connectDatabase();
    let res;
    try {
        res = await DatabaseService.insertPooledOrder(sequelize, pooledOrder)
    } catch (err) {
        console.log(err);
        sequelize.close();
        throw err;
    }
    sequelize.close();
    return res;
}

