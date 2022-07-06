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

function addGroup(event) {
    event.preventDefault();

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

    $(".overlay").hide();
    $modal.style.display = 'none';
}