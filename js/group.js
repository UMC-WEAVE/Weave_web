//더미데이터
const groups = [
    // {
    //     id: 1,
    //     "name": "제주 여행팀",
    //     "start_date": "2022-09-01",
    //     "end_date" : "2022-09-05",
    //     "thumbnail" : "image/thumbnail_1.jpeg"
    // },
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "thumbnail" : "image/thumbnail_1.jpeg"
    // },
]

const $makeGroupBtn = document.querySelector(".makeGroupBtn");
const $add_btn = document.querySelector(".add_group");
const $groupForm = document.querySelector(".groupForm");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $groupList = document.querySelector(".groupList");

const $noTeam = document.querySelector('.noTeam');
const $haveTeam = document.querySelector('.haveTeam');

const today = new Date();

var newImage;

$groupForm.addEventListener('submit', addGroup);

const groupItemTemplate = (newData) => {
    return `<div class="card" style="width: 18rem;">
                    <img src="${`${newData.thumbnail}`}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${newData.name}</h5>
                      <p class="card-period">${newData.start_date} ~ ${newData.end_date}</p>
                    </div>
                </div>`
}

//group 카드뷰 띄우기
function displayGroupData() {
    if (groups.length == 0) {
        $haveTeam.style.display = 'none';
        $noTeam.style.display = 'block';
    } else {
        $noTeam.style.display = 'none';
        $haveTeam.style.display = 'block';

        $( '.card' ).remove(); //기존 기록 삭제
        groups.map(item => {
            const groupItem = groupItemTemplate(item);
            
            $makeGroupButton.insertAdjacentHTML('afterend', groupItem);
        })
        console.log(groups);
    }


}

displayGroupData();

function stringToDate(date) {
    var dateString = date.split('~');
    var dateList = [];

    dateList.push(new Date(dateString[0]));
    dateList.push(new Date(dateString[1]));

    return dateList;
}

function addGroup(event) {
    event.preventDefault();

    var name = $("input[name=nameInput]").val();
    var date = $("input[name=date]").val()
    var thumbnail = $(".preview").attr("src");

    //유효성검사 -> 둘 다 잘못되었을 경우도 생각 + 잘못 입력한 칸 테두리 빨갛게 변하기
    if (name.length >= 20) {
        alert('20자 이하로 입력해주세요.');
        return;
    }
    if (thumbnail == undefined) {
        alert('사진을 추가해주세요.');
        return;
    }

    var dateList = stringToDate(date);
    console.log(dateList);

    //날짜 포맷 설정(화면에 띄워지는 요소)
    var start_date = dateList[0].getFullYear() + "-" + (dateList[0].getMonth() + 1) + "-" + dateList[0].getDate();
    var end_date = dateList[1].getFullYear() + "-" + (dateList[1].getMonth() + 1) + "-" + dateList[1].getDate();

    groups.push({"name": name, 
    "start_date": start_date,
    "end_date": end_date,
    "thumbnail" : thumbnail
    });

    console.log("thumbnail: " + newImage);

    $("input[name=nameInput]").val(" ");
    // $("input[name=date]").val(" ");
    newImage.parentNode.removeChild(newImage);
    $("input[name=image]").val("");

    //모달 수동 닫기
    $('.modal').modal('hide');

    displayGroupData();
}

function loadFile(input) {
    var file = input.files[0];	//선택된 파일 가져오기

    if (newImage == undefined) {
        //새로운 이미지 div 추가
        newImage = document.createElement("img");
        newImage.setAttribute("class", 'preview');
    }
    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);   
    console.log(newImage);

    newImage.style.width = "264px";
    newImage.style.height = "264px";
    newImage.style.objectFit = "cover";

    //이미지를 image-show div에 추가
    var container = document.querySelector('.image');
    container.appendChild(newImage);
};

// 달력
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
            "daysOfWeek": ["월", "화", "수", "목", "금", "토", "일"],
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