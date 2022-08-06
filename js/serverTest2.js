var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "JSESSIONID=0D99BC3F6D611383AE16F23B3334ACB8");

var raw = JSON.stringify({
  "leaderIdx": 1,
  "title": "강릉가자",
  "startDate": "2022-08-08",
  "endDate": "2022-08-17",
  "imgUrl": "https://via.placeholder.com/150/92c952"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://wave-weave.shop/teams/1/create", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



// var myHeaders = new Headers();
// myHeaders.append("Cookie", "JSESSIONID=6B103D541BA258F5D21A8047A4F3E74E");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("http://wave-weave.shop/teams/1")
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));






// var settings = {
//   "url": "http://wave-weave.shop/teams/1?userIdx=1",
//   "method": "GET",
//   "timeout": 0,
//   "headers": {
//     "Cookie": "JSESSIONID=6B103D541BA258F5D21A8047A4F3E74E"
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });







// var axios = require('axios');

// var config = {
//   method: 'get',
//   url: 'http://wave-weave.shop/teams/1?userIdx=1',
//   headers: { 
//     'Cookie': 'JSESSIONID=6B103D541BA258F5D21A8047A4F3E74E'
//   }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });