//더미데이터
const archives = [
    // {
    //   archiveIdx: 2,
    //   category: {
    //     categoryIdx: 2,
    //     categoryName: "음식점",
    //   },
    //   title: "첫번째 아카이브",
    //   content: null,
    //   image: {
    //     imageIdx: 2,
    //     url: "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
    //     archiveIdx: 2,
    //   },
    //   isPinned: false,
    // },

    {
        archiveIdx: 1,
        category: {
            categoryIdx: 1,
            categoryName: "카페",
        },
        title: "첫번째 아카이브",
        content: "야호 1" /* memo */,
        url: "https://www.naver.com/",
        thumbnail: "image/thumbnail_1.jpeg",
        image: {
            imageIdx: 1,
            url: "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            archiveIdx: 1,
        },
        isPinned: false,
    },
    {
        archiveIdx: 2,
        category: {
            categoryIdx: 2,
            categoryName: "음식점",
        },
        title: "두 번째 아카이브",
        content: "야호 2" /* memo */,
        url: "https://www.naver.com/",
        thumbnail: "image/thumbnail_1.jpeg",
        image: {
            imageIdx: 2,
            url: "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            archiveIdx: 2,
        },
        isPinned: false,
    },
    {
        archiveIdx: 3,
        category: {
            categoryIdx: 3,
            categoryName: "숙박",
        },
        title: "세 번째 아카이브",
        content: "야호 3" /* memo */,
        url: "https://www.naver.com/",
        thumbnail: "image/thumbnail_1.jpeg",
        image: {
            imageIdx: 3,
            url: "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
            archiveIdx: 3,
        },
        isPinned: false,
    },
    // {
    //   id: 2,
    //   "place": "충청남도 당진시",
    //   "title": "GO 당진",
    //   "url": "https://www.naver.com/",
    //   "content": "당진은 홈스윗홈"
    //   "thumbnail": "image/thumbnail_1.jpeg"
    // },
];

var tempIdx = 7;

const $makeGroupBtn = document.querySelector(".makeGroupBtn");
const $makeArchiveBtn = document.querySelector(".makeArchiveBtn");

const $add_btn = document.querySelector(".add_archive");
const $edit_btn = document.querySelector(".edit_archive");
// const $delete_btn = document.querySelector(".delete_archive");
// const $add_scbtn = document.querySelector(".add_schedule");

const $archiveForm = document.querySelector(".archiveForm");
// const $scheduleForm = document.querySelector(".scheduleForm");

const $archiveForm_edit = document.querySelector("#archiveForm_edit");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $groupList = document.querySelector(".groupList");

const $editArchiveModal = document.getElementById("editArchiveModal");
// const $addScheduleModal = document.getElementById("addScheduleModal");

const today = new Date();

var newImage;
var newTitle;
var newContent;
var newUrl;

let cardArray = [];

const archiveItemTemplate = (newData) => {
    return `<div class="card" style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#editArchiveModal">
                    <div class="card-body">
                    <h5 class="card-title">${newData.title}</h5>
                    <p class="card-content">${newData.content}</p>
                    </div>
                    <img src="${`${newData.thumbnail}`}" class="card-img-top" alt="...">
                </div>`;
    console.log("ok");
};

$archiveForm.addEventListener("submit", addArchive);
$archiveForm_edit.addEventListener("submit", editArchive);
// $scheduleForm.addEventListener("submit", addschedule);
// $delete_btn.addEventListener('click', deleteArchive);

