const $form = document.querySelector('.form');

$form.addEventListener('submit', () => {
    event.preventDefault();
    console.log($("input[name=imageInput]").val());
});