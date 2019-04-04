axios.get('/get-data')
    .then(res => {
        displayData(res.data);
    })
    .catch(err => {
        displayErrorMessage();
    });

function displayData(data) {
    initMostPopularDishForToday(data.mostPopularDishForToday);
    initCompanyMonthlyReport(data.companiesSpendForLastMonth);
    initCountSaladIngredientsOrdersMonthlyReport(data.saladIngredientCountOrdersForLastMonth);
    initMostPopularDishMonthlyReport(data.mostPopularDishForLastMonth);
    initCustomersReport(data.customers);
    initDailyOrdersTotalEarningMonthlyReport(data.ordersSumForLastMonth);
}

function displayErrorMessage() {
    const bodyElement = document.querySelector('body');
    bodyElement.innerHTML = 'שגיאה, אנא רענן את הדף.'
}

function initMostPopularDishForToday(popularDishesDataForToday) {
    const popularDishTableElement = document.querySelector('#dish-popular-daily-report tbody');
    popularDishesDataForToday.forEach((popularDishData) => {
        const row = createTableRowFromData(popularDishData);
        popularDishTableElement.appendChild(row);
    })
}

function initCompanyMonthlyReport(companiesData) {
    const companyReportTable = document.querySelector('#companies-report tbody');
    companiesData.forEach((companyData) => {
        const companyRowElement = createTableRowFromData(companyData);
        companyReportTable.appendChild(companyRowElement);
    });
}

function initCountSaladIngredientsOrdersMonthlyReport(saladIngredientsData) {
    const saladIngredientReportTable = document.querySelector('#salad-ingredient-report tbody');
    saladIngredientsData.forEach((saladIngredientData) => {
        const row = createTableRowFromData(saladIngredientData);
        saladIngredientReportTable.appendChild(row);
    })
}

function initMostPopularDishMonthlyReport(popularDishesData) {
    const popularDishTableElement = document.querySelector('#dish-popular-report tbody');
    popularDishesData.forEach((popularDishData) => {
        const row = createTableRowFromData(popularDishData);
        popularDishTableElement.appendChild(row);
    })
}

function initCustomersReport(customersData) {
    const customersTableElement = document.querySelector('#customers-report tbody');
    customersData.forEach((customerData) => {
        const row = createTableRowFromData(customerData);
        customersTableElement.appendChild(row);
    })
}

function initDailyOrdersTotalEarningMonthlyReport(dailyOrderEarningsData) {
    const dailyOrderEarningsTableElement = document.querySelector('#daily-earnings-report tbody');
    dailyOrderEarningsData.forEach((dailyOrderEarningData) => {
        const row = createTableRowFromData(dailyOrderEarningData);
        dailyOrderEarningsTableElement.appendChild(row);
    })
}

function createTableRowFromData(dataObject) {
    const rowElement = document.createElement('tr');
    for (let key in dataObject) {
        const colElement = document.createElement('td');
        colElement.innerText = dataObject[key];
        rowElement.appendChild(colElement);
    }
    return rowElement;
}