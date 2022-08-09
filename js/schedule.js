const $addForm = document.querySelector('.addForm');
const $primaryBtn_map = document.querySelector('.btn-primary-map');

$addForm.addEventListener('submit', addPlan);

function addPlan(event) {
    event.preventDefault();
    console.log("addPlan");
}

$primaryBtn_map.addEventListener('click', () => {
    location.href('#addPlanModal');
})