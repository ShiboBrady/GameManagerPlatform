$(function () {
    $(".nav_box .refresh_button").click(function () { //刷新按钮
        console.log("reload");
        window.location.reload();
    });

    (function (H) { //匿名函数，用来设置Highchart的复选框在文本前面
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

    Highcharts.setOptions({ //highcharts设置全局属性
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

    $(".chooseDateType span").click(function(){ //上一版程序中使用，目前暂时不用
        $hidden = $(this).parent().find('.none');
        $show = $(this).parent().find('.active');
        $hidden.removeClass('none').addClass('active');
        $show.removeClass('active').addClass('none');
        $chooseDataType = $hidden.attr("for");
        console.log($chooseDataType);
        $(".choosedata").addClass("none");
        $('.'+$chooseDataType).removeClass("none");
    });

    $(".search-box .dateshow").click(function(){ //点击日期展示区域后，显示选择日期的区域
        if ($(".search-box .datepeaker").hasClass("searchdate-none") || $(".search-box .datepeaker").hasClass("none")){
            $(".search-box .datepeaker").removeClass("searchdate-none");
            $(".search-box .datepeaker").slideDown("1000");
            if ($(".search-box .datepeaker").hasClass("none")) {
                $(".search-box .datepeaker").removeClass("none");
            }
        } else {
            $(".search-box .datepeaker").addClass("searchdate-none");
            $(".search-box .datepeaker").slideUp("1000");
        }
    });

    $(".search-box .datepeaker ul").on('click', 'li', function() { //点击具体的时间段后，计算出对应的日期，并把日期填入日期展示区域
        var choosedval = $(this).attr('value');
        console.log(choosedval);
        var today = new Date(),
            startDate,
            endDate;

        var date = {};
        strToDate(choosedval, date);
        startDate = date["startDate"];
        endDate = date["endDate"];
        console.log(startDate + ' ' + endDate);
        $(".search-box .datepeaker").addClass("searchdate-none");
        $(".search-box .datepeaker").slideUp("1000");
        dateDisplay(startDate, endDate);
    });

    $(".search-box .datepeaker .confirm-button .confirm").click(function(){  //点击确定按钮后，先做数据格式验证，然后把数据填入日期展示区域
        var startDate = $("#begindate").val(),
            endDate = $("#enddate").val();
        console.log(startDate + ' ' + endDate);
        var startDateFormat = startDate.match(/^(\d{2,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
        var endDateFormat = endDate.match(/^(\d{2,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        console.log(startDateFormat);
        console.log(endDateFormat);
        if (startDateFormat == null || startDateFormat[3] > 12 || startDateFormat[4] > 31) {
            $("div.datepeaker .errorinfo .startdateerrormsg").show();
            return false;
        } else if (endDateFormat == null || endDateFormat[3] > 12 || endDateFormat[4] > 31) {
            $("div.datepeaker .errorinfo .enddateerrormsg").show();
            return false;
        }

        $(".search-box .datepeaker").addClass("searchdate-none");
        $(".search-box .datepeaker").slideUp("1000");
        dateDisplay(startDate, endDate);
        $(".search-box .datepeaker .more-date input").val("");
    });

    $(".search-box .datepeaker .confirm-button .cancel").click(function(){ //点击取消按钮，清空文本框的内容
        $(".search-box .datepeaker .more-date input").val("");
        $(".search-box .datepeaker").addClass("searchdate-none");
        $(".search-box .datepeaker").slideUp("1000");
    });

    $(".search-box .datepeaker .more-date input").focus(function(){ //当鼠标点击后，隐藏错误提示文字
        $("div.datepeaker .errorinfo .startdateerrormsg").hide();
        $("div.datepeaker .errorinfo .enddateerrormsg").hide();
    });

    initDateWhenPageLoad();
})

function getDate (date) { //获取日期，date为一个数组，传出参数
    console.log("search button click.");
    var activetab = $(".chooseDateType .active").attr("for");
    console.log(activetab);
    var startDate, endDate;
    if ("choosedata_easy" == activetab) {
        var choosedval = $('.choosedata .dropdown option:selected').val();
        console.log(choosedval);
        var today = new Date();
        strToDate(choosedval, date);
    } else {
        date["startDate"] = $("#begindate").val();
        date["endDate"] = $("#enddate").val();
    }
}

function strToDate (strDate, date) { //将字符串翻译为具体的日期
    var today = new Date(),
        startDate,
        endDate;

    switch (strDate) {
        case 'yesterday':
            console.log('yesterday');
            var yestd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
            yestd = formatDate(yestd);
            console.log("yesterday is: " + yestd);
            startDate = yestd;
            endDate = yestd;
            break;
        case 'thisweek':
            console.log('thisweek');
            var workday = today.getDay();
            var monDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday + 1);
            startDate = formatDate(monDay);
            endDate = formatDate(today);
            break;
        case 'lastweek':
            console.log('lastweek');
            var workday = today.getDay();
            var lastMonDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday - 6);
            var lastSunDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - workday);
            startDate = formatDate(lastMonDay);
            endDate = formatDate(lastSunDay);
            break;
        case 'lastthiryday':
            console.log('lastthiryday');
            var thiryDayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + 1);
            console.log(thiryDayBefore);
            startDate = formatDate(thiryDayBefore);
            endDate = formatDate(today);
            break;
        case 'lastmonth':
            console.log('lastmonth');
            var lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            console.log(lastMonthStart);
            var thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            var lastMonthEnd = new Date(thisMonthStart.getFullYear(), thisMonthStart.getMonth(), thisMonthStart.getDate() - 1);
            console.log(lastMonthEnd);
            startDate = formatDate(lastMonthStart);
            endDate = formatDate(lastMonthEnd); 
            break;
        default:
            startDate = formatDate(today);
            endDate = formatDate(today);
    }

    date["startDate"] = startDate;
    date["endDate"] = endDate;
}

function formatMonthAndDay(value){ //将 ‘2016-2-1’ 替换为 ‘2016-02-01’
    if (value < 10) {
        return '0' + value;
    } else {
        return value.toString();
    }
}

function formatDate(date){ //将 时间戳 转化成 ‘2016-02-01’ 类型的字符串
    return date.getFullYear() + '-' + formatMonthAndDay(date.getMonth() + 1) + '-' + formatMonthAndDay(date.getDate());
}

var date = {};
function search (data_kind) { //向服务器发送post请求
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

function dateDisplay(startDate, endDate) {  //将时间显示在 时间展示区域
    $(".display-startdate").html(startDate);
    $(".display-enddate").html(endDate);
}

function initDateWhenPageLoad() {  //当页面加载完毕后，将当日的日期显示在时间展示区域
    var date = {};
    strToDate('today', date);
    dateDisplay(date['startDate'], date['endDate']);
}