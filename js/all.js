'use strict';

var wFucition = function wFucition() {
  return console.log('b');
};
'use strict';

$(document).ready(function () {
    function initMap() {};

    function showInfo() {};
    $('#js-select').on('change', function (e) {
        e.preventDefault();
        $('#listitem').html('');
        $.ajax({
            type: 'GET',
            url: './openData.json',
            success: function success(data) {
                var thisData = data.parkingLots;
                console.log(thisData.length);

                var infowindow = new google.maps.InfoWindow();
                var map;
                var marker = [];
                for (var i = 0; i < thisData.length; i++) {
                    if ($('#js-select').val() === thisData[i].areaName) {
                        var latlng = new google.maps.LatLng(thisData[i].wgsY, thisData[i].wgsX);
                        //縮放大小
                        var myOptions = {
                            zoom: 13,
                            center: latlng
                        };
                    } // if End
                } //for End

                var map = new google.maps.Map($("#map")[0], myOptions); //Create Map
                for (i = 0; i < thisData.length; i++) {

                    var parkName = thisData[i].parkName;
                    var areaName = thisData[i].areaName;
                    var surplusSpace = thisData[i].surplusSpace;
                    var totalSpace = thisData[i].totalSpace;
                    var payGuide = thisData[i].payGuide;
                    var address = thisData[i].address;

                    var item_template = '\n                    <li class="dropDown"> \n                        <a>{{parkName}}</a>\n                        <div class="submenu">\n                            <p>\u662F\u5426\u958B\u653E\uFF1A<span>{{surplusSpace}}</span></p>\n                            <p>\u5269\u9918\u8ECA\u4F4D\uFF1A<span>{{totalSpace}}</span></p>\n                            <p>\u6536\u8CBB\u8CBB\u7387\uFF1A<span>{{payGuide}}</span></p>\n                            <p>\u5730\u5740\uFF1A<span>{{address}}</span></p>\n                        </div>\n                    </li>';

                    var result = item_template.replace("{{parkName}}", parkName).replace("{{surplusSpace}}", surplusSpace).replace("{{totalSpace}}", totalSpace).replace("{{payGuide}}", payGuide).replace("{{address}}", address);
                    if ($('#js-select').val() === areaName) {
                        $('#listitem').append(result);

                        // add map marker
                        marker[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(thisData[i].wgsY, thisData[i].wgsX),
                            map: map,
                            parkName: parkName,
                            surplusSpace: surplusSpace,
                            totalSpace: totalSpace

                        });
                        //open infowindow event 標記名稱
                        google.maps.event.addListener(marker[i], 'click', function () {
                            showInfo(map, this);
                        });
                    } //if End
                    showInfo = function showInfo(mapObj, markerObj) {
                        infowindow.setContent(infoContent(markerObj));
                        infowindow.open(mapObj, markerObj);
                    }; //showInfo

                    //標記圖標上顯示
                    var infoContent = function infoContent(markerObj) {
                        // Setting infowindow content function
                        var html = '<li>名稱: ' + markerObj.parkName + '</li>';
                        html += '<li>是否開放: ' + markerObj.surplusSpace + '</li></span>';
                        html += '<li>剩餘位數: ' + markerObj.totalSpace + '</li></span>';

                        return html;
                    };
                } //for End

                //需放在他結束後，否則有幾欄它則會開關幾次
                $('#listitem').find('.dropDown').children('a').click(function () {
                    $(this).siblings().slideToggle();
                });
            },
            error: function error() {
                console.log('載入失敗');
            }
        });
    }); //onChange End

});
//# sourceMappingURL=all.js.map
