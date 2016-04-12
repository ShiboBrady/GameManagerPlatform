$(function () {
    var cookieUser = "IDPUsername";
    var cookiePawd = "IDPPassword";
    
    $(".login-submit").click(function (e) {
        e.preventDefault();
        var username = $(".username");
        var password = $(".userpwd");
        var msg = "";
        if ($.trim(username.val()) == "") {
            msg = "账号不能为空";
            $( ".username" ).effect( "shake" );
            $("span.username-errormsg").html(msg);
            return false;
        } else if ($.trim(password.val()) == "") {
            msg = "密码不能为空";
            $( ".userpwd" ).effect( "shake" );
            $("span.userpwd-errormsg").html(msg);
            return false;
        }
        var params = {};
        params['username'] = username.val();
        params['password'] = password.val();
        var ret = Login(params);
        if (0 == ret) {
            console.log("Login successed.");
            window.location.href = 'index.html';
            //$.cookie(cookieUser, username.val(), {expires: 7, path: '/'});
            //$.cookie(cookiePawd, password.val(), {expires: 7, path: '/'});
        }
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

function OperationError(errcode, message) {
    if (2 == errcode) {
        $("span.userpwd-errormsg").html(message);
        $( ".userpwd" ).effect( "shake" );
    } else {
        ErrorMsg("操作失败，请联系管理员.");
    }
}