$(function () {
    $(".nav_box .refresh_button").click(function () {
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
    })(Highcharts);

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
        }
    });   

    // var chart1 = new Highcharts.Chart({
    var chart1 = new Highcharts.StockChart({
        chart: {
            style:{ backgroundColor: '#fafafa', borderRadius: '5px'},
            renderTo: 'container1',
            type:'spline',
            marginRight: 50,
        },
        title: {
            text:'在线人数统计曲线图'
        },
        xAxis: {
            // categories: timeInitData, 
            type: 'datetime',
            title: { text:'name' },
        },
        yAxis: {
            title:{text:'在线人数'}
        },
        series: [{
            name:'总在线人数', 
            // data:gameInitData,
        }],
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
            }
        },
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [
            {
                count: 5,
                type: 'second',
                text: '5s'
            },
            {
                count: 10,
                type: 'second',
                text: '10s'
            }, 
            {
                count: 20,
                type: 'second',
                text: '20s'
            },
            {
                type: 'all',
                text: 'All'
            },
            ],
            inputEnabled: false,
            selected: 1,
        },
        credits: {enabled:false}, //右下角水印
    });

    
    // var chart2 = new Highcharts.Chart({
    var chart2 = new Highcharts.StockChart({
        chart: {
            renderTo: 'container2',
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
        },
        title: {
            text: '在线人数统计曲线图'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval:50,
            // categories: timeInitData,
            title: { text:'name' }
        },
        yAxis: {title:{text:'在线人数'}},
        
        series: [
            {
                name:'斗地主普通场', 
                selected: true,
            },
            {
                name:'斗地主中级场', 
                selected: true,
            },
            {
                name:'斗地主高级场', 
                selected: true,
            }, 
            {
                name:'斗地主贵宾场', 
                selected: true,
            },
        ],
        legend: {
            enabled: true,
            symbolPadding: 20,
            // symbolWidth: 0
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false, //表示是否有数据点
                },
                showCheckbox:true, //表示是否要显示复选框，该选项与series：中的selected配合使用。
                events :{
                    checkboxClick: function(event) { //表示复选框的选择与取消都可以显示和隐藏所表示的数据。
                        if(event.checked==true) {
                            this.show();
                        }
                        else {
                            this.hide();
                        }
                    },
                },
            },
        },
        rangeSelector: {
            buttons: [
            {
                count: 5,
                type: 'second',
                text: '5s'
            },
            {
                count: 10,
                type: 'second',
                text: '10s'
            }, 
            {
                count: 20,
                type: 'second',
                text: '20s'
            },
            {
                type: 'all',
                text: 'All'
            },
            ],
            inputEnabled: false,
            selected: 0,
        },
        credits: {enabled:false},
    });
    
    chart1.reflow();
    chart2.reflow();

    setInterval(generateData, 2000);

    var data = [
        [
            "1",
            "2015-05-01 00:00",
            "1000",
        ],
        [
            "2",
            "2015-05-01 00:02",
            "1000",
        ],
        [
            "3",
            "2015-05-01 00:04",
            "1000",
        ],
    ];
    $('#search_result_table').DataTable({
        "data":data,
        "columns": [
                { 'title': '序号' },
                { 'title': '时间点' },
                { 'title': '在线' }
            ],
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)"
        },
        "paging": false,
        "searching": false,
        "select": false,
        "ordering": false,
    });
    $('#search_result_table').colResizable();

    $(".tabs li").click(function () { 
      if ($(this).hasClass("active")){
                                  
          } else {  
            $(this).siblings().removeClass("active");
              $(this).addClass("active");
              $chooseDataType = $(this).attr("for");
              $(".choosedata").addClass("none");
              $('.'+$chooseDataType).removeClass("none");
          }
      });
});

var generateData = function () {
    console.log("Call generateData once.");
    $.ajax({
        type: "POST",
        url: "/data/online_user", 
        async: false,
        error : function() {  
            console.log("Get online_user info error.");  
        },
        success: function (data) {
            var jsonData = JSON.parse(data);
            var time = parseInt(jsonData['time']); //获取时间
            var eachRoomPlayer = [];
            var total = parseInt(jsonData['total']); //总在线人数
            eachRoomPlayer.push(parseInt(jsonData['game1'])); //每个房间在线人数
            eachRoomPlayer.push(parseInt(jsonData['game2']));
            eachRoomPlayer.push(parseInt(jsonData['game3']));
            eachRoomPlayer.push(parseInt(jsonData['game4']));
            var chart_total = $('#container1').highcharts(); //总在线人数容器
            var chart_part = $('#container2').highcharts(); //每个房间在线人数容器

            chart_total.series[0].addPoint([time, total], true, false); //给总在线人数曲线图加数据

            for (var seriesIndex = 0, arrayIndex = 0; seriesIndex < chart_part.series.length && arrayIndex < eachRoomPlayer.length; seriesIndex++, arrayIndex++) {
                chart_part.series[seriesIndex].addPoint([time, eachRoomPlayer[arrayIndex]], true, false);
            }
            if (chart_total.series[0].data.length > 1000) { //当数据量超过此值时，删除多余的数据
                chart_total.series[0].removePoint(0);
                for (var seriesIndex = 0; seriesIndex < chart_part.series.length; seriesIndex++){
                    chart_part.series[seriesIndex].removePoint(0);
                }
            }
        }
    });
};
