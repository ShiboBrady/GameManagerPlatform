$(function () {

    $(".nav_box .refresh_button").click(function () {
        console.log("reload");
        window.location.reload();
    });

    // var data = [
    //     [
    //         "1",
    //         "2015-05-01 00:00",
    //         "1000",
    //         "爱贝",
    //     ]
    // ];
    // console.log("Begin to render table.");
    $('#example').DataTable({
        data:[],
        columns: [
                { 'data': 'sequence', 'title': '序号' },
                { 'data': 'date', 'title': '日期' },
                { 'data': 'usernums', 'title': '新增用户数' },
                { 'data': 'channel', 'title': '渠道' },
            ],
        "language": {
            "lengthMenu": "每页 _MENU_ 条记录",
            "zeroRecords": "没有找到记录",
            "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)"
        },
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

});
function search () {
    console.log("search button click.");
    var activetab = $(".chooseDateType .tabs .active").attr("for");
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
    $.ajax({
        type: 'POST',
        url: "/data/channel",
        success: function(data) {
            console.log(data);
            var table = $("#example").DataTable();
            table.clear();
            table.rows.add(data).draw();
        }
    })
}

