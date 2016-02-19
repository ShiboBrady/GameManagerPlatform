$(function () {
    $(".nav_box .refresh_button").click(function () {
        console.log("reload");
        window.location.reload();
    });

    (function (H) {
        H.wrap(H.Legend.prototype, 'positionCheckboxes', function (p, scrollOffset) {
            var alignAttr = this.group.alignAttr,
                translateY,
                clipHeight = this.clipHeight || this.legendHeight;

            if (alignAttr) {
                translateY = alignAttr.translateY;
                H.each(this.allItems, function (item) {
                    var checkbox = item.checkbox,
                        bBox = item.legendItem.getBBox(),
                        top;

                    if (checkbox) {
                        top = (translateY + checkbox.y + (scrollOffset || 0) + 3);
                        H.css(checkbox, {
                            left: (alignAttr.translateX + item.checkboxOffset + checkbox.x - 60 - bBox.width) + 'px',
                            top: top + 'px',
                            display: top > translateY - 6 && top < translateY + clipHeight - 6 ? '' : 'none'
                        });
                    }
                });
            }
        });
    })(Highcharts);;

    Highcharts.setOptions({
        global : {
            useUTC : false
        },
        lang: {
            rangeSelectorZoom: "选择时间段",
            printChart: "打印该图片",
            downloadJPEG: "下载jpeg格式图片",
            downloadPDF: "下载pdf文件",
            downloadPNG: "下载png格式图片",
            downloadSVG: "下载svg格式图片",
        }
    });

    $(".chooseDateType span").click(function(){
        $hidden = $(this).parent().find('.none');
        $show = $(this).parent().find('.active');
        $hidden.removeClass('none').addClass('active');
        $show.removeClass('active').addClass('none');
        $chooseDataType = $hidden.attr("for");
        console.log($chooseDataType);
        $(".choosedata").addClass("none");
        $('.'+$chooseDataType).removeClass("none");
    });

    $(".search-box .arrow").click(function(){
        if ($(".search-box .datepeaker").hasClass("none1")){
            $(".search-box .datepeaker").removeClass("none1");
            $(".search-box .datepeaker").slideDown("1000");
        } else {
            $(".search-box .datepeaker").addClass("none1");
            $(".search-box .datepeaker").slideUp("1000");
        }
    });
})

function getDate (date) {
    console.log("search button click.");
    var activetab = $(".chooseDateType .active").attr("for");
    console.log(activetab);
    var startDate, endDate;
    if ("choosedata_easy" == activetab) {
        console.log("easy");
        var choosedval = $('.choosedata .dropdown option:selected').val();
        console.log(choosedval);
        // var d = new Date(2016, 0, 27);
        // d.setTime(d.getTime()-24*60*60*1000);
        var today = new Date();
        console.log(today.getDay());
        
        switch (choosedval) {
            case 'yesterday':
                console.log('yesterday');
                var yestd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                yestd = yestd.getFullYear() + '-' + (yestd.getMonth() + 1) + '-' + yestd.getDate();
                console.log("yesterday is: " + yestd);
                startDate = yestd;
                endDate = yestd;
                break;
            case 'thisweek':
                console.log('thisweek');
                var workday = today.getDay();
                var monDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday + 1);
                startDate = monDay.getFullYear() + '-' + (monDay.getMonth() + 1) + '-' + monDay.getDate();
                endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                break;
            case 'lastweek':
                console.log('lastweek');
                var workday = today.getDay();
                var lastMonDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday - 6);
                var lastSunDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday);
                startDate = lastMonDay.getFullYear() + '-' + (lastMonDay.getMonth() + 1) + '-' + lastMonDay.getDate();
                endDate = lastSunDay.getFullYear() + '-' + (lastSunDay.getMonth() + 1) + '-' + lastSunDay.getDate();
                break;
            case 'lastthiryday':
                console.log('lastthiryday');
                var thiryDayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + 1);
                console.log(thiryDayBefore);
                startDate = thiryDayBefore.getFullYear() + '-' + (thiryDayBefore.getMonth() + 1) + '-' + thiryDayBefore.getDate();
                endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                break;
            case 'lastmonth':
                console.log('lastmonth');
                var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                console.log(lastMonthStart);
                var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                var lastMonthEnd = new Date(thisMonthStart.getFullYear(), thisMonthStart.getMonth(), thisMonthStart.getDate() - 1);
                console.log(lastMonthEnd);
                startDate = lastMonthStart.getFullYear() + '-' + (lastMonthStart.getMonth() + 1) + '-' + lastMonthStart.getDate();
                endDate = lastMonthEnd.getFullYear() + '-' + (lastMonthEnd.getMonth() + 1) + '-' + lastMonthEnd.getDate();
                break;
            default:
                startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();;
                endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();;
        }
    } else {
        startDate = $("#begindate").val();
        endDate = $("#enddate").val();
    }
    console.log(startDate);
    console.log(endDate);
    date["startDate"] = startDate;
    date["endDate"] = endDate;
}

var date = {};
function search (data_kind) {
    console.log(data_kind);
    getDate(date);
    console.log(date["startDate"]);
    console.log(date["endDate"]);
    $.ajax({
        type: 'POST',
        url: '/data/' + data_kind,
        success: callbacksuccess,
    })
}