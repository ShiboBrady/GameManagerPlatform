$(function () {
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
    // $('#container1').highcharts({
    //     chart: {borderColor: '#EBBA95',borderRadius: 20,borderWidth: 2,type: 'line'},
    //     title: {text: 'My first Highcharts chart.'},
    //     xAxis: {categories: ['2016-1-16 10:10:50', '2016-1-16 10:11:00']},
    //     yAxis: {},
    //     series: [{data: [29.9, 71.5]}],
    //     credits: {enabled:false},
    //     // exporting: {enabled:true},
    // });
    // var chart2 = $('#container2').highcharts({
    //     chart: {type: 'spline'},
    //     title: {text: '在线人数统计曲线图'},
    //     xAxis: {categories: ['my', 'first', 'chart']},
    //     yAxis: {title:{text:'在线人数'}},
    //     series: [{name:'Jane', data:[1, 0, 4]}, {name: 'John', data:[5, 7, 3]}],
    //     credits: {enabled:false},
    // });
    $(".nav_box .refresh_button").click(function () {
        console.log("reload");
        window.location.reload();
    });
    var initArray = [];
    for (var i = 0; i < 20; i++) {
        initArray.push(0);
    }
    var arraydata = [29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5];
    var arraydata1 = [55, 66, 29, 56, 37, 24, 89, 35, 21, 18];
    var arraydata2 = [29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5];
    var arraydate = ["2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00"];
    function getdate () {
        var d = new Date();
        var str = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return str;
    };
    function getRandom(n) {
        return Math.floor(Math.random()*n+1)
    };
    var generateData = function () {
        var value = getRandom(100);
        var value1 = getRandom(100);
        var date = getdate();
        if (arraydata.length >= 10) {
            arraydata.splice(0, 1);
            arraydate.splice(0, 1);
        } 
        arraydata.push(value);
        arraydate.push(date);
        // dynamicInfo["dynamicData"] = arraydata;
        // dynamicInfo["dynamicDate"] = arraydate;
        // console.log(value + ' ' + date + ' ' + array.length);
        //chart.series[0].addPoint([date, value], true, true);
        var x = (new Date()).getTime(),
            y = Math.random();
        chart2.series[0].addPoint([x, y + 1], true, true, true);
        chart2.series[1].addPoint([x, y - 1], true, true, true);
        chart2.series[2].addPoint([x, y + 2], true, true, true);
        chart2.series[3].addPoint([x, y - 2], true, true, true);
    };
    
    
    var chart = new Highcharts.Chart({
        chart: {
            style:{ backgroundColor: '#fafafa', borderRadius: '5px'},
            renderTo: 'container1',
            type:'spline',
            marginRight: 10,
            events:{
                load:function () {
                        //setInterval(generateData, 1000);
                    }
            },
        },
        // legend: {
        //     enabled: false
        // },
        // exporting: {
        //     enabled: false
        // },
        title: {text:'在线人数统计曲线图'},
        xAxis: {categories: arraydate, title: {text:'name'}, tickPixelInterval: 150},
        yAxis: {title:{text:'在线人数'}},
        series: [{name:'人', data:arraydata}],
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
            }
        },
    });
    var chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            type: 'spline',
            animation: Highcharts.svg,
            marginRight: 10,
            events: {
                load: function() {
                    setInterval(generateData, 1000);
                }
            }
        },
        title: {
            text: '在线人数统计曲线图'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 50
        },
        yAxis: {title:{text:'在线人数'}},
        tooltip: {
            formatter: function() {
                return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        series: [{name:'斗地主普通场', data:initArray, selected: true,}, {name:'斗地主中级场', data:initArray, selected: true,}, {name:'斗地主高级场', data:initArray, selected: true,}, {name:'斗地主贵宾场', data:initArray, selected: true,}],
        legend: {
            symbolPadding: 20,
            symbolWidth: 0
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
    }); 
    chart.reflow();
    chart2.reflow();

    // var data = [
    //     [
    //         "Tiger Nixon",
    //         "System Architect",
    //         "Edinburgh",
    //         "5421",
    //         "2011/04/25",
    //         "$3,120"
    //     ],
    //     [
    //         "Garrett Winters",
    //         "Director",
    //         "Edinburgh",
    //         "8422",
    //         "2011/07/25",
    //         "$5,300"
    //     ]
    // ];
    // var data = [
    //     {
    //         "name":       "Tiger Nixon",
    //         "position":   "System Architect",
    //         "salary":     "$3,120",
    //         "start_date": "2011/04/25",
    //         "office":     "Edinburgh",
    //         "extn":       "5421"
    //     },
    //     {
    //         "name":       "Garrett Winters",
    //         "position":   "Director",
    //         "salary":     "$5,300",
    //         "start_date": "2011/07/25",
    //         "office":     "Edinburgh",
    //         "extn":       "8422"
    //     }
    // ];
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
        data:data,
        columns: [
                { 'title': '序号' },
                { 'title': '时间点' },
                { 'title': '在线' }
            ],
        paging: false,
        searching: false,
        select: false,
    });

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
    // $(window).resize(function(){
    //     console.log("windows size changed.");
    //     //window.onresize = moveCheckboxBeforeLegend;  
    //     moveCheckboxBeforeLegend(); 
    // });
});

// window.onload=function(){  
//     window.onresize = moveCheckboxBeforeLegend;  
//     moveCheckboxBeforeLegend();  
// }