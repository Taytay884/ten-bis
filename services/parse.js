const cheerio = require('cheerio');
const PooledOrder = require('../model/pooled.order.model');
const StandardOrder = require('../model/standard.order.model');
const Dish = require('../model/dish.model');
const Customer = require('../model/customer.model');
const SaladIngredient = require('../model/salad-ingredient.model');

const jsonStandardOrders = [{
    "OrderID": 31734028,
    "ResName": "למון ליים בר סלטים",
    "Remarks": "",
    "userDoNotWantCutlery": false,
    "SubmitTime": "/Date(1553677320000)/",
    "HasTenBisPayment": true,
    "HasCashPayment": false,
    "HasPaypalPayment": false,
    "HidePrice": false,
    "SerialNumber": 1,
    "User": {
        "Name": "מעיין זילברמן",
        "Phone01": "054-545359",
        "Phone02": "0502226546",
        "Email": "maayan.zilberman@nstimg.com",
        "HasPhone02": false,
        "HasPhone01": false,
        "ShowPhone02": true,
        "ShowPhone01": true
    },
    "Payment": {
        "TotalDishPrice": 40,
        "TotalPriceToCharge": 38,
        "DeliveryPrice": 0,
        "DeliveryPriceStr": null,
        "DeliveryDiscount": 0,
        "CouponDiscount": -2,
        "CouponName": "5% הנחה",
        "TenBisPayment": 38,
        "CashPayment": 0,
        "CashPaymentStr": null,
        "PaypalPayment": 0,
        "Tax": 0,
        "TaxStr": "₪0.00",
        "Tip": 0,
        "TipStr": null,
        "Creditcard": null,
        "CreditProcessProvidor": "Tranzila",
        "DiscountCouponID": 115075,
        "DiscountCouponCaption": "5% הנחה",
        "DiscountCouponCaptionForRes": "5% הנחה ע\"ח המסעדה",
        "DiscountCouponDiscount": -2,
        "DiscountCouponBenefitPayer": "Restaurant",
        "IsResDiscountCouponBenefitPayer": true,
        "HasTax": false,
        "HasTip": false
    },
    "Dishes": [
        {
            "ID": 803978,
            "Name": "סלט גדול בהרכבה אישית",
            "Remarks": null,
            "AssignedUserName": "ירון כהן",
            "DishCategory": "סלט בהרכבה",
            "Choices": [
                {
                    "ID": 409456,
                    "Desc": "לחם לבחירה:",
                    "Subs": [
                        {
                            "ID": 2356715,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "ג'בטינה כפרית (קמח מלא)"
                        }
                    ]
                },
                {
                    "ID": 260444,
                    "Desc": "בחר/י את מרכיבי הסלט:",
                    "Subs": [
                        {
                            "ID": 1445823,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "עלי בייבי"
                        },
                        {
                            "ID": 1445824,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "עגבניה"
                        },
                        {
                            "ID": 1445825,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "מלפפון"
                        },
                        {
                            "ID": 1445826,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "גזר"
                        },
                        {
                            "ID": 1445827,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "פלפל צבעוני"
                        },
                        {
                            "ID": 1445838,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "פטרוזיליה"
                        },
                        {
                            "ID": 1445840,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "כוסברה"
                        },
                        {
                            "ID": 1596556,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "גרעיני חמנייה"
                        },
                        {
                            "ID": 1837314,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "בורגול"
                        },
                        {
                            "ID": 2365117,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "סלק חי "
                        }
                    ]
                },
                {
                    "ID": 260441,
                    "Desc": "בחר/י תוספת בתשלום לסלט:",
                    "Subs": [
                        {
                            "ID": 1596558,
                            "Price": 3,
                            "PriceStr": "₪3.00",
                            "Desc": "בטטה"
                        },
                        {
                            "ID": 2548022,
                            "Price": 4,
                            "PriceStr": "₪4.00",
                            "Desc": "אנטיפסטי - חציל, גזר, דלורית, בצל לבן בתיבול"
                        }
                    ]
                },
                {
                    "ID": 260443,
                    "Desc": "בחר/י שני רטבים:",
                    "Subs": [
                        {
                            "ID": 1445808,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "לימון"
                        },
                        {
                            "ID": 1445809,
                            "Price": 0,
                            "PriceStr": "₪0.00",
                            "Desc": "שמן זית"
                        }
                    ]
                }
            ],
            "Desc": "סלט 1000 מ\"ל מוגש עם שני רטבים לבחירה ופחמימה לבחירה!\n",
            "DishPrice": 33,
            "SubsPrice": 7,
            "TotalPrice": 40,
            "TotalPriceStr": "₪40.00",
            "NumOfDishes": 1,
            "HasDesc": true,
            "HasRemarks": false,
            "HasAssignedUserName": true
        }
    ],
    "MealDeals": [],
    "DeliveryAddress": {
        "CompanyName": "Newsight Imaging",
        "AddressLine": "גולדה מאיר 3, נס ציונה ",
        "Entrance": "",
        "DoorName": "",
        "ApartementNumber": "",
        "Floor": "5",
        "AddressRemarks": "",
        "ZipCode": "",
        "HasNameOnDoor": false,
        "HasEntrance": false,
        "HasFloor": true,
        "HasApartementNumber": false,
        "PhoneNumber": "054-545359",
        "HasPhoneNumber": true,
        "HasCompany": true
    },
    "DeliveryMethod": "Delivery",
    "GuestName": null,
    "GuestCompanyName": null,
    "FormatedTimeTitleStr": "ASAP",
    "HasRemarks": false,
    "HasGuest": false,
    "SiteMode": "prod",
    "HasCreditcardPayment": false,
    "ShowFullCreditcardDetails": false,
    "DesiredDeliveryTime": "/Date(1553677323281)/",
    "LastPrintSum": 0,
    "LastPrintTime": "/Date(1553677320000)/",
    "ActionsData": {
        "OrderId": 31734028,
        "ResId": 13779,
        "CurrentStatus": 2,
        "NextStatus": 3,
        "OrderType": 0,
        "HasNotPrintedOrders": false,
        "ShowChangeStatusBtn": true,
        "ShowPrintAndConfirmBtn": true,
        "LastPrintedText": "27/03/2019 11:02:00",
        "HasLastPrintedText": true,
        "ShowContactTenbisBtn": false,
        "SelectedAction": 0,
        "LastOrderIdInPool": 0,
        "DeliveryMethod": "Delivery",
        "DesiredDeliveryTime": "/Date(1553677323281)/",
        "SetEstimatedTimeToArrival": false,
        "GettRideDetails": {
            "OrderId": 0,
            "RideId": null,
            "RideStatus": 0,
            "RideStatusStr": null,
            "RideStatusLastUpdated": "/Date(-62135596800000)/",
            "PickupTime": "/Date(-62135596800000)/",
            "DropoffTime": "/Date(-62135596800000)/",
            "DriverCellPhone": null,
            "DriverName": null,
            "WillPickupAt": "/Date(-62135596800000)/"
        },
        "GettRideEnabled": false
    },
    "ShowSubmitTime": false,
    "AddressDict": {
        "כתובת": "גולדה מאיר 3, נס ציונה. ",
        "חברה": "Newsight Imaging",
        "קומה": "5",
        "טלפון": "054-545359",
        "טלפון 2": "0"
    },
    "TotalStr": "₪38.00",
    "Canceled": false,
    "PickupAddressStr": ""
}];

