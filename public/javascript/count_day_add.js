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
                { 'title': '开局数' },
                { 'title': '新增金币总数' },
                { 'title': '新增金币总数(不包含新用户)' },
                { 'title': '带入金币总数(不包含新用户)' },
                { 'title': '充值新增' },
                { 'title': '救济金数' },
                { 'title': '任务奖励' },
                { 'title': '任务赠送金币' },
                { 'title': '新手礼包' },
                { 'title': '手工发放' },
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

