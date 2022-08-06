//더미데이터
const groups = [
  {
    id: 1,
    place: "충청남도 당진시",
    title: "GO 당진",
    url: "https://www.naver.com/",
    memo: "당진은 홈스윗홈",
    thumbnail: "image/thumbnail_1.jpeg",
  },
  // {
  //     id: 2,
  //     "place": "충청남도 당진시",
  //     "title": "GO 당진",
  //     "url" : "https://www.naver.com/",
  //     "memo" : "당진은 홈스윗홈"
  //     "thumbnail" : "image/thumbnail_1.jpeg"
  // },
];

var tempIdx = 7;

const $makeGroupBtn = document.querySelector(".makeGroupBtn");
const $add_btn = document.querySelector(".add_group");
const $edit_btn = document.querySelector(".edit_group");
const $delete_btn = document.querySelector(".delete_group");
const $groupForm = document.querySelector(".groupForm");
const $groupForm_edit = document.querySelector("#groupForm_edit");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $groupList = document.querySelector(".groupList");

const $noTeam = document.querySelector(".noTeam");
const $haveTeam = document.querySelector(".haveTeam");

const $editTeamModal = document.getElementById("editTeamModal");

const today = new Date();

var newImage;
var newPlace;
var newTitle;
var newUrl;
var newMemo;

let cardArray = [];

const groupItemTemplate = (newData) => {
  return `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${newData.title}</h5>
                    <p class="card-place">${newData.place}</p>
                    </div>
                    <img src="${`${newData.thumbnail}`}" class="card-img-top" alt="...">
                </div>`;
  console.log("ok");
};

$groupForm.addEventListener("submit", addGroup);
// $groupForm_edit.addEventListener("submit", editGroup);
// $delete_btn.addEventListener('click', deleteGroup);

//group 카드뷰
function displayGroupData() {
  console.log("display");
  // if (groups.length == 0) {
  //     $haveTeam.style.display = 'none';
  //     $noTeam.style.display = 'block';
  // } else {
  //     $noTeam.style.display = 'none';
  //     $haveTeam.style.display = 'block';

  //     //기존 기록 삭제
  // $( '.card' ).remove();
  // cardArray = []; //수정을 위한 cardView data 정리

  console.log("display in groups : " + groups[0].title);
  groups.map((item) => {
    console.log(item);
    const groupItem = groupItemTemplate(item);
    cardArray.push(item); //cardArray 업데이트
    // console.log(cardArray + "ddd");
    $makeGroupButton.insertAdjacentHTML("afterend", groupItem);
  });

  //     //오류 고치던 중이었다. 수정 삭제버튼 어느 카드에 올려도 다뜬다
  //     $('.card').mouseout(function() {
  //         $( '.bi-pencil' ).css('display', 'none');
  //     });
  //     $('.card').mouseover(function() {
  //         $( '.bi-pencil' ).css('display', 'block');
  //     });

  //     $('.card').mouseout(function() {
  //         $( '.bi-trash' ).css('display', 'none');
  //     });
  //     $('.card').mouseover(function() {
  //         $( '.bi-trash' ).css('display', 'block');
  //     });
  // }
}

displayGroupData();

function stringToDate(date) {
  var dateString = date.split("~");
  var dateList = [];

  dateList.push(new Date(dateString[0]));
  dateList.push(new Date(dateString[1]));

  return dateList;
}

//사진 로드
function loadFile(input) {
  var file = input.files[0]; //선택된 파일 가져오기

  if (newImage == undefined) {
    //새로운 이미지 div 추가
    newImage = document.createElement("img");
    newImage.setAttribute("class", "preview");
  }
  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  console.log(newImage);

  newImage.style.width = "264px";
  newImage.style.height = "264px";
  newImage.style.objectFit = "cover";

  //이미지를 image-show div에 추가
  if (input.id == "image-add") {
    var container = document.querySelector(".image");
    container.appendChild(newImage);
  } else if (input.id == "image-edit") {
    var container = $("#editTeamModal").find("#imageContainer-edit");
    container.append(newImage);
  }
}

//그룹 추가하기
function addGroup(event) {
  event.preventDefault();

  var thumbnail = $(".preview").attr("src");
  var title = $("input[name=title]").val();
  var place = $("input[name=place]").val();
  var url = $("input[name=url]").val();
  var memo = $("textarea[name=memo]").val();

  console.log(thumbnail + "," + title + "," + place + "," + url + "," + memo);

  // //유효성검사 -> 둘 다 잘못되었을 경우도 생각 + 잘못 입력한 칸 테두리 빨갛게 변하기
  // if (title.length >= 20) {
  //     alert('20자 이하로 입력해주세요.');
  //     return;
  // }
  // if (place == undefined) {
  //     alert('장소를 추가해주세요.');
  //     return;
  // }
  // if (thumbnail == undefined) {
  //     alert('사진을 추가해주세요.');
  //     return;
  // }

  groups.push({
    thumbnail: thumbnail,
    title: title,
    place: place,
    url: url,
    memo: memo,
  });

  console.log(groups);

  // //지워질부분
  // tempIdx = tempIdx + 2;

  // $("input[name=title]").val(" ");
  // $("input[name=place]").val(" ");
  // $("input[name=url]").val(" ");
  // $("input[name=memo]").val(" ");
  // // $("input[name=date]").val(" ");
  // newImage.parentNode.removeChild(newImage);
  // $("input[name=image]").val("");

  // //모달 수동 닫기
  $(".modal").modal("hide");

  displayGroupData();
}

//수정하기
function editGroup(event) {
  event.preventDefault();
  console.log("uu" + event.target.name);

  // var form = event.target;
  var title = $(event.target).find("input[name=title]").val();
  var place = $(event.target).find("input[name=place]").val();
  var url = $(event.target).find("input[name=url]").val();
  var memo = $(event.target).find("input[name=memo]").val();
  var thumbnail = $(event.target).find(".preview").attr("src");
  // console.log(title);

  // 유효성검사 -> 둘 다 잘못되었을 경우도 생각 + 잘못 입력한 칸 테두리 빨갛게 변하기
  if (title.length >= 20) {
    alert("20자 이하로 입력해주세요.");
    return;
  }
  if (place == undefined) {
    alert("장소를 추가해주세요.");
    return;
  }
  if (thumbnail == undefined) {
    alert("사진을 추가해주세요.");
    return;
  }

  var dateList = stringToDate(date);
  console.log(dateList);

  //날짜 포맷 설정(화면에 띄워지는 요소)
  var start_date =
    dateList[0].getFullYear() +
    "-" +
    (dateList[0].getMonth() + 1) +
    "-" +
    dateList[0].getDate();
  var end_date =
    dateList[1].getFullYear() +
    "-" +
    (dateList[1].getMonth() + 1) +
    "-" +
    dateList[1].getDate();

  //데이터에 반영
  for (var i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id == event.target.name) {
      groups[i].title = name;
      groups[i].start_date = start_date;
      groups[i].end_date = end_date;
      groups[i].thumbnail = thumbnail;
    }
  }

  $("input[name=title]").val(" ");
  $("input[name=place]").val(" ");
  $("input[name=url]").val(" ");
  $("input[name=memo]").val(" ");
  // $("input[name=date]").val(" ");
  newImage.parentNode.removeChild(newImage);
  $("input[name=image]").val("");

  // //모달 수동 닫기
  $(".modal").modal("hide");

  displayGroupData();
}

//그룹 삭제
function deleteGroup(event) {
  // console.log(event.target.name);
  var cardidx;
  for (var i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id == event.target.name) {
      title_del2 = cardArray[i].title;
      console.log(typeof title_del2);
      groups.splice(i, 1);
      break;
    }
  }

  displayGroupData();
}

//수정 모달에 정보 띄우기
$("#editTeamModal").on("show.bs.modal", function (event) {
  var index = $(event.relatedTarget).data("index");
  // console.log(index);

  var cardData;
  for (var i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id == index) {
      cardData = cardArray[i];
      break;
    }
  }

  // console.log(cardData);

  //썸네일
  var modal = $(this);
  if (newImage == undefined) {
    //새로운 이미지 div 추가
    newImage = document.createElement("img");
    newImage.setAttribute("class", "preview");
  }
  newImage.src = cardData.thumbnail;
  newImage.style.width = "264px";
  newImage.style.height = "264px";
  newImage.style.objectFit = "cover";

  var container = modal.find("#imageContainer-edit");
  container.append(newImage);

  //팀 이름
  modal.find("#InputTitle").val(cardData.title);

  //날짜
  modal.find("#date").daterangepicker(
    {
      locale: {
        format: "YYYY-MM-DD",
        separator: "~",
        applyLabel: "확인",
        cancelLabel: "취소",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom",
        weekLabel: "W",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        firstDay: 1,
      },
      startDate: cardData.start_date,
      endDate: cardData.end_date,
      drops: "down",
    },
    function (start, end, label) {
      console.log(
        "New date range selected: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD") +
          " (predefined range: " +
          label +
          ")"
      );
    }
  );

  console.log(index);
  modal.find("#groupForm_edit").attr("name", index);
  console.log("폼에 인덱스 저장" + modal.find("#groupForm_edit").attr("name"));
});

//삭제 모달에 정보띄우기
$("#deleteTeamModal").on("show.bs.modal", function (event) {
  var index = $(event.relatedTarget).data("index");
  console.log(index);

  var cardData;
  for (var i = 0; i < cardArray.length; i++) {
    if (cardArray[i].id == index) {
      cardData = cardArray[i];
      break;
    }
  }

  var modal = $(this);
  var comment =
    cardData.title +
    " 일정을 삭제하시겠습니까? <br> 삭제 후에는 동작을 되돌릴 수 없습니다.";
  document.getElementById("comment_del").innerHTML = comment;
  modal.find("#title_del").text(cardData.title + " 일정");
  modal
    .find("#date_del")
    .text("여행 기간 : " + cardData.start_date + " ~ " + cardData.end_date);

  //버튼에 인덱스 저장
  modal.find(".delete_group").attr("name", index);
});

//삭제모달2에 정보띄우기
$("#deleteTeamModal2").on("show.bs.modal", function (event) {
  //모달 딜레이 때문에 비동기처리
  setTimeout(function () {
    var contents = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
            <div id="comment_del2">${`${title_del2}`} 팀이 <br> 삭제되었습니다</div>`;

    console.log(contents);
    document.getElementById("contents_del2").innerHTML = contents;
  }, 100);
});

//모달 정가운데
// $("#addArchiveModal").modal('show')(function() {
//     // 'margin-top': function () { //vertical centering
//     //     return -($(this).height() / 2);
//     // },
//     $(".centered").css('margin-left', function () { //Horizontal centering
//         return -($(this).width() / 2);
//     })
// });

var div = $("#addArchiveModal");
div.css("position", "absolute");
div.css(
  "top",
  Math.max(
    0,
    ($(window).height() - div.outerHeight()) / 2 + $(window).scrollTop()
  ) + "px"
);
div.css(
  "left",
  Math.max(
    0,
    ($(window).width() - div.outerWidth()) / 2 + $(window).scrollLeft()
  ) + "px"
);
// $('#addArchiveModal').fadeIn(500);
