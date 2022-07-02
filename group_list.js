//초기 선언부(onCreate)
/***data***/
const groups = [
    {
        id: 1,
        "name": "제주 여행팀",
        "period": "2022-09-01~2022-09-04",
        "place": "제주도",
        "memberNum": "4명",
    },
    {
        id: 2,
        "name": "부산 가요",
        "period": "2022-07-01~2022-07-03",
        "place": "부산",
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
                        <span>${newData.period}</span>
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

$add_btn.addEventListener('click', () => {
    $(".overlay").hide();
    $modal.style.display = 'none';
})

/***add new group***/
console.log(groups);
$add_btn.addEventListener('click', addGroup);

function addGroup(event) {
    groups.push({"name": $("input[name=nameInput]").val(), 
                "period": $("input[name=periodInput]").val(),
                "place": $("input[name=placeInput]").val(),
                "memberNum": $("input[name=memberInput]").val(),});

    const newGroupItem = groupItemTemplate(groups[groups.length-1]);
    const groupList = document.querySelectorAll(".groupList");
    groupList[groupList.length-1].insertAdjacentHTML('afterend', newGroupItem);

    $("input[name=nameInput]").val(" ");
    $("input[name=periodInput]").val(" ");
    $("input[name=placeInput]").val(" ");
    $("input[name=memberInput]").val(" ");
}