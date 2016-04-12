$(function () {
    if (window.self == window.top) {
        window.location.href = '/';
    }

    $(".nav_box .refresh_button").click(function () { //刷新按钮
        console.log("reload");
        window.location.reload();
    });

    $(".choose-data-oneday input").focus(function () {
        $(".search-button .errormsg").html("");
    })
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

function search (data_kind) { //向服务器发送post请求
    var date = {};
    console.log(data_kind);
    var startDate,
        endDate;
    var dateArr = [];
    if ($(".search-box .choose-date").length > 0) {
        startDate = $(".display-startdate").html();
        endDate = $(".display-enddate").html();
        console.log(startDate);
        console.log(endDate);
        var dateArr = [startDate];
        if (startDate != endDate) {
            dateArr.push(endDate);
        }
        console.log(dateArr);
    }
    if ($(".search-box .choose-data-oneday").length > 0) {
        startDate = $(".search-box .choose-data-oneday input").val();
        if (startDate == null || startDate == "") {
            var errormsg = "请输入一个日期";
            layer.tips(errormsg, '.search-box .choose-data-oneday input', { tips: 1 });
            // $(".search-button .errormsg").html(errormsg);
            return false;
        }
        console.log(startDate);
        dateArr.push(startDate);
    }

    var roomInfo = -1;
    if ($(".search-box .choose-room").length > 0) {
        console.log("Has room choose item.");
        roomInfo = $(".search-box .choose-room select").val();
        console.log(roomInfo);
    }

    var channelInfo = "";
    if ($('.search-box .choose-channelId').length > 0) {
        console.log("Has channel item.");
        channelInfo = $('.search-box .choose-channelId input').val();
        console.log(channelInfo);
        if (channelInfo == "") {
            var errormsg = "请输入渠道号";
            layer.tips(errormsg, '.search-box .choose-channelId input', { tips: 1 });
            return false;
        }
    }

    var pointStart = -1;
    var pointEnd = -1;
    if ($('.search-box .choose-point').length > 0) {
        console.log("Has point item.");
        var strPointStart = $('.search-box .choose-point input.point-start').val();
        var strPointEnd = $('.search-box .choose-point input.point-end').val();
        if (strPointStart == "") {
            var errormsg = "请输入最少竞技点";
            layer.tips(errormsg, '.search-box .choose-point input.point-start', { tips: 1 });
            return false;
        }
        if (strPointEnd == "") {
            var errormsg = "请输入最大竞技点";
            layer.tips(errormsg, '.search-box .choose-point input.point-end', { tips: 1 });
            return false;
        }
        //这里需要合法性检查
        var re = /^\d*$/;
        if (!re.test(strPointStart)) {
            console.log("error.");
            var errormsg = "请输入数字";
            layer.tips(errormsg, '.search-box .choose-point input.point-start', { tips: 1 });
            return;
        }
        if (!re.test(strPointEnd)) {
            console.log("error.");
            var errormsg = "请输入数字";
            layer.tips(errormsg, '.search-box .choose-point input.point-end', { tips: 1 });
            return;
        }
        pointStart = Number(strPointStart);
        pointEnd = Number(strPointEnd);
        if (pointStart > pointEnd) {
            var errormsg = "最小竞技点需小于等于最大竞技点";
            layer.tips(errormsg, '.search-box .choose-point input.point-start', { tips: 1 });
            return false;
        }
    }

    var commitDate = {};
    commitDate["dateArr"] = dateArr;
    if (roomInfo != -1) {
        commitDate["roomType"] = roomInfo;
    }
    if (channelInfo != "") {
        commitDate["channel"] = channelInfo;
    }
    if (pointStart != -1) {
        commitDate["minPoint"] = pointStart;
        commitDate["maxPoint"] = pointEnd;
    }

    console.log(commitDate);
    // $.ajax({
    //     type: 'POST',
    //     url: '/data/' + data_kind,
    //     success: callbacksuccess,
    //     error: callbackerror,
    //     data: commitDate,
    // })

    var result = GetPageData('/data/' + data_kind, commitDate, callbacksuccess);
    if (null == result) {
        return;
    }
    // callbacksuccess(result);
}

// function GetMsgError(errcode, message) {
//     var errormsg = errcode + ", " + message;
//     $(".search-button .errormsg").html(errormsg);
// }

function callbackerror(XMLHttpRequest, textStatus, errorThrown) {
    var errormsg = XMLHttpRequest.status + ", " + XMLHttpRequest.readyState + ', ' + textStatus;
    $(".search-button .errormsg").html(errormsg);
}

function dateDisplay(startDate, endDate) {  //将时间显示在 时间展示区域
    if ($('.display-startdate').length > 0) {
        $(".display-startdate").html(startDate);
        $(".display-enddate").html(endDate);
    }
    if ($('.display-oneday').length > 0) {
        $('.display-oneday').val(startDate);
    }
}

function initDateWhenPageLoad() {  //当页面加载完毕后，将当日的日期显示在时间展示区域
    var date = {};
    strToDate('today', date);
    dateDisplay(date['startDate'], date['endDate']);
}

function InitHighCharts() {
    // $.fn.dataTable.TableTools.defaults.aButtons = [ "xls" ];
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
            printChart: "打印该图片",
            downloadJPEG: "下载jpeg格式图片",
            downloadPDF: "下载pdf文件",
        }
    });
}

