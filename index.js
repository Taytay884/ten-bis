const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const cheerio = require('cheerio');

let response = '<h1>lala</h1>';

getOrderIds().then((orderIds) => {
    response = `<h1>${orderIds}</h1>`;
});

function getOrderIds() {
    return new Promise((resolve, reject) => {
        axios.get('https://www.10bis.co.il/reshome/',
            {
                headers: {
                    Cookie: "cookie1=ResHome.Culture=uiCulture=he-IL&culture=he-IL; RESHOME.ASPXFORMSAUTH=4A3457D99F8CEEF15563750EF4A839CBB27847D549E80672D1E885BF2A7C98D4DB68757B04881E4E3E1A05D22B56BE1F009BBA72A3F9CA8C400D3B50C260C6C0D48E9A8F01ABFE7B7E3F738DC329CBF8C2722A5C66A6A9526897478553F233FB53B609FA5FDD40D092162C13C5981BB07988F0D030E44F4B1666EB12AFF3DB7A70A2A9FE; ResHomeUserData=BLtVKE9rMjygh+MMWxYzjh0Co+m7fDPGOKfpQr+OVl+q8pS4JzZaV36AWtKrbPL7FCuvaAnlMjo7LgiusObI1p1kMffF5aJrsCxpRPXZVdDBhLj8AH3xkXrQ1SrbjYIr485lQKKK806gc9vM/9nx6zjUZ5IOTOtC4TlwWOaah6aDjxeU4jU9eBAlW5c1vfxyIRIKq5hB33nmLMYLxaA1UxefxhGYmjtNkHd6ZCDL99fBzu6OUJWX9vPVidqtp58undOs8ekqxgyNfSox0KklkX3Qa6gLEhlsv+PxoeArxVgt8c/+OKs7WYBnwC9e+XXFANQ8Xnsrh3BI40zaliHnLyjNHdEQY9YGEjaOrSgXpUarh+f6ae5/WuMYhBQQecXAJBUJHo8ueF1ZQCQY9NIOk+otMRO3Rw6h+akDk++ghB+88WCoNK1kZUrIaE++v34TOG2UMWlRMddWD8HjBrzjlPIi2LV7ARxUzggb1+oipL8SavgF84rV+t2bEcT8JMgdjnIbih9MHk/zJsnniD6Ln5iPpzxboaengeEsqUSkKoifztWeNnSCCFu5pwQA2Q95MCOAV+RK4y9LPCptbnptRMqESShKCxNPhgXiGOGnhbe27XaiJFKMdnX6lFyzfJR8uvBDR8/Bll7Ypkh1BHZMWAWQP1lpGq/yTLoSBd8K0HHzqyVPRzRpJjbM1ic/LlWPhselpIsng3+ZK6GCrW8j9uZKgFP5R5jw/AsgwM0W4q2YDq2tiS7GGNOkNhMWMuuTdFAfHZDvXxrKbgcit6OsxfbYjCcr/hEDrB36EN4w8++g0eYAXSCZtXgLcOKEWSKgfEGm23GYZTtglBlbe08BUHQf5vu1Vu+mviBGZD7txB3SXlpbigudhLV050PNGgnqYuKyR0OuOvhUjvvyFGtpxWfYs70o98zZqAS+492oNuqYUn9W43wFmFm/ZP9yAzP0TcJQ2TnG8dmlShPq6UY+Jt22+JYwpe/PRxA7U43IPLiuEky8Z6sD3W3IVM172Ab8EYqCw4c0vQdvvVWKXCJ1DF1o4W5LixaM/dpGCmo3Jjg3+ZfMLYDNvzTs6dT5uPnKmAk+eAD1aAUk8BObF4ePLIj/o0AyU2LyOirytIbq+KaHtQ5bQ26RPs0ILBC5GjNTgXSomTk4P8Dp8izjcp7K/+WABnVxMK7OaIJ5XfTFcskid3KU+PkDZGQU75aHKN403qwp0JzPgXBShzlXAxBCWFf0rAzOd/39wiwmcrwFcUAwKdCPYdaOnJfXxIQstimqB4SEGfUQLmCjXJb3n3tHiannQO3d2ST4WrCzylnUwbg5AbmidRT1gtStz0HYXjnu3wrs8JeanakXq7IuhcmfVlr4YynsAhebThGJSIJoveSCneqtOyjUDbK+/wWeSQaE86yiy66vxSRfOK7GIVRKmUjG+yCB5AogxQZmbVkXblZIGwFB1VBmzWqDF2cKz7iITwY9M2MLZr9qgfjlq7qf8GsqxnnHOuzShn0KDtiNd2zp8/csRltFJbReBhVXF0/zdVPXTQ323Y1eHts6KyFOtmB/WoltZoXFZUiKTDoPlf5dIcWu9szx0e9wgDMGxTYfijoM0Tv+IavIIa6+DsrXNhKeGLZgkCOuKm0j7oOkKQblmX2wHXGskAZx7Vv9cy6nxop+yjp4pfAMCFfclUuze0dowYmeYWEm/NaBbC8mL0v7px8stuTEzUcuGYz0cwT1Y0kPInaLyPOtTuYQ1C5SpqX302g/zU4Db1iWQILTzSsVK4I/GKK0ADfVCF/Eaiuz; ShowDeliveryTimePopup=false; __utma=26698557.621842008.1552935129.1552935129.1552935129.1; __utmc=26698557; __utmz=26698557.1552935129.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=26698557.37.10.1552935129"
                }
            })
            .then(function (response) {
                const orderIds = [];
                const $ = cheerio.load(response.data);
                $('span[data-order-id]').each((i, elem) => {
                    const orderId = $(elem).attr()['data-order-id'];
                    orderIds.push(orderId);
                });
                resolve(orderIds);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => res.send(response))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
