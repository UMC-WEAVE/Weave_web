

// console.log("ok");






const today = new Date();

const okBtn = document.querySelector(".ok");
const input = document.querySelector("#date");

function stringToDate(date) {
    var dateString = date.split('~');
    var dateList = [];

    dateList.push(new Date(dateString[0]));
    // dateList.push(new Date(dateString[1]));
    // console.log(dateList[0] + ", " + dateList[1]);

    // console.log(typeof(dateList[0]));

    // dateList[0].toISOString().substring(0,10);
    // console.log("date is " + dateList[0].toISOString().substring(0,10));
    // console.log("type is " + typeof(dateList[0].toISOString().substring(0,10)));

    return dateList[0];
}

console.log(location.origin);

okBtn.addEventListener('click', () => {
    console.log("ok");

    var startDate = stringToDate(input.value);
    console.log(startDate);
    startDate = startDate.toISOString().substring(0,10);
    console.log(startDate);

    //데이터 연결
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXVuczM2MzdAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY1OTQ1MDU0NywiZXhwIjoxNjYwMDU1MzQ3fQ.LNcSJe6p1aBBGE5tsFB9-RlgaOVej-O-P1TcTo3abRA");
    myHeaders.append("Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "JSESSIONID=0D99BC3F6D611383AE16F23B3334ACB8");

    var raw = JSON.stringify({
      "teamIdx": 2,
      "title": "제주 말타기",
      "date": "2018-12-12",
      "startTime": "2018-12-12T11:30:59.000Z",
      "location": "제주도 어쩌고",
      "latitude": 34343434,
      "longitude": 53,
      "cost": 3000
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://wave-weave.shop/plans", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
});

// module.exports = {
//     devServer: {
//       proxy: {
//         '/api': {
//           target: 'https://api.evan.com',
//           changeOrigin: true,
//           pathRewrite: { '^/api': '' },
//         },
//       }
//     }
//   }

//   달력
  $(function () {
    $('#date').daterangepicker({
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": "~",
            "applyLabel": "확인",
            "cancelLabel": "취소",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            "firstDay": 1
        },
        "startDate": `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`,
        "endDate": `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`,
        "drops": "down"
    }, function (start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
});