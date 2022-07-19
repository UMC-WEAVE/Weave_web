//  * 1. 지도 띄우고 V
//  * 2. 일정 더미데이터로 만들어서 띄우기 V
//  * 3. 일정 연결 V
//  * 4. 카테고리 드롭다운 메뉴 V
//  * 5. 메뉴 선택시 그 메뉴에 해당하는 걸로 마커 뜨도록 V

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표    서버에서 받아오는 초기 위치(위도, 경도)
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 
var ps = new kakao.maps.services.Places(map); 

var plan = [
    {
        object : [{title: '카카오', latlng: new kakao.maps.LatLng(33.450705, 126.570677)},
             {title: '생태연못', latlng: new kakao.maps.LatLng(33.450936, 126.569477)}]    
    },
    {
        object : [{title: '텃밭', latlng: new kakao.maps.LatLng(33.450879, 126.569940)},
             {title: '근린공원', latlng: new kakao.maps.LatLng(33.451393, 126.570738)}]    
    }
];

// var day1 = [
//     {
//         idx : 1,
//         title: '카카오', 
//         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
//     },
//     {
//         idx : 1,
//         title: '생태연못', 
//         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
//     }
// ];

// var day2 = [
//     {
//         idx : 2,
//         title: '텃밭', 
//         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
//     },
//     {
//         idx : 2,
//         title: '근린공원',
//         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
//     }
// ];

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

//인포윈도우 객체
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

const $category = document.querySelector('category');
// console.log(plan[0].object[0].title);

//좌표배열 선언
var linePath = [];
var markers = [];
var overlays = [];

for (var i = 0; i < plan.length; i ++) {
    for (var j = 0; j < plan[i].object.length; j++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: plan[i].object[j].latlng, // 마커를 표시할 위치
            title : plan[i].object[j].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });

        linePath[j] = plan[i].object[j].latlng;//좌표배열에 저장

            
        // 커스텀 오버레이에 표시할 내용입니다     
        // HTML 문자열 또는 Dom Element 입니다 
        var content = `<div class ="customoverlay"><span class="left"></span><span class="center">${plan[i].object[j].title}</span><span class="right"></span></div>`;

        // 커스텀 오버레이가 표시될 위치입니다 
        var position = plan[i].object[j].latlng;  

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content   
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
    }

    var polyline = new kakao.maps.Polyline({
        map: map,
        path: linePath,
        strokeWeight: 2,
        strokeColor: '#FFFF00',
        strokeOpacity: 1.0,
        strokeStyle: 'solid'
    });

    polyline.setMap(map);  

    linePath = [];
}

console.log(plan);

// var location = [//더미데이터  //데이터 형식 아직 모름
//     {
//         "day" : 1,
//         "locations" : [
//             { "address" : "주소1", "place" : "카카오 본사", "geo" : { "lat" : "33.450701", "lng" : "126.570667"} },
//             { "address" : "주소2", "place" : "카카오 오름", "geo" : { "lat" : "33.45055277880841", "lng" : "126.56958639912801"} },
//             { "address" : "주소1", "place" : "첨단캠퍼스", "geo" : { "lat" : "33.44768966475489", "lng" : "126.5681378522564"} },
//         ]
//     }
// ];

// for (var i = 0; i < location.length; i++) {
//     for (var j = 0; j < location.locations.length; j++) {
//         console.log(location.locations.geo.lat + ", " + location.locations.geo.lng);
//     }
// }

const categoryBtn = document.querySelector('.categoryBtn');
const category = document.querySelector('.category');
const lists = document.querySelectorAll('.list');

categoryBtn.addEventListener('click', () => {
    console.log("드롭다운 메뉴");
    console.log("display: " + category.style.display);
    if (category.style.display == 'none' || category.style.display == '') {
        category.style.display = 'block';
    } else {
        category.style.display = 'none';
    }
});

for (var i = 0; i < lists.length; i++)
    lists[i].addEventListener('click', listClick);

function listClick(event) {
    console.log(event.target.textContent);
    removeMarkers();
    removeOverlays();
    switch (event.target.textContent) {
        case "카페": 
            ps.categorySearch('CE7', placesSearchCB, {useMapBounds:true}); 
            break;
        case "음식점": 
            ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true}); 
            break;
        case "숙박": 
            ps.categorySearch('AD5', placesSearchCB, {useMapBounds:true}); 
            break;
        case "관광명소": 
            ps.categorySearch('AT4', placesSearchCB, {useMapBounds:true}); 
            break;
        case "문화시설": 
            ps.categorySearch('CT1', placesSearchCB, {useMapBounds:true}); 
            break;
        case "편의점": 
            ps.categorySearch('CS2', placesSearchCB, {useMapBounds:true}); 
            break;
    }
}



// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
        }       
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 커스텀 오버레이에 표시할 내용입니다     
    // HTML 문자열 또는 Dom Element 입니다 
    var content = `<div class ="customoverlay"><span class="left"></span><span class="center">${place.place_name}</span><span class="right"></span></div>`;

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(place.y, place.x);  

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content   
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);

    markers.push(marker);
    overlays.push(customOverlay);
}

// function makeInfowindow(marker) {
//     console.log(place.place_name);
// }

function removeMarkers() {
    console.log("remove markers");
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function removeOverlays() {
    console.log("remove overlays");
    for (var i = 0; i < overlays.length; i++) {
        overlays[i].setMap(null);
    }
}
