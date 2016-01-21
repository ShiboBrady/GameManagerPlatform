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
                { 'title': '渠道' },
                { 'title': '新进游戏用户数' },
                { 'title': '新增游戏用户数' },
                { 'title': 'dau' },
                { 'title': '充值人数' },
                { 'title': '重置次数' },
                { 'title': '充值总金额' },
                { 'title': 'arpu' },
                { 'title': 'arppu' },
                { 'title': '次日留存' },
                { 'title': '三日留存' },
                { 'title': '七日留存' },
                { 'title': '15日留存' },
                { 'title': '30日留存' },
                { 'title': '付费率' },
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
});

