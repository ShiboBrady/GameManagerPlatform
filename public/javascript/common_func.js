var getRollListInterface = "/user_manager/find_user_group"; //获取全部的角色信息
var addRollInfoInterface = "/user_manager/add_one_group";   //新增一个角色信息
var modifyRollInfoInterface = "/user_manager/update_one_group";  //更新一个角色信息
var deleteRollInfoInterface = "/user_manager/delete_group";  //删除一个角色信息
var getOnlyRollNameListInterface = "/user_manager/find_group_name" //只获取角色名列表
var getSelfRollList = "/user_manager/get_action"; //获取自己的权限列表
var getOtherRollList = "/user_manager/find_group_action";  //获取其他人的权限列表
var getEmptyRollList = "/user_manager/find_menu";  //获取一个空的权限列表

var getUserListInterface = "/user_manager/find_user_list";  //获取全部用户列表
var addUserInfoInterface = "/user_manager/add_new_user";    //新增一个用户
var modifyUserInfoInterface = "/user_manager/update_one_user";  //更新一个用户
var deleteUserInfoInterface = "/user_manager/delete_user";  //删除一个用户

var getPageListInterface = "/user_manager/find_action_menu";  //获取全部页面列表
var addPageInfoInterface = "/user_manager/add_action_menu";    //新增一个页面
var modifyPageInfoInterface = "/user_manager/update_action_menu";  //更新一个页面
var deletePageInfoInterface = "/user_manager/delete_action_menu";  //删除一个页面

var changeOtherUserPasswordInterface = "/user_manager/change_other_password"; //管理员修改其他人密码
var changeSelfPasswordInterface = "/user_manager/change_self_password"; //用户修改自己的密码
var loginInterface = "/data/login"; //登陆接口
var getGameNameInterface = "/data/get_game_name"; //获取游戏场名字接口
var getMatchNameInterface = "/data/get_match_name"; //获取比赛场名字接口

var errormsg = "呜呜，服务器好像出错鸟~~~";

//////////////数据页面/////////////
function GetPageData(url, params, callback) {
    console.log("Get Page Data function called.");
    return SendPostRequestAsyn(url, params, callback);
}

//////////////权限管理/////////////
function GetAllRollListData() {
    console.log("Get All Roll List function called.");
    return SendPostRequest(getRollListInterface);
}

function AddNewRollInfo(params) {
    console.log("Add New Roll function called.");
    return SendPostRequestWithOutDataReturn(addRollInfoInterface, params);
}

function UpdateRollInfo(params) {
    console.log("Update Roll function called.");
    return SendPostRequestWithOutDataReturn(modifyRollInfoInterface, params);
}

function DeleteRoll(params) {
    console.log("Delete Roll function called.");
    return SendPostRequestWithOutDataReturn(deleteRollInfoInterface, params);
}

function GetRollNameInfo() {
    console.log("Get Roll Name List function called.");
    return SendPostRequest(getOnlyRollNameListInterface);
}

function GetSelfRollListData() {
    console.log("Get Self Roll List function called.");
    return SendPostRequest(getSelfRollList);
}

function GetOtherRollListData(params) {
    console.log("Get Other Roll List function called.");
    return SendPostRequest(getOtherRollList, params);
}

function GetEmptyRollListData() {
    console.log("Get Empty Roll List function called.");
    return SendPostRequest(getEmptyRollList);
}
//////////////用户管理/////////////
function GetAllUserListData () {
    console.log("Get All User List function called.");
    return SendPostRequest(getUserListInterface);
}

function AddNewUserInfo(param) {
    console.log("Add New User function called.");
    param['password'] = $.md5(param['password']);
    var params = transDictToSerializeString(param);
    return SendPostRequestWithOutDataReturn(addUserInfoInterface, params);
}

function UpdateUserInfo(params) {
    console.log("Update User function called.");
    return SendPostRequestWithOutDataReturn(modifyUserInfoInterface, params);
}

function DeleteUser(params) {
    console.log("Delete User function called.");
    return SendPostRequestWithOutDataReturn(deleteUserInfoInterface, params);
}
//////////////页面管理/////////////
function GetAllPageListData () {
    console.log("Get All Page List function called.");
    return SendPostRequest(getPageListInterface);
}

function AddNewPageInfo(params) {
    console.log("Add New Page function called.");
    return SendPostRequestWithOutDataReturn(addPageInfoInterface, params);
}

function UpdatePageInfo(params) {
    console.log("Update Page function called.");
    return SendPostRequestWithOutDataReturn(modifyPageInfoInterface, params);
}

function DeletePage(params) {
    console.log("Delete Page function called.");
    return SendPostRequestWithOutDataReturn(deletePageInfoInterface, params);
}

function ChangeOtherUserPassword(param) {
    console.log("Change Other User Password function called.");
    param['otherPassword'] = $.md5(param['otherPassword']);
    var params = transDictToSerializeString(param);
    return SendPostRequestWithOutDataReturn(changeOtherUserPasswordInterface, params);
}

function ChangeSelfPassword(param) {
    console.log("Change self password function called.");
    param['password'] = $.md5(param['password']);
    param['newPassword'] = $.md5(param['newPassword']);
    var params = transDictToSerializeString(param);
    return SendPostRequestWithOutDataReturn(changeSelfPasswordInterface, params);
}

