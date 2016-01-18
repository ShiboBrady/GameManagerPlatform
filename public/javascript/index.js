$(function () {
    //login.html
    $(".login-submit").click(function () {
        var username = $(".username");
        var password = $(".userpwd");
        var msg = "";
        if ($.trim(username.val()) == "") {
            msg = "账号不能为空";
            username.focus();
        } else if ($.trim(password.val()) == "") {
            msg = "密码不能为空";
            password.focus();
        }

        if (msg != "") {
            alert(msg);
        } else {
            var params = $(".loginform").serialize();
            alert("params is: " + params);
            // $.post("/loginconfirm", params, function (data, status) {
            //     console.log(data.tip);
            // }, "json");
        }
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login-submit").trigger("click");
        }
    });

    //index.html
    $("#headerNav .nav li").click(function () {
        $(this).siblings().removeClass("active").end().addClass("active");
    });

    $("#displayArrow").click(function() {
          if($(this).hasClass("open"))
          {
              // $("#left_part").hide();
              $(this).removeClass("open");
              $("#right_part").css("left", "0px");
              $("#left_part").css("left", "-200px");
          }else
          {
              // $("#left_part").show();
              $(this).addClass("open");
              $("#right_part").css("left", "200px");
              $("#left_part").css("left", "0");
          }
    });

    //left_menu_datacount.html
    $("aside #leftmenu_container .pagination li").click(function () {
        $(this).siblings().removeClass("active").end().addClass("active");
        $choosefordisplay = $(this).attr("for");
        $(".accordion").children().addClass("none");
        $(".accordion").children().each(function () {
            if ($(this).hasClass($choosefordisplay)) {
                $(this).removeClass("none");
                return false;
            }
        });
    });

    $("aside .accordion .section input[type='radio']").click(function () {
        $obj = $("aside .accordion .section input[type='radio']");
        console.log("click happened.");
        if ($(this).hasClass("checked")) {
            $(this).removeAttr("checked");
            $(this).removeClass("checked");
        } else {
            $obj.removeClass("checked");
            $(this).addClass("checked");
        }
    });
});