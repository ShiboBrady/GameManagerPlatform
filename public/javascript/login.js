$(function () {
    //login.html
    $(".login-submit").click(function (e) {
        e.preventDefault();
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
            return false;
        } else {
            var params = $(".loginform").serialize();
            alert("params is: " + params);
            // $.post("/loginconfirm", params, function (data, status) {
            //     console.log(data.tip);
            // }, "json");
             window.location.href = 'index.html?name=' + username;
        }
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login-submit").trigger("click");
        }
    });
})