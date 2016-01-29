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
            downloadJPEG: "下载jpeg格式图片",
            downloadPDF: "下载pdf文件",
            downloadPNG: "下载png格式图片",
        }
    });    
    
    var chart = new Highcharts.StockChart({
        chart: {
            renderTo: 'container1',
            type:'spline',
            marginRight: 50,
        },
        title: {
            text: '实时充值曲线图'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'time',
            },
        },
        yAxis: {
            title: {
                text: '充值人数'
            }
        },
        series: [
            {
                name: '金额',
            },
        ],
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                }
            }
        }
    });
    
    chart.reflow();
    setInterval(generateData, 1000);

    var data = [
        [
            "1",
            "2015-05-01 00:00",
            "10",
            "50",
        ],
        [
            "2",
            "2015-05-01 00:02",
            "20",
            "100",
        ],
        [
            "3",
            "2015-05-01 00:04",
            "30",
            "150",
        ],
    ];
    console.log("Begin to render table.");
    $('#example').DataTable({
        "data":data,
        "columns": [
                { 'title': '序号' },
                { 'title': '时间点' },
                { 'title': '充值人数' },
                { 'title': '充值金额' },
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
    $('#example').colResizable();

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
    console.log("Send once request.");
    $.ajax({
        type:"POST",
        url: "/data/realtime_charge",
        async: false,
        error: function() {
            console.log("Get charge info error.");
        },
        success: function (data) {
            console.log(data);
            var jsonData = JSON.parse(data);
            var time = parseInt(jsonData['time']);
            var chargeAmount = parseInt(jsonData['money']);
            var chart_money = $('#container1').highcharts();
            chart_money.series[0].addPoint([time, chargeAmount], true, false);
            if (chart_money.series[0].data.length > 1000) {
                chart_money.series[0].removePoint(0);
            }
        }
    });
};