//더미데이터
const groups = [
    {
        id: 1,
        "name": "제주 여행팀",
        "start_date": "2022-09-01",
        "end_date" : "2022-09-05",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },

    //가로스크롤을 위한 test data
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "memberNum": "3명",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "memberNum": "3명",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "memberNum": "3명",
        "thumbnail" : `<img class="thumbnail" src=image/thumbnail_1.jpeg>`
    },
];

//초기 화면 세팅
const $modal = document.querySelector(".modal");
const $join_modal = document.querySelector(".join_modal");
const $makeBtn = document.querySelector(".makeBtn");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $close_btn = document.querySelector('.modal_close');
const $modalCloseBtn = document.querySelector('modalCloseBtn');
const $add_btn = document.querySelector(".add_group");
const $groupForm = document.querySelector(".groupForm");
const $groupListContainer = document.querySelector(".groupListContainer");

var newImage;

const groupItemTemplate = (newData) => {
    return `
    <li class="groupList">
        <a href="archive.html">
            <div class="itemContainer">
                <div class="imageContainer">
                    ${newData.thumbnail}
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
    groups.map(item => {
        console.log(item);
        const groupItem = groupItemTemplate(item);
        
        $makeBtn.insertAdjacentHTML('afterend', groupItem);
    })
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

    //유효성검사
    // if (isNotNull(groupData)) {
        groups.push({"name": $("input[name=nameInput]").val(), 
        "start_date": $("input[name=start_date]").val(),
        "end_date": $("input[name=end_date]").val(),
        // "thumbnail" : $("input[name=imageInput]").val()
        "thumbnail" : newImage
        });

        console.log("thumbnail: " + newImage);

        const newGroupItem = groupItemTemplate(groups[groups.length-1]);
        const groupList = document.querySelectorAll(".groupList");
        $makeBtn.insertAdjacentHTML('afterend', newGroupItem);
        // groupList[groupList.length-1].insertAdjacentHTML('afterend', newGroupItem);

        $("input[name=nameInput]").val(" ");
        $("input[name=start_date]").val(" ");
        $("input[name=end_date]").val(" ");
        $("input[name=imageInput]").val(" ");

        // $("input[name=nameInput]").attr("required", false);
        // $("input[name=start_date]").attr("required", false);
        // $("input[name=end_date]").attr("required", false);

        $(".overlay").hide();    //닫혀서 힌트메시지가 안뜨는 것.
        $modal.style.display = 'none';
    // } else { 
    //     alert('내용을 모두 입력해주세요.');
    // }
}


//서버와 동일하게 이미지 url을 저장하는 방식으로 한다면 가능할지도,
//but, 그러면 기존에 있는 더미데이터 없다는 가정하에 진행 가능할 수도.
function loadFile(input) {
    var file = input.files[0];	//선택된 파일 가져오기

    //미리 만들어 놓은 div에 text(파일 이름) 추가
    // var name = document.getElementById('fileName');
    // name.textContent = file.name;

  	//새로운 이미지 div 추가
      newImage = document.createElement("img");
      newImage.setAttribute("class", 'img');

    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);   
    console.log(newImage);

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    // newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지를 숨긴다
    newImage.style.objectFit = "contain";

    //이미지를 image-show div에 추가
    var container = document.querySelector('.image');
    container.appendChild(newImage);
};

// var submit = document.getElementById('submitButton');
// submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

// function showImage() {
//     var newImage = document.getElementById('image-show').lastElementChild;
  
//     //이미지는 화면에 나타나고
//     newImage.style.visibility = "visible";
  
//     //이미지 업로드 버튼은 숨겨진다
//     document.getElementById('image-upload').style.visibility = 'hidden';

//     document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
// }