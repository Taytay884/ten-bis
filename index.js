const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const cheerio = require('cheerio');

let response = '<h1>lala</h1>';

const loginUrl = 'https://www.10bis.co.il/reshome/Account/LogOn?ReturnUrl=%2freshome%2f';

init();

async function init() {
    const orderIds = await getOrderIds();
    const pooledHtmlOrders = await getOrdersHTML(orderIds.pooledOrderIds, 'pooled');
    const standardHtmlOrders = await getOrdersHTML(orderIds.standardOrderIds, 'standard');
    console.log('-------------------------------------')
    console.log('------------POOLED-------------------')
    console.log('-------------------------------------')
    console.log(pooledHtmlOrders[0]);
    console.log('-------------------------------------')
    console.log('-------------------------------------')
    console.log('-------------------------------------')
    console.log(standardHtmlOrders[0]);
    console.log('-------------------------------------')
    console.log('------------STANDARD-----------------')
    console.log('-------------------------------------')
    // console.log(pooledHtmlOrders.length);
    // console.log(standardHtmlOrders.length);
    // htmlOrders.forEach((htmlOrder) => {
    //     const order = mapHtmlOrderToOrder(htmlOrder);
    //     console.log(order);
    // });
}

function getOrderIds() {
    return new Promise((resolve, reject) => {
        axios.get('https://www.10bis.co.il/reshome/',
            {
                headers: {
                    Cookie: "cookie1=ResHome.Culture=uiCulture=he-IL&culture=he-IL; ShowDeliveryTimePopup=false; __utmc=26698557; __utmz=26698557.1552935129.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=26698557.621842008.1552935129.1552935129.1553028068.2; __utmt=1; __utmb=26698557.5.10.1553028068; RESHOME.ASPXFORMSAUTH=510A29A5F897CDE3BED9452D3BC71B10A5E0A442CF6CCB796111A5DDF7CF68E5CA2AE56A0A4C38D7074AFC4B76DAB2520554063A14A4CA9346A020919E5226FDB51C7D3FA727B85ABC4BFCD4FD5239C52D8130286B3272CB52C9E501786F865EBB835DC193DEA4E334D50B9EAB104AE685D16514F27ED41305F1DC517B31E4B337A6EA69; ResHomeUserData=BLtVKE9rMjygh+MMWxYzjh0Co+m7fDPGOKfpQr+OVl+q8pS4JzZaV36AWtKrbPL7FCuvaAnlMjo7LgiusObI1p1kMffF5aJrsCxpRPXZVdDBhLj8AH3xkXrQ1SrbjYIr485lQKKK806gc9vM/9nx6zjUZ5IOTOtC4TlwWOaah6aDjxeU4jU9eBAlW5c1vfxyIRIKq5hB33nmLMYLxaA1U+pOQVwt4oS9ZnlotGf7TLtXdZ46WSR0XOvRN5OvP75ccGfZ84PPVSYFrCn38uUKpqq3thTjkkBEH40jTNh1MwuxrfYONo8VQwh8T+sjCP5UMCe/UB8edGMKucLmGk2SI2o3OtDEX/HJwwSiXW4N22Q7eYpCTDsw81PBSjdZkRaeLOPuNIPCZ8Xl8It6QSJy+tzi0SxIPf3j9mi6OItE2RxAAAqI575ya27R775eKomyugRzxZNC6frAUegvJof5ZTd3zgMhuuKSEi1a4vndnS+ot4wEazWFGdS8Vj/DDUEGJS1Fwv49TqBYFVjEAwx458voq+6fvPxYdbqPnZA9UqMB0VTqi2PDiOPZ7xlr4QVhhB/jUDJ0XI6niHzRa/RTWx7KQGJNpekOysklpWXOFWCNUrHBZmy/6T+M6truwL5tdfSSyISeTHhQxEbMFK1V02iQ9miIX61xZY0AfEA3aTKqcGZmHOL/wcrW9WKikJ9xi4n+m/mFQRAXtVWpAnHPBc1I+7Qbu/fUgdg4Gyoj+sigqIuTPlhiiVL7aPN3mJUJ6MMQV1ouP6+pkALiadebewI/wrLYEF9BqRDNbaKtRR2jY2SsQMcexlpnEis1z9SsN2UD8RYylWldwZXzs9N/sqIVjKV28n2HTUdas5Nm6FoMsMI+pL/7mHncOM/AtSZsFxYvxqWQt8kcoClq21ovmDF1CWPf36BFwT0lyuzhCTe/TmfrbBlz0BwNS7IDkNKD5oHVb6mnDJVrtnz7oqQgO2pWLGoLiAVY2tCE9ymvoQtS+Kt8lhWK0CHvyRB1tn1RMsLbK1PzWh+vCzRTIkwLfqn1kMDu22oBc28mZl48kdeGnIV/ft7uvEzbQuOIm/Zj8kryv+OB3uTCRYDqNT7JFhAP3weibsB8pxC2dsrCEqbwJqYunJ24uPHVDKBa28Hv519faGxAaYcUYwPyEjTljeqKVdiaI+V403GNnr/mvjjlb2qWPKjwszNAnkUX192BNiCWRBXXSCUiXPEy2dIP7Zjc6Nf1lcENDhtnJFt4SXLSh4g3ah64ElRO7jgSkiVjwPeVfvWIzNsGYfBqR4Td8hqvy/p/kEO4PquNEm+K7+1V0/E18MS0k6HStdUHbYOcB8/S2whgFZ5s9fIHaYYo/dWLNJe2oJfGjqgvTzUZrVUgUfo60qRKGJmuWGot2nzdCCaYXKsfA78OLjBAljEUt2EM23maNSQasgQrvgUakdDL7RGLgkfw5vCk4u2tVbDkHJx8P54Y1Qy0fDCAUhXYFrVMM+GwejM5+wv09Cu6ndKa+n3rRAGVvx7bgor1XzHpbLfvQME2LGqToY3/ctg8nW4gJlUxvPeb77y9nlOUVWy4nmLzUd2qo/jEcWr6oLjrGZ2lHKarzLAcYr552vr/GM1gQNa5Do0V7FlndlcAY3+TBmtaEOVhqDiHcnpXB6PZvBUDUkQWdhOZCDGWah9+WjGLAXpJUJcaFThS70pLLvDih0EHsH7FaDfFayT+3sN2DFDAkaSimQkQs8MIsCowyygwtggjh8ZAFFeJ+B/7nHB2x4HhaSat62ZF0/Xw0uhs"
                }
            })
            .then(function (response) {
                const pooledOrderIds = [];
                const standardOrderIds = [];
                const $ = cheerio.load(response.data);
                console.log(response.data);
                $('span[data-order-id]').each((i, elem) => {
                    const orderId = $(elem).attr()['data-order-id'];
                    if (orderId > 31500000) {
                        standardOrderIds.push(orderId);
                    } else if (orderId > 16700000) {
                        pooledOrderIds.push(orderId);
                    }
                });
                resolve({pooledOrderIds, standardOrderIds});
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getOrdersHTML(orderIds, optionStr) {
    let url = '';
    if (optionStr === 'standard') {
        url = `https://www.10bis.co.il/reshome/Orders/Standard?id=`;
    } else if (optionStr === 'pooled') {
        url = `https://www.10bis.co.il/reshome/Orders/Pooled?id=`;
    }
    if (!orderIds.length) return;
    return new Promise((resolve) => {
        const htmlOrders = [];
        orderIds.forEach((orderId) => {
            axios.get(url + `${orderId}&timestamp=${Date.now()}`, {
                headers: {
                    Cookie: "cookie1=ResHome.Culture=uiCulture=he-IL&culture=he-IL; ShowDeliveryTimePopup=false; __utmc=26698557; __utmz=26698557.1552935129.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=26698557.621842008.1552935129.1552935129.1553028068.2; __utmt=1; __utmb=26698557.5.10.1553028068; RESHOME.ASPXFORMSAUTH=510A29A5F897CDE3BED9452D3BC71B10A5E0A442CF6CCB796111A5DDF7CF68E5CA2AE56A0A4C38D7074AFC4B76DAB2520554063A14A4CA9346A020919E5226FDB51C7D3FA727B85ABC4BFCD4FD5239C52D8130286B3272CB52C9E501786F865EBB835DC193DEA4E334D50B9EAB104AE685D16514F27ED41305F1DC517B31E4B337A6EA69; ResHomeUserData=BLtVKE9rMjygh+MMWxYzjh0Co+m7fDPGOKfpQr+OVl+q8pS4JzZaV36AWtKrbPL7FCuvaAnlMjo7LgiusObI1p1kMffF5aJrsCxpRPXZVdDBhLj8AH3xkXrQ1SrbjYIr485lQKKK806gc9vM/9nx6zjUZ5IOTOtC4TlwWOaah6aDjxeU4jU9eBAlW5c1vfxyIRIKq5hB33nmLMYLxaA1U+pOQVwt4oS9ZnlotGf7TLtXdZ46WSR0XOvRN5OvP75ccGfZ84PPVSYFrCn38uUKpqq3thTjkkBEH40jTNh1MwuxrfYONo8VQwh8T+sjCP5UMCe/UB8edGMKucLmGk2SI2o3OtDEX/HJwwSiXW4N22Q7eYpCTDsw81PBSjdZkRaeLOPuNIPCZ8Xl8It6QSJy+tzi0SxIPf3j9mi6OItE2RxAAAqI575ya27R775eKomyugRzxZNC6frAUegvJof5ZTd3zgMhuuKSEi1a4vndnS+ot4wEazWFGdS8Vj/DDUEGJS1Fwv49TqBYFVjEAwx458voq+6fvPxYdbqPnZA9UqMB0VTqi2PDiOPZ7xlr4QVhhB/jUDJ0XI6niHzRa/RTWx7KQGJNpekOysklpWXOFWCNUrHBZmy/6T+M6truwL5tdfSSyISeTHhQxEbMFK1V02iQ9miIX61xZY0AfEA3aTKqcGZmHOL/wcrW9WKikJ9xi4n+m/mFQRAXtVWpAnHPBc1I+7Qbu/fUgdg4Gyoj+sigqIuTPlhiiVL7aPN3mJUJ6MMQV1ouP6+pkALiadebewI/wrLYEF9BqRDNbaKtRR2jY2SsQMcexlpnEis1z9SsN2UD8RYylWldwZXzs9N/sqIVjKV28n2HTUdas5Nm6FoMsMI+pL/7mHncOM/AtSZsFxYvxqWQt8kcoClq21ovmDF1CWPf36BFwT0lyuzhCTe/TmfrbBlz0BwNS7IDkNKD5oHVb6mnDJVrtnz7oqQgO2pWLGoLiAVY2tCE9ymvoQtS+Kt8lhWK0CHvyRB1tn1RMsLbK1PzWh+vCzRTIkwLfqn1kMDu22oBc28mZl48kdeGnIV/ft7uvEzbQuOIm/Zj8kryv+OB3uTCRYDqNT7JFhAP3weibsB8pxC2dsrCEqbwJqYunJ24uPHVDKBa28Hv519faGxAaYcUYwPyEjTljeqKVdiaI+V403GNnr/mvjjlb2qWPKjwszNAnkUX192BNiCWRBXXSCUiXPEy2dIP7Zjc6Nf1lcENDhtnJFt4SXLSh4g3ah64ElRO7jgSkiVjwPeVfvWIzNsGYfBqR4Td8hqvy/p/kEO4PquNEm+K7+1V0/E18MS0k6HStdUHbYOcB8/S2whgFZ5s9fIHaYYo/dWLNJe2oJfGjqgvTzUZrVUgUfo60qRKGJmuWGot2nzdCCaYXKsfA78OLjBAljEUt2EM23maNSQasgQrvgUakdDL7RGLgkfw5vCk4u2tVbDkHJx8P54Y1Qy0fDCAUhXYFrVMM+GwejM5+wv09Cu6ndKa+n3rRAGVvx7bgor1XzHpbLfvQME2LGqToY3/ctg8nW4gJlUxvPeb77y9nlOUVWy4nmLzUd2qo/jEcWr6oLjrGZ2lHKarzLAcYr552vr/GM1gQNa5Do0V7FlndlcAY3+TBmtaEOVhqDiHcnpXB6PZvBUDUkQWdhOZCDGWah9+WjGLAXpJUJcaFThS70pLLvDih0EHsH7FaDfFayT+3sN2DFDAkaSimQkQs8MIsCowyygwtggjh8ZAFFeJ+B/7nHB2x4HhaSat62ZF0/Xw0uhs",
                },
            })
                .then((res) => {
                    console.log('done ' + orderId);
                    htmlOrders.push(res.data);
                    if (htmlOrders.length === orderIds.length) {
                        resolve(htmlOrders);
                    }
                })
                .catch((err) => {
                    console.log('ERROR');
                });
        });
    });
}

function getFailedOrdersHtml(orderIds) {

}

function getOrderHTML(orderId) {
    console.log('get order HTML: ' + orderId);
    return new Promise((resolve, reject) => {
        axios.get(`https://www.10bis.co.il/reshome/Orders/Pooled?id=${orderId}&timestamp=${Date.now()}`, {
            headers: {
                Cookie: "cookie1=ResHome.Culture=uiCulture=he-IL&culture=he-IL; ShowDeliveryTimePopup=false; __utmc=26698557; __utmz=26698557.1552935129.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=26698557.621842008.1552935129.1552935129.1553028068.2; __utmt=1; __utmb=26698557.5.10.1553028068; RESHOME.ASPXFORMSAUTH=510A29A5F897CDE3BED9452D3BC71B10A5E0A442CF6CCB796111A5DDF7CF68E5CA2AE56A0A4C38D7074AFC4B76DAB2520554063A14A4CA9346A020919E5226FDB51C7D3FA727B85ABC4BFCD4FD5239C52D8130286B3272CB52C9E501786F865EBB835DC193DEA4E334D50B9EAB104AE685D16514F27ED41305F1DC517B31E4B337A6EA69; ResHomeUserData=BLtVKE9rMjygh+MMWxYzjh0Co+m7fDPGOKfpQr+OVl+q8pS4JzZaV36AWtKrbPL7FCuvaAnlMjo7LgiusObI1p1kMffF5aJrsCxpRPXZVdDBhLj8AH3xkXrQ1SrbjYIr485lQKKK806gc9vM/9nx6zjUZ5IOTOtC4TlwWOaah6aDjxeU4jU9eBAlW5c1vfxyIRIKq5hB33nmLMYLxaA1U+pOQVwt4oS9ZnlotGf7TLtXdZ46WSR0XOvRN5OvP75ccGfZ84PPVSYFrCn38uUKpqq3thTjkkBEH40jTNh1MwuxrfYONo8VQwh8T+sjCP5UMCe/UB8edGMKucLmGk2SI2o3OtDEX/HJwwSiXW4N22Q7eYpCTDsw81PBSjdZkRaeLOPuNIPCZ8Xl8It6QSJy+tzi0SxIPf3j9mi6OItE2RxAAAqI575ya27R775eKomyugRzxZNC6frAUegvJof5ZTd3zgMhuuKSEi1a4vndnS+ot4wEazWFGdS8Vj/DDUEGJS1Fwv49TqBYFVjEAwx458voq+6fvPxYdbqPnZA9UqMB0VTqi2PDiOPZ7xlr4QVhhB/jUDJ0XI6niHzRa/RTWx7KQGJNpekOysklpWXOFWCNUrHBZmy/6T+M6truwL5tdfSSyISeTHhQxEbMFK1V02iQ9miIX61xZY0AfEA3aTKqcGZmHOL/wcrW9WKikJ9xi4n+m/mFQRAXtVWpAnHPBc1I+7Qbu/fUgdg4Gyoj+sigqIuTPlhiiVL7aPN3mJUJ6MMQV1ouP6+pkALiadebewI/wrLYEF9BqRDNbaKtRR2jY2SsQMcexlpnEis1z9SsN2UD8RYylWldwZXzs9N/sqIVjKV28n2HTUdas5Nm6FoMsMI+pL/7mHncOM/AtSZsFxYvxqWQt8kcoClq21ovmDF1CWPf36BFwT0lyuzhCTe/TmfrbBlz0BwNS7IDkNKD5oHVb6mnDJVrtnz7oqQgO2pWLGoLiAVY2tCE9ymvoQtS+Kt8lhWK0CHvyRB1tn1RMsLbK1PzWh+vCzRTIkwLfqn1kMDu22oBc28mZl48kdeGnIV/ft7uvEzbQuOIm/Zj8kryv+OB3uTCRYDqNT7JFhAP3weibsB8pxC2dsrCEqbwJqYunJ24uPHVDKBa28Hv519faGxAaYcUYwPyEjTljeqKVdiaI+V403GNnr/mvjjlb2qWPKjwszNAnkUX192BNiCWRBXXSCUiXPEy2dIP7Zjc6Nf1lcENDhtnJFt4SXLSh4g3ah64ElRO7jgSkiVjwPeVfvWIzNsGYfBqR4Td8hqvy/p/kEO4PquNEm+K7+1V0/E18MS0k6HStdUHbYOcB8/S2whgFZ5s9fIHaYYo/dWLNJe2oJfGjqgvTzUZrVUgUfo60qRKGJmuWGot2nzdCCaYXKsfA78OLjBAljEUt2EM23maNSQasgQrvgUakdDL7RGLgkfw5vCk4u2tVbDkHJx8P54Y1Qy0fDCAUhXYFrVMM+GwejM5+wv09Cu6ndKa+n3rRAGVvx7bgor1XzHpbLfvQME2LGqToY3/ctg8nW4gJlUxvPeb77y9nlOUVWy4nmLzUd2qo/jEcWr6oLjrGZ2lHKarzLAcYr552vr/GM1gQNa5Do0V7FlndlcAY3+TBmtaEOVhqDiHcnpXB6PZvBUDUkQWdhOZCDGWah9+WjGLAXpJUJcaFThS70pLLvDih0EHsH7FaDfFayT+3sN2DFDAkaSimQkQs8MIsCowyygwtggjh8ZAFFeJ+B/7nHB2x4HhaSat62ZF0/Xw0uhs",
            },
        })
            .then((res) => {
                console.log('done ' + orderId);
                resolve(res);
            })
            .catch((err) => {
                getOrderHTML(orderId);
            });
    });
}

function mapHtmlOrderToOrder(htmlOrder) {
    const order = {};
    const $ = cheerio.load(htmlOrder);
    order.companyName = $('.OrderCustomerBoldClass.CustomerHighlightData').text();
    return order;
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => res.send(response))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
