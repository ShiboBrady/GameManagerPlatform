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
            console.log(params);
            $.post("/data/login", params, function (data, status) {
                console.log(data);
                var jsonData = JSON.parse(data);
                errcode = jsonData['errcode'];
                result = jsonData['result'];
                console.log('errcode :' + errcode);
                console.log('result: ' + result);
                if (parseInt(errcode) == 0) {
                    window.location.href = 'index.html?name=' + username.val();                    
                } else {
                    alert(result);
                    password.focus();
                }
            });
        }
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login-submit").trigger("click");
        }
    });
})