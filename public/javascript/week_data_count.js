$(function () {

    $(".nav_box .refresh_button").click(function () {
        console.log("reload");
        window.location.reload();
    });

    var data = [
        // [
        //     "1",
        //     "2015-05-01 00:00",
        //     "1000",
        //     "爱贝",
        // ],
        // [
        //     "2",
        //     "2015-05-01 00:02",
        //     "1000",
        //     "豌豆荚",
        // ],
        // [
        //     "3",
        //     "2015-05-01 00:04",
        //     "1000",
        //     "支付宝",
        // ],
    ];
    console.log("Begin to render table.");
    $('#search_result_table').DataTable({
        data:data,
        columns: [
                { 'title': '序号' },
                { 'title': '日期' },
                { 'title': '登陆用户数' },
                { 'title': '充值用户数' },
                { 'title': '首次充值用户数' },
                { 'title': '周充值金额数' },
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
    var arraydata = [29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5, 29.9, 71.5];
    var arraydate = ["2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00", "2016-1-16 10:10:50", "2016-1-16 10:11:00"];
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
        title: {text:'统计曲线图'},
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
    chart.reflow();
});

