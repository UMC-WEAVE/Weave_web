//초기 선언부(onCreate)
/***data***/
const groups = [
    {
        id: 1,
        "name": "제주 여행팀",
        "start_date": "2022-09-01",
        "end_date" : "2022-09-05",
        "memberNum": "4명",
    },
    {
        id: 2,
        "name": "부산 가요",
        "start_date": "2022-07-01",
        "end_date" : "2022-07-03",
        "memberNum": "3명",
    },
];

const $modal = document.querySelector(".modal");
const $join_modal = document.querySelector(".join_modal");
const $makeGroupButton = document.querySelector(".makeGroupBtn");
const $close_btn = document.querySelector('.modal_close');
const $add_btn = document.querySelector(".add_group");
const $groupForm = document.querySelector(".groupForm");
const $groupListContainer = document.querySelector(".groupListContainer");

const groupItemTemplate = (newData) => {
    return `
    <li class="groupList">
        <a href="archive.html">
            <div class="itemContainer">
                <div class="imageContainer">
                    <img class="thumbnail" src="image/thumbnail_1.jpeg">
                </div>
                <div class="groupInfo">
                    <div class="tripTitle">
                        <span>${newData.name}</span>
                    </div>
                    <div class="tripPeriod">
                        <span>${newData.start_date} ~ ${newData.end_date}</span>
                    </div>
                    <div class="tripMember">
                        <span>${newData.memberNum}</span>
                    </div>
                </div>
            </div>
        </a>
    </li>
    `;
}

/***load group data***/
function displayGroupData() {
    groups.map(item => {
        console.log(item);
        const groupItem = groupItemTemplate(item);
        
        $('.makeBtn').before($(groupItem));
    })
}

displayGroupData();

/***makeGroupBtn value setting***/
var $btnValue = "새로운 그룹을\n만들어보세요";
$(".makeGroupBtn").attr("value", $btnValue)

//onCreate 끝

/***modal open, close***/
$makeGroupButton.addEventListener('click', () => {
    $(".overlay").show();
    $modal.style.display = 'block';
})

$close_btn.addEventListener('click', () => {
    $(".overlay").hide();
    $modal.style.display = 'none';
})

// $add_btn.addEventListener('click', () => {

// })

/***add new group***/
console.log(groups);
$add_btn.addEventListener('click', addGroup);

function isNotNull(groupData) {
    for (var i = 0; i < groupData.length; i++) {
        if (groupData[i] == '' || groupData[i] == ' ')
            return false;
    }
    return true;
}

function addGroup(event) {
    // event.preventDefault();

    console.log($groupForm);

    let groupData = [$groupForm.nameInput.value, $groupForm.start_date.value, $groupForm.end_date.value, $groupForm.memberInput.value];
    console.log(groupData);
    console.log("null? = " + isNotNull(groupData));

    if (isNotNull(groupData)) {
        groups.push({"name": $("input[name=nameInput]").val(), 
        "start_date": $("input[name=start_date]").val(),
        "end_date": $("input[name=end_date]").val(),
        "memberNum": $("input[name=memberInput]").val(),});

        const newGroupItem = groupItemTemplate(groups[groups.length-1]);
        const groupList = document.querySelectorAll(".groupList");
        groupList[groupList.length-1].insertAdjacentHTML('afterend', newGroupItem);

        $("input[name=nameInput]").val(" ");
        $("input[name=start_date]").val(" ");
        $("input[name=end_date]").val(" ");
        $("input[name=memberInput]").val(" ");

        // $("input[name=nameInput]").attr("required", false);
        // $("input[name=start_date]").attr("required", false);
        // $("input[name=end_date]").attr("required", false);
        // $("input[name=memberInput]").attr("required", false);

        $(".overlay").hide();    //닫혀서 힌트메시지가 안뜨는 것.
        $modal.style.display = 'none';
    } else { 
        alert('내용을 모두 입력해주세요.');
    }
}