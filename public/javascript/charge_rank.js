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
                { 'title': '名次' },
                { 'title': '昵称' },
                { 'title': '玩家ID' },
                { 'title': '注册时间' },
                { 'title': '最后登录时间' },
                { 'title': '联系方式' },
                { 'title': '累计充值' },
                { 'title': '游戏局数' },
                { 'title': '赢取金币数' },
                { 'title': '输掉金币数' },
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

