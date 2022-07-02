// 모달 가져오기
var modal = document.getElementById("myModal");

// 모달 여는 버튼 가져오기
var btn = document.getElementById("myBtn");

// 모달 닫는 span element 가져오기
var span = document.getElementsByClassName("close")[0];

var checkBtn = document.querySelector('.checkBtn');

// 버튼 클릭시 모달 열기
btn.onclick = function() {
  modal.style.display = "block";
}

// span element 클릭하면 모달 닫기
span.onclick = function() {
  modal.style.display = "none";
}

checkBtn.onclick = function() {
  modal.style.display = "none";
}

// 모달 밖 아무곳이나 클릭하면 모달 닫기
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}