function InitDatatables(domItem, columnsData, isNeedResizable){
    $(domItem).DataTable({
        "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath": "public/lib/DataTables-1.10.10/extensions/TableTools-2.2.4/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
                {
                    "sExtends": "xls",
                    "sButtonText": "保存为excel文件",
                    "oSelectorOpts": {
                        page: 'current',
                    },
                }
            ]
        },
        "oTableTools": {
            "aButtons": [
                {
                "sExtends": "xls",
                "sCharSet": "utf8",
                "bBomInc":true,
                }
            ]
        },
        "data":[],
        "columns": columnsData,
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "first":      "第一页",
                "last":       "最后一页",
                "next":       "下一页",
                "previous":   "前一页"
            },
        },
        "paging": true,
        "searching": false,
        "select": false,
        "scrollX": true,
        "ordering": true,
    });
    if (isNeedResizable) {
        $(domItem).colResizable();
    }
}

function AddRangeDataChooseBox(containerBox){
    var rangeDataChooseBox = 
    '<div class="search-item choose-date">' +
        '<div class="search-item-content choose-date-content">' +
            '<div class="dateshow">' +
                '<div class="date">' +
                    '<div class="date_display">' +
                        '<span class="display-startdate"></span>' +
                        '<span>~</span>' +
                        '<span class="display-enddate"></span>' +
                    '</div>' +
                '</div>' +
                '<div class="arrow_box"><div class="arrow"></div></div>' +
            '</div>' +
            '<div class="datepeaker none">' +
                '<div class="easy">' +
                    '<ul>' +
                        '<li value="yesterday">昨天</li>' +
                        '<li value="thisweek">本周</li>' +
                        '<li value="lastweek">上周</li>' +
                        '<li value="lastthiryday">最近30天</li>' +
                        '<li value="lastmonth">上月</li>' +
                    '</ul>' +
                '</div>' +
                '<div class="errorinfo">' +
                    '<span class="startdateerrormsg">日期格式不正确</span>' +
                    '<span class="enddateerrormsg">日期格式不正确</span>' +
                '</div>' +
                '<div class="more-date">' +
                    '<label>自定</label>' +
                    '<input type="text" id="begindate" onfocus="WdatePicker();">' +
                    '<label>到</label>' +
                    '<input type="text" id="enddate" onfocus="WdatePicker();">' +
                '</div>' +
                '<div class="confirm-button">' +
                    '<input class="confirm" type="button" value="确定">' +
                    '<input class="cancel" type="button" value="取消">' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    $(containerBox).append(rangeDataChooseBox);
    $(containerBox + ' .dateshow').on('click', function(){ //点击日期展示区域后，显示选择日期的区域
        if ($(".search-box .datepeaker").hasClass("searchdate-none") || $(".search-box .datepeaker").hasClass("none")){
            $(".search-box .datepeaker").removeClass("searchdate-none");
            $(".search-box .datepeaker").slideDown("1000");
            if ($(".search-box .datepeaker").hasClass("none")) {
                $(".search-box .datepeaker").removeClass("none");
            }
        } else {
            $(".search-box .datepeaker").addClass("searchdate-none");
            $(".search-box .datepeaker").slideUp("500");
        }
    });

    $(containerBox + ' .datepeaker ul').on('click', 'li', function() { //点击具体的时间段后，计算出对应的日期，并把日期填入日期展示区域
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
        $(".search-box .datepeaker").slideUp("500");
        dateDisplay(startDate, endDate);
    });

    $(containerBox + ' .datepeaker .confirm-button .confirm').click(function(){  //点击确定按钮后，先做数据格式验证，然后把数据填入日期展示区域
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

    $(containerBox + ' .datepeaker .confirm-button .cancel').click(function(){ //点击取消按钮，清空文本框的内容
        $(".search-box .datepeaker .more-date input").val("");
        $(".search-box .datepeaker").addClass("searchdate-none");
        $(".search-box .datepeaker").slideUp("1000");
    });

    $(containerBox + ' .datepeaker .more-date input').focus(function(){ //当鼠标点击后，隐藏错误提示文字
        $("div.datepeaker .errorinfo .startdateerrormsg").hide();
        $("div.datepeaker .errorinfo .enddateerrormsg").hide();
    });

    var date = {};
    strToDate('today', date);
    $(containerBox + ' .dateshow .display-startdate').html(date['startDate']);
    $(containerBox + ' .dateshow .display-enddate').html(date['endDate']);
}

function AddChooseOneDayBox(containerBox) {
    var chooseOneDayBox =
    '<div class="search-item choose-data-oneday">' + 
        '<div class="search-item-content choose-data-oneday-content">' + 
            '<input type="text" class="display-oneday" onfocus="WdatePicker()">' + 
        '</div>' + 
    '</div>';
    $(containerBox).append(chooseOneDayBox);
    var date = {};
    strToDate('today', date);
    $(containerBox + ' .choose-data-oneday .display-oneday').val(date['startDate']);
}

function AddChooseBoxInitFromServer(containerBox, chooseType) {
    var chooseBox = 
    '<div class="search-item choose-room">' +
        '<div class="search-item-content choose-' + chooseType + '-content">' +
            '<select name="' + chooseType + '">' +
            '</select>' +
        '</div>' +
    '</div>';
    $(containerBox).append(chooseBox);
    var data;
    if ("match" == chooseType) {
        data = GetMatchNameData();
    } else if ("game" == chooseType) {
        data = GetGameNameData();
    } else {
        return;
    }
    console.log(data);
    var listitem = $('.choose-room select');
    for (var index in data) {
        listitem.append('<option value=' + (parseInt(index) + 1) + '>' + data[index] + '</option>');
    }
}

function AddChannelBox(containerBox){
    var channelBox = 
    '<div class="search-item choose-channelId">' +
        '<div class="search-item-content choose-channelId-content">' +
            '<input type="text" placeholder="渠道号">' +
        '</div>' +
    '</div>';
    $(containerBox).append(channelBox);
}

function AddPointBox(containerBox) {
    var pointBox = 
    '<div class="search-item choose-point">' +
        '<div class="search-item-content choose-point-content">' +
            '<input type="text" class="point-start" placeholder="最少竞技点">' +
            '<span> ~ </span>' +
            '<input type="text" class="point-end" placeholder="最大竞技点">' +
        '</div>' +
    '</div>';
    $(containerBox).append(pointBox);
}

function AddSearchButtonBox(containerBox, interface) {
    var searchButtonBox = 
    '<div class="search-item search-button">' +
        '<div class="search-item-content search-button-content">' +
            '<a class="button button-blue button-search">查询</a>' +
            '<span class="errormsg"></span>' +
        '</div>' +
    '</div>';
    $(containerBox).append(searchButtonBox);
    $(containerBox + ' .search-button .button-search').click(function(){
        search(interface);
    });
}


function InitNavWhenPageLoad(url) {
    var strUrl = window.location.href;
    console.log("Url is: " + strUrl);
    var result = strUrl.match(/([^\?\/]+)\?/);
    var result = strUrl.match(/\/(.*\.html)\?/);
    console.log("get url result: " + result);
    var menuList = window.parent.GetNavList(url);
    if (menuList == null) {
        console.log("Cannot get menulist.");
        return;
    }
    menuList.reverse();
    console.log("nav list is: ");
    console.log(menuList);
    var navbox = $('.nav_box nav');
    navbox.append('<span>当前位置：</span>');
    for (var index in menuList) {
        navbox.append('<span> ' + menuList[index] + ' </span>');
        if (index != (menuList.length - 1)) {
            navbox.append('<span>&gt;</span>');
        }
    }
    return;
}