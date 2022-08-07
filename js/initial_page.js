// $(".carousel").carousel({pause:false});

$(document).ready(function() {
    $('.carousel').carousel({
       pause: false
    });
    console.log("ddd");
 });

 let images = [];

//  function preload() {
//    for(let i = 0; i < preload.arguments.lenght; i++) {
//      images[i] = new Image();
//      images[i].src = preload.arguments.src;
//      $(`#img_1`).attr('src', images[i].src);
//    }
//  }
 
//  preload(
//    "./image/sea1.jpg",
//    "./image/wave1.jpg",
//    "./image/wave_sand3.jpg"
//  )