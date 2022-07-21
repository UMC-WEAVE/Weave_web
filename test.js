var url = location.href;
console.log(url);

var searchParams = new URL(url).searchParams;

var code = searchParams.get('code');

console.log(code);
alert(code);