function Login(param) {
    console.log("User Login function called.");
    param['password'] = $.md5(param['password']);
    var params = transDictToSerializeString(param);
    return SendPostRequestWithOutDataReturn(loginInterface, params);
}

function GetGameNameData() {
    console.log("User Login function called.");
    return SendPostRequest(getGameNameInterface);
}

function GetMatchNameData () {
    console.log("User Login function called.");
    return SendPostRequest(getMatchNameInterface);
}

function transDictToSerializeString (data) {
    var params = "";
    for (var item in data) {
        console.log(item);
        params = params + item + '=' + encodeURIComponent(data[item]) + '&';
    }
    params = params.substring(0, params.length - 1); //去掉最后一个&
    return params;
}

function SendPostRequestAsyn(url, postData, successCallback){
    var ii = layer.load();
    console.log("Send once post requrest.");
    var postResult = $.post(url, postData);
    var result;
    postResult.done(function(data) {
        layer.close(ii);
        console.log("Get Post result.");
        var rtnData = JSON.parse(data);
        var errcode = rtnData.errcode;
        var message = rtnData.message;
        console.log(rtnData.errcode);
        console.log(rtnData.message);
        if (0 != errcode) {
            if (4 == errcode) {
                console.log("login timeout.");
                WarnMsg("登陆已超时");
                top.location.href = "/";
            } else {
                if (typeof GetMsgError === "function") {
                    GetMsgError(errcode, message, url);
                    return;
                }
                ErrorMsg("获取数据失败，请联系管理员.");
            }
        } else {
            result = rtnData.result;
            successCallback(result);
        }
    })
    .fail(function(data) {
        console.log('fail:', data.status);
        ErrorMsg(errormsg);
        result = null;
    });
    return result;
}

function SendPostRequest(url, postData){
    $.ajaxSetup({  
        async : false,
    });
    var ii = layer.load();
    console.log("Send once post requrest.");
    var postResult = $.post(url, postData);
    var result;
    postResult.done(function(data) {
        layer.close(ii);
        console.log("Get Post result.");
        // console.log(data);
        var rtnData = JSON.parse(data);
        // console.log(rtnData);
        var errcode = rtnData.errcode;
        var message = rtnData.message;
        console.log(rtnData.errcode);
        console.log(rtnData.message);
        if (0 != errcode) {
            if (4 == errcode) {
                console.log("login timeout.");
                WarnMsg("登陆已超时");
                top.location.href = "/";
            } else {
                if (typeof GetMsgError === "function") {
                    GetMsgError(errcode, message, url);
                    return;
                }
                ErrorMsg("获取数据失败，请联系管理员.");
            }
            result = null;
        } else {
            result = rtnData.result;
        }
    })
    .fail(function(data) {
        console.log('fail:', data.status);
        ErrorMsg(errormsg);
        result = null;
    });
    return result;
}

function SendPostRequestWithOutDataReturn(url, postData){
    $.ajaxSetup({  
        async : false,
    });
    var postResult = $.post(url, postData);
    var result;
    postResult.done(function(data) {
        // console.log(data);
        var rtnData = JSON.parse(data);
        // console.log(rtnData);
        var errcode = rtnData.errcode;
        var message = rtnData.message;
        console.log(rtnData.errcode);
        console.log(rtnData.message);
        result = errcode;
        if (0 != errcode) {
            if (4 == errcode) {
                console.log("login timeout.");
                WarnMsg("登陆已超时");
                top.location.href = "/";
            } else {
                if (typeof OperationError === "function") {
                    OperationError(errcode, message);
                    return;
                }
                ErrorMsg("操作失败，请联系管理员.");
            }
        }
    })
    .fail(function(data) {
        console.log('fail:', data.status);
        ErrorMsg(errormsg);
        result = -1;
    });
    return result;
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

// function getStringFromSerializeString(serializeString, paramName) {
//     var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i');
//     var r = serializeString.match(reg);
//     if (r != null) {
//         return r[2];
//     }
//     return r;
// }

function HandleJsonData(data) {
    if (0 == data.length) {
        return;
    }
    for (var index in data) {
        var obj = data[index];
        if (obj._checked == undefined) {
            obj._checked = false;
        }
        obj.checked = obj._checked;
        console.log(obj.text);
        var childObj = obj.children;
        HandleJsonData(childObj);
    }
}

function FormatJsonData(data) {
    if (0 == data.length) {
        return;
    }
    for (var index in data) {
        var obj = data[index];
        if (obj._checked != undefined) {
            delete obj._checked;
        }

        if (obj.state != undefined) {
            delete obj.state;
        }

        if (obj.domId != undefined) {
            delete obj.domId;
        }

        if (obj.target != undefined) {
            delete obj.target;
        }
        
        var childObj = obj.children;
        FormatJsonData(childObj);
    }
}

function SuccessMsg(msg) {
    layer.msg(msg, {icon: 6});
}

function ErrorMsg(errormsg) {
    layer.msg(errormsg, {icon: 5});
}

function WarnMsg(errormsg) {
    layer.msg(errormsg);
}

function CloseThisWindow() {
    var index = parent.layer.getFrameIndex(window.name); //关闭本窗口
    parent.layer.close(index);
}

var cloneObj = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
