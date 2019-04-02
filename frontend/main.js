// axios.get('https://www.10bis.co.il/reshome/', { crossdomain: true })
//     .then(function (response) {
//         handle success
// console.log(response);
// })
// .catch(function (error) {
//     handle error
// console.log(error);
// })

axios.get('/get-data')
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log('Error', err);
    });

console.log('Just checking the heroku production mode.');