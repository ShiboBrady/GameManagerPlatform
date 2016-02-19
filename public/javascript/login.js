$(function () {
    //login.html
    $(".login-submit").click(function (e) {
        //e.preventDefault();
        var username = $(".username");
        var password = $(".userpwd");
        var msg = "";
        if ($.trim(username.val()) == "") {
            msg = "账号不能为空";
            // username.focus();
            $( ".username" ).effect( "shake" );
            $("span.username-errormsg").html(msg);
            return false;
        } else if ($.trim(password.val()) == "") {
            msg = "密码不能为空";
            $( ".userpwd" ).effect( "shake" );
            $("span.userpwd-errormsg").html(msg);
            return false;
        }
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
                //password.focus();
                $("span.username-errormsg").html(result);
            }
        });
    });

    $(".username").focus(function(){
        $("span.username-errormsg").html("");
    });

    $(".userpwd").focus(function(){
        $("span.userpwd-errormsg").html("");
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $(".login-submit").trigger("click");
        }
    });
})