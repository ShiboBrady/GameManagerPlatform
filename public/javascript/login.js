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
}