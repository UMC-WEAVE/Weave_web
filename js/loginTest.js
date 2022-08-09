var logincode;

function kakaoLogin() {
    // window.location = "http://www.wave-weave.shop/login/kakao";

    // if ( window.location == 'http://www.wave-weave.shop/login/kakao' ) {
        // window.location.href='http://wave-weave.shop/token';
    // }

    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    
    fetch("www.wave-weave.shop/login/kakao", requestOptions)
        .then(response => response.text())
        .then(result => logincode = result)
        .catch(error => console.log('error', error));
}