class ParseService {
    constructor() {
    }

    mapJsonPooledOrdersToOrders(jsonOrders) {
        const orders = jsonOrders.map((jsonOrder) => {
            const orderId = jsonOrder.PooledOrderID;
            const restaurantName = jsonOrder.ResName;
            const companyName = jsonOrder.Address.CompanyName;
            const companyAddress = jsonOrder.Address.AddressLine;
            const totalPrice = jsonOrder.TotalSum;
            const standardOrders = jsonOrder.PrintedOrders.map((standardOrder) => {
                const timestamp = Number(standardOrder.SubmitTime.substring(6, 19)); // Remove /Date(...)/ From "/Date(1553666880000)/"
                const customer = new Customer(standardOrder.User.Name, standardOrder.User.Phone01, standardOrder.User.Email);
                const totalPrice = standardOrder.Payment.TotalDishPrice;
                const address = standardOrder.DeliveryAddress.AddressLine;
                const dishes = standardOrder.Dishes.map((dish) => {
                    const saladIngredients = [];
                    dish.Choices.forEach((choice) => {
                        // Todo: Change it to desc.includes("סלט");
                        if (choice.ID === 519032) { // Salad Ingredients ID.
                            choice.Subs.forEach((sub) => {
                                const saladIngredient = new SaladIngredient(sub.ID, sub.Desc, sub.Price);
                                saladIngredients.push(saladIngredient);
                            })
                        }
                    });
                    return new Dish(dish.ID, dish.Name, dish.TotalPrice, saladIngredients)
                });

                return new StandardOrder(standardOrder.OrderID, timestamp, customer, totalPrice, dishes, address);
            });
            return new PooledOrder(orderId, totalPrice, restaurantName, companyName, companyAddress, standardOrders);
        });
        return orders;
    }

    // Todo: done this shit.
    mapJsonStandardOrdersToOrders(jsonOrders) {
        const orders = jsonOrders.map((jsonOrder) => {

        });
        return orders;
        console.log(jsonOrders);
    }

    mapPooledHtmlOrderToOrder(htmlOrder) {
        const order = {
            companyName: null,
            saladIngredients: [],
            dishName: null,
            dishPrice: null,
            customerName: null,
            customerPhone: null
        };
        const $ = cheerio.load(htmlOrder);
        order.companyName = $('.OrderCustomerBoldClass.CustomerHighlightData').first().text().trim();
        order.customerName = $('.PooledOrderSerialNumberClass .CustomerHighlightData').text();
        order.customerPhone = $('.PooledOrderSerialNumberClass').children()[6].next.data.trim();
        order.dishPrice = +$('[style="text-decoration: underline;"]').text().trim().substring(1);
        const fullDishName = $('.OrderDishNameClass').text();
        order.dishName = fullDishName.substring(fullDishName.indexOf('>>') + 2).trim();
        $('.OrderItemsSubDescClass').each((i, elem) => {
            order.saladIngredients.push(elem.children[0].data.trim());
        });
        console.log(order);
        return order;
    }

}

module.exports = new ParseService();

