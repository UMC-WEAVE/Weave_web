//더미데이터
const groups = [
    // {
    //     id: 1,
    //     "name": "제주 여행팀",
    //     "start_date": "2022-09-01",
    //     "end_date" : "2022-09-05",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },

    // //가로스크롤을 위한 test data
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "memberNum": "3명",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "memberNum": "3명",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },
    // {
    //     id: 2,
    //     "name": "부산 가요",
    //     "start_date": "2022-07-01",
    //     "end_date" : "2022-07-03",
    //     "memberNum": "3명",
    //     "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    // },
];

//초기 화면 세팅
const $modal = document.querySelector(".modal");
const $join_modal = document.querySelector(".join_modal");
const $makeBtn = document.querySelector(".makeBtn");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $makeGroup_noTeam = document.querySelector(".makeGroup_noTeam");
const $close_btn = document.querySelector('.modalCloseBtn');
const $modalCloseBtn = document.querySelector('modalCloseBtn');
const $add_btn = document.querySelector(".add_group");
const $groupForm = document.querySelector(".groupForm");
const $groupListContainer = document.querySelector(".groupListContainer");
const $itemContainer = document.querySelector(".itemContainer");
const $thumbnail = document.querySelector(".thumbnail");

const $noTeam = document.querySelector('.noTeam');
const $haveTeam = document.querySelector('.haveTeam');

var newImage;

const groupItemTemplate = (newData) => {
    return `
    <li class="groupList">
        <a href="archive.html">
            <div class="itemContainer">
                <div class="imageContainer">
                    <img class="thumbnail" src="${`${newData.thumbnail}`}">
                </div>
                <div class="groupInfo">
                    <div class="tripTitle">
                        <span>${newData.name}</span>
                    </div>
                    <div class="tripPeriod">
                        <span>${newData.start_date} ~ ${newData.end_date}</span>
                    </div>
                </div>
            </div>
        </a>
    </li>
    `;
}

//group 카드뷰 띄우기
function displayGroupData() {
    if (groups.length == 0) {
        $haveTeam.style.display = 'none';//데이터 연결시 삭제할 부분
        $noTeam.style.display = 'block';
    } else {
        $noTeam.style.display = 'none';//데이터 연결시 삭제할 부분
        $haveTeam.style.display = 'block';

        console.log("execute remove");
        $( 'li.groupList' ).remove();

        groups.map(item => {
            const groupItem = groupItemTemplate(item);
            
            $makeBtn.insertAdjacentHTML('afterend', groupItem);
        })
        console.log(groups);

        //아이템 컨테이너 hover 오버레이
        // $itemContainer.addEventListener('mouseover', () => {
        // $thumbnail.style.opacity = 0.5;
    }
}

displayGroupData();

//그룹 버튼 text->수정 들어갈부분
// var $btnValue = "새로운 그룹을\n만들어보세요";
// $(".makeGroupBtn").attr("value", $btnValue)

//모달창 여닫기
$makeGroupButton.addEventListener('click', () => {
    $(".overlay").show();
    $modal.style.display = 'block';
})

$makeGroup_noTeam.addEventListener('click', () => {
    $(".overlay").show();
    $modal.style.display = 'block';
})

$close_btn.addEventListener('click', () => {
    $(".overlay").hide();
    $modal.style.display = 'none';
})

// $modalCloseBtn.addEventListener('click', () => {
//     $(".overlay").hide();
//     $modal.style.display = 'none';
// })

//새로운 그룹 추가
console.log(groups);
$groupForm.addEventListener('submit', addGroup);

// var width = document.jquerySelector(".itemContainer").clientWidth;
// console.log(width);

// function isNotNull(groupData) {
//     for (var i = 0; i < groupData.length; i++) {
//         if (groupData[i] == '' || groupData[i] == ' ')
//             return false;
//     }
//     return true;
// }

function addGroup(event) {
    event.preventDefault();

    console.log($groupForm);

    // console.log("null? = " + isNotNull(groupData));

    var name = $("input[name=nameInput]").val();
    var start_date = $("input[name=start_date]").val();
    var end_date = $("input[name=end_date]").val();
    var thumbnail = $(".preview").attr("src");

    //유효성검사 -> 둘 다 잘못되었을 경우도 생각 + 잘못 입력한 칸 테두리 빨갛게 변하기
    if (name.length >= 20) {
        alert('20자 이하로 입력해주세요.');
        return;
    }
    if (start_date > end_date) {
        alert('여행 종료일이 시작일보다 빠릅니다.');
        return;
    }
    if (thumbnail == undefined) {
        alert('사진을 추가해주세요.');
        return;
    }

    groups.push({"name": name, 
    "start_date": start_date,
    "end_date": end_date,
    "thumbnail" : thumbnail
    });

    console.log("thumbnail: " + newImage);

    // const newGroupItem = groupItemTemplate(groups[groups.length-1]);
    // const groupList = document.querySelectorAll(".groupList");
    // $makeBtn.insertAdjacentHTML('afterend', newGroupItem);
    // groupList[groupList.length-1].insertAdjacentHTML('afterend', newGroupItem);

    $("input[name=nameInput]").val(" ");
    $("input[name=start_date]").val(" ");
    $("input[name=end_date]").val(" ");
    newImage.remove();

    // $("input[name=nameInput]").attr("required", false);
    // $("input[name=start_date]").attr("required", false);
    // $("input[name=end_date]").attr("required", false);

    $(".overlay").hide();    //닫혀서 힌트메시지가 안뜨는 것.
    $modal.style.display = 'none';

    displayGroupData();
}


//서버와 동일하게 이미지 url을 저장하는 방식으로 한다면 가능할지도,
//but, 그러면 기존에 있는 더미데이터 없다는 가정하에 진행 가능할 수도.
function loadFile(input) {
    var file = input.files[0];	//선택된 파일 가져오기

    //미리 만들어 놓은 div에 text(파일 이름) 추가
    // var name = document.getElementById('fileName');
    // name.textContent = file.name;

    console.log(newImage);
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
    console.log($(".preview").attr("src"));

};