//group 카드뷰
function displayGroupData() {
    console.log("display");
    // if (archives.length == 0) {
    //     $haveTeam.style.display = 'none';
    //     $noTeam.style.display = 'block';
    // } else {
    //     $noTeam.style.display = 'none';
    //     $haveTeam.style.display = 'block';

    //     //기존 기록 삭제
    // $( '.card' ).remove();
    // cardArray = []; //수정을 위한 cardView data 정리

    console.log("display in archives : " + archives[0].title);
    archives.map((item) => {
        console.log(item);
        const groupItem = archiveItemTemplate(item);
        cardArray.push(item); //cardArray 업데이트
        // console.log(cardArray + "ddd");
        $makeGroupButton.insertAdjacentHTML("afterend", groupItem);
    });

    //오류 고치던 중이었다. 수정 삭제버튼 어느 카드에 올려도 다뜬다
    $('.card').mouseout(function () {
        $('.bi-pin-fill').css('display', 'none');
    });
    $('.card').mouseover(function () {
        $('.bi-pin-fill').css('display', 'block');
    });

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

//아카이브 추가하기
function addArchive(event) {
    event.preventDefault();

    var thumbnail = $(".preview").attr("src");
    var title = $("input[name=title]").val();
    var content = $("textarea[name=content]").val();
    var url = $("input[name=url]").val();

    console.log(thumbnail + "," + title + "," + url + "," + content);

    // //유효성검사 -> 둘 다 잘못되었을 경우도 생각 + 잘못 입력한 칸 테두리 빨갛게 변하기
    // if (title.length >= 20) {
    //     alert('20자 이하로 입력해주세요.');
    //     return;
    // }
    // if (content == undefined) {
    //     alert('메모를 추가해주세요.');
    //     return;
    // }
    // if (thumbnail == undefined) {
    //     alert('사진을 추가해주세요.');
    //     return;
}

archives.push({
    archiveIdx: tempIdx,
    title: title,
    url: url,
    content: content,
    thumbnail: thumbnail,
});

console.log(archives);

//수정하기
function editArchive(event) {
    event.preventDefault();
    console.log("uu");

    var form = event.target;
    console.log(form);

    var categoryIdx = $(event.target).find("input[name=category]").val();
    var title = $(event.target).find("input[name=title]").val();
    var content = $(event.target).find("textarea[name=content]").val();
    var url = $(event.target).find("input[name=url]").val();
    var thumbnail = $(event.target).find(".preview").attr("src");
    console.log(title);
}

// //일정 schedule
// function addSchedule(event) {
//   event.preventDefault();
//   console.log("11111");

//   var addform = event.target;
//   console.log(addform);

//   var categoryIdx = $(event.target).find("input[name=category]").val();
//   var traveltitle = $(event.target).find("input[name=traveltitle]").val();
//   var cost = $(event.target).find("input[name=cost]").val();
//   console.log(categoryIdx + "," + traveltitle + "," + cost);
// }


//그룹 삭제
function deleteArchive(event) {
    // console.log(event.target.name);
    var cardidx;
    for (var i = 0; i < cardArray.length; i++) {
        if (cardArray[i].id == event.target.name) {
            title_del2 = cardArray[i].title;
            console.log(typeof title_del2);
            archives.splice(i, 1);
            break;
        }
    }

    displayGroupData();
}

//수정 모달에 정보 띄우기
$("#editArchiveModal").on("show.bs.modal", function (event) {
    var index = $(event.relatedTarget).data("index");
    console.log("edit");
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

    //   /일정제목 이름
    modal.find("#InputTitle").val(cardData.title);
    modal.find("#inputUrl").val(cardData.url);
    modal.find("#inputContent").val(cardData.content);
    //   console.log(index);

    modal.find("#archiveForm_edit").attr("title", index);
    //   console.log("폼에 인덱스 저장" + modal.find("#archiveForm_edit").attr("title"));
});

// //삭제 모달에 정보띄우기
// $("#deleteArchiveModal").on("show.bs.modal", function (event) {
//   var index = $(event.relatedTarget).data("index");
//   console.log(index);

//   var cardData;
//   for (var i = 0; i < cardArray.length; i++) {
//     if (cardArray[i].id == index) {
//       cardData = cardArray[i];
//       break;
//     }
//   }

//   var modal = $(this);
//   var comment =
//     cardData.title +
//     " 일정을 삭제하시겠습니까? <br> 삭제 후에는 동작을 되돌릴 수 없습니다.";
//   document.getElementById("comment_del").innerHTML = comment;
//   modal.find("#title_del").text(cardData.title + " 일정");
//   modal
//     .find("#date_del")
//     .text("여행 기간 : " + cardData.start_date + " ~ " + cardData.end_date);

//   //버튼에 인덱스 저장
//   modal.find(".delete_archive").attr("name", index);
// });

// //삭제모달2에 정보띄우기
// $("#deleteArchiveModal2").on("show.bs.modal", function (event) {
//   //모달 딜레이 때문에 비동기처리
//   setTimeout(function () {
//     var contents = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
//               <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
//             </svg>
//             <div id="comment_del2">${`${title_del2}`} 팀이 <br> 삭제되었습니다</div>`;

//     console.log(contents);
//     document.getElementById("contents_del2").innerHTML = contents;
//   }, 100);
// });

//수정 모달에 정보 띄우기
$("#addScheduleModal").on("show.bs.modal", function (event) {
    console.log("asm");
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

// $('#addTeamModal').fadeIn(500);