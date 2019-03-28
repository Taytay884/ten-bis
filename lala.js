const DatabaseService = require('./services/database');

const pooledOrder = {
    "totalPrice": 75.2,
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
                    "saladIngredients": []
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

DatabaseService.insertPooledOrder(pooledOrder)
.then(() => {
    console.log('Done!');
})
.catch((err) => {
    console.log(err);
});