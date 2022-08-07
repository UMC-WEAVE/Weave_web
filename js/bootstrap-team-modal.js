// 위브 여행 팀 더미 데이터
var trip1MemInfo = [
  {
    trip1MemName: "이연후",
    trip1MemEmail: "weaveuser-1@gmail.com"
  },
  {
    trip1MemName: "이은서",
    trip1MemEmail: "weaveuser-2@gmail.com"
  },
  {
    trip1MemName: "전유영",
    trip1MemEmail: "weaveuser-3@gmail.com"
  },
  {
    trip1MemName: "현우",
    trip1MemEmail: "weaveuser-4@gmail.com"
  },
  {
    trip1MemName: "낑깡",
    trip1MemEmail: "weaveuser-5@gmail.com"
  },
  {
    trip1MemName: "부엉",
    trip1MemEmail: "weaveuser-6@gmail.com"
  }
];

// 위브 유저 더미 데이터
var weaveUserInfo = [
{
  weaveUserName: "유저1",
  weaveUserEmail: "weaveuser1@gmail.com"
},
{
  weaveUserName: "유저2",
  weaveUserEmail: "weaveuser2@gmail.com"
},
{
  weaveUserName: "유저3",
  weaveUserEmail: "weaveuser3@gmail.com"
},
{
  weaveUserName: "유저4",
  weaveUserEmail: "weaveuser4@gmail.com"
},
{
  weaveUserName: "유저5",
  weaveUserEmail: "weaveuser5@gmail.com"
},
{
  weaveUserName: "유저6",
  weaveUserEmail: "weaveuser6@gmail.com"
}
];

// 팀 모달 팝업 및 초대한 유저 존재 시 다음 모달 이동
// 현재 여행 팀 멤버 리스트
let flag = 0;
var parsed = "";

for (i = 0; i< trip1MemInfo.length; i++) {
var myobj1 = trip1MemInfo[i];
parsed += myobj1.trip1MemName + "\n";          
}                           
$("#display").val(parsed);

// 입력된 유저 이메일 존재 여부 체크
// 존재 O: 다음 모달 이동 및 팀 멤버 이름/이메일 배열에 추가
// 존재 X: 다음 모달 이동X 및 alert 메시지 호출
function checkForm() {
var weaveUserChk = document.getElementById('invitedUser').value;
var parsedInput = "";
var parsedUserName = "";
var parsedUserEmail = "";
flag = 0;

for (i = 0; i< weaveUserInfo.length; i++) {
  var myobj = weaveUserInfo[i];
  parsedUserName = myobj.weaveUserName;
  parsedUserEmail = myobj.weaveUserEmail;
  parsedInput = weaveUserChk;

  if (parsedInput == parsedUserEmail) {
    flag = 1;
    trip1MemInfo.push({trip1MemName:myobj.weaveUserName, trip1MemEmail:myobj.weaveUserEmail});
    break;
  }
}
if (flag == 1)
  BtnSecRend();
else
  alert("INVALID");
console.log(trip1MemInfo);
}                       

// 팀 모달 팝업 및 초대한 유저 존재 시 다음 모달 이동
function BtnSecRend() {
flag = 0;
$('#PopUPModalImage').modal('show');
var parsed = "";

for (i = 0; i< trip1MemInfo.length; i++) {
var myobj1 = trip1MemInfo[i];
parsed += myobj1.trip1MemName + "\n";          
}                           
$("#display").val(parsed);
};

$(document).ready(function(){
$('#openPopupModal').on('click',function(){
$('#PopUPModal').modal('show');
if (flag == 1) {
  $('#PopUPModal').modal('hide');
  BtnSecRend();
}
});
});