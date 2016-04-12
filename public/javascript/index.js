var JsonMenuTree;
var LeftMenuDict = {};
$(function () {
    $('#userInfo .useraction').hover(function() {
        $(this).find('.useractioncontent').slideDown(200);
    }, function() {
        $(this).find('.useractioncontent').slideUp(100);
    });
    $('.userChangePwd').click(function(){
        var username = $("#userInfo .userLoginName").html();
        layer.open({
            type: 2,
            area: ['400px', '200px'],
            maxmin: false,
            shadeClose: true, //点击遮罩关闭
            content: 'user_change_password.html',
        })
    })

    console.log(document.referrer);
    GeneralHeaderNav();
    // console.log("jsondata : " + JsonMenuTree);
    // var cookieUser = "IDPUsername";
    // var cookiePawd = "IDPPassword";
    // validCookie(cookieUser, cookiePawd);
    var cookieUser = "username";
    SetUserName(cookieUser); //设置header中欢迎字段的用户名

    $(window).resize(function(){
        // console.log("windows size changed, new size is: " + $("#right_part").width());
        changeTabListAndMoreTabListWhenWidowsSizeChanged(); //当右边内容窗口大小改变时，调整打开页面标签的展示
    });

    $("#headerNav .nav").on('click', 'li', (function () { //header中导航菜单点击后的效果
        $(this).siblings().removeClass("active").end().addClass("active");
        if ($(this).hasClass("nav_home")) {
            chooseTab($(this).find("a").attr("_href"), $(this).find("a").attr("page_title"));
        } else {
            var href = $(this).find("a").attr("_href");
            // console.log("href: " + href);
            chooseHeaderTab(href);
        }
    }));

    $("#displayArrow").click(function() { //隐藏左侧菜单按钮点击后的效果
          if($(this).hasClass("open")) {
              $(this).removeClass("open");
              $("#right_part").css("left", "0px");
              $("#left_part").css("left", "-200px");
          } else {
              $(this).addClass("open");
              $("#right_part").css("left", "200px");
              $("#left_part").css("left", "0");
          }
          changeTabListAndMoreTabListWhenWidowsSizeChanged();
    });

    $("#right_part .tabbed ul").on('click', '.title', function () { //右侧打开页面tab点击后的效果
        var show_nav_list = $("#right_part .tabbed ul li"); 
        var index = show_nav_list.index($(this).parent());
        if ( -1 == index ) {
            return;
        }
        show_nav_list.removeClass("active").eq(index).addClass("active");
        var iframe_box = $("#right_part .show_iframe");
        iframe_box.find(".iframe_content").hide().eq(index).show();
    });

    $("#right_part .tabbed ul").on('click', '.close', function () { //右侧打开页面tab上面的关闭按钮点击后的效果
        var tabIndex = $(this).parent().index();
        var show_nav = $("#right_part .tabbed ul li");
        var iframe_box = $("#right_part .show_iframe");
        var isCurrentTabActive = $(this).parent().hasClass("active");
        $(this).parent().remove();
        iframe_box.find(".iframe_content").eq(tabIndex).remove();
        if (isCurrentTabActive) {
            show_nav.eq(tabIndex - 1).addClass("active");
            iframe_box.find(".iframe_content").eq(tabIndex - 1).show();
        }

        moveItemFromMoreTabListIntoTabList();
    });

    $("#right_part .more_tab ul").on('click', '.title', function () { //右侧下拉tab点击后的效果
        var show_nav_list = $("#right_part .more_tab ul li");
        var index = show_nav_list.index($(this).parent());
        var tablistsize = $("#right_part .tabbed ul li").size();
        show_nav_list.removeClass("active");
        $(this).parent().addClass("active");
        $("#right_part .show_iframe .iframe_content").hide().eq(tablistsize + index).show();
        $(".arrow_box").removeClass("up");
        $(".arrow_box").addClass("down");
        $(".more_tab").slideUp("1000");
    });

    $("#right_part .more_tab ul").on('click', '.close', function() { //右侧下拉tab上的关闭按钮点击后的效果
        var show_nav_list = $("#right_part .more_tab ul li");
        var nav_size = show_nav_list.size();
        var index = show_nav_list.index($(this).parent());
        var tablistsize = $("#right_part .tabbed ul li").size();
        var closeIndex = tablistsize + index;
        if ($(this).parent().hasClass("active")) {
            $("#right_part .tabbed ul li:last-child").addClass("active");
            $("#right_part .show_iframe .iframe_content").eq(tablistsize - 1).show();
        } 
        $("#right_part .show_iframe .iframe_content").eq(closeIndex).remove();
        $(this).parent().remove();

        if (nav_size == 1) {
            $(".arrow_box").removeClass("down up");
            $(".more_tab").hide();
        }
    });
    
    $(".arrow_box").click(function () { //更多菜单箭头
        if ($(this).hasClass("down")) {
            $(".arrow_box").removeClass("down");
            $(".arrow_box").addClass("up");
            $(".more_tab").slideDown("1000");
        } else if ($(this).hasClass("up")) {
            $(".arrow_box").removeClass("up");
            $(".arrow_box").addClass("down");
            $(".more_tab").slideUp("1000");
        }
    });

    SimulateHeaderNavClickEvent();
});
var spanWidthInit = 60;
var spanWidthChanged = 60;
var eachLiMarginLeft = 30;
var eachSpanMargin = 23;
var marginRight = 50;

function CalcLevel(data) {
    if (data.length == 0) {
        return 0;
    }
    var children = data[0].children;
    return CalcLevel(children) + 1;
}

function changeTabListAndMoreTabListWhenWidowsSizeChanged() { //当窗口变化时，自动调整tab的位置
    var windowSize = $("#right_part").width();
    var eachWidth = spanWidthInit + eachSpanMargin * 2 + eachLiMarginLeft;
    var maxTabNum = parseInt((windowSize - marginRight) / eachWidth); 
    var curTabNum = $("#right_part .tabbed ul").children().size();
    if (maxTabNum < curTabNum) {//减少时
        for (var index = 0; index < (curTabNum - maxTabNum); ++index) {
            moveItemFromTabListIntoMoreTabList();
            console.log("move once time.");
        }
    } else if (maxTabNum > curTabNum){//变大时
        for (var index = 0; index < (maxTabNum - curTabNum); ++index) {
            moveItemFromMoreTabListIntoTabList();
            console.log("move once time.");
        }
    }
}

function moveItemFromMoreTabListIntoTabList () {  //把tab从下拉tab移动到非下拉tab列表中（窗口变大）
    if (!($(".arrow_box").hasClass("down") || $(".arrow_box").hasClass("up"))) {
        return;
    }
    var tabList = $("#right_part .tabbed ul");
    var moreTabList = $(".more_tab ul li");
    var moreTabListFirstChild = moreTabList.eq(0);
    href = moreTabListFirstChild.find('span').attr('page_href');
    titleName = moreTabListFirstChild.find('span').text();
    if (href == "home.html") {
        tabList.append('<li><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    } else {
        tabList.append('<li><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    }
    moreTabListFirstChild.remove();
    if ($(".more_tab ul li").size() == 0) {
        $(".arrow_box").removeClass("down up");
        $(".more_tab").hide();
    }
}

function moveItemFromTabListIntoMoreTabList () {  //把tab从非下拉tab移动到下拉tab列表中（窗口变小）
    if (!($(".arrow_box").hasClass("down") || $(".arrow_box").hasClass("up"))) {
        $(".arrow_box").addClass("down");
    }
    var tabList = $("#right_part .tabbed ul li");
    var moreTabList = $(".more_tab ul li");
    var tabListLastChild = tabList.eq(tabList.size() - 1);
    href = tabListLastChild.find('span').attr('page_href');
    titleName = tabListLastChild.find('span').text();
    if (moreTabList.size() == 0) {
        $(".more_tab ul").append('<li><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    } else {
        var moreTabListFirstChild = $(".more_tab ul li:first-child");
        moreTabListFirstChild.before('<li><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    }    
    tabListLastChild.remove();
    
}

function isNeedShowMoreTabWhenAddTab () { //当打开了一个新的页面时，判断是否需要放入到下拉tab列表中
    var windowSize = $("#right_part").width();
    var eachWidth = spanWidthInit + eachSpanMargin * 2 + eachLiMarginLeft;
    var maxTabNum = parseInt((windowSize - marginRight) / eachWidth); 
    var curTabNum = $("#right_part .tabbed ul").children().size();
    if (maxTabNum >= curTabNum + 1) {
        return false;
    } else {
        return true;
    }
}

function isNeedHideMoreTabWhenCloseTab () { //当关闭了一个tab时，判断是否需要
    var moreTabListNum = $(".more_tab ul").children().size();
    if (moreTabListNum > 0) {
        return false;
    } else {
        return true;
    }
}

function chooseHeaderTab(href) {
    var iframe_box = $("#left_part .ifame_leftmenu");
    var isFound = false;
    iframe_box.each(function(){
        var src = $(this).attr("src");
        if (src == href) {
            iframe_box.hide();
            $(this).show();
            isFound = true;
            return;
        }
    })
    if (!isFound) {
        iframe_box.hide();
        var iframebox = $('#left_part .show_iframe');
        var iCurrentBoxNum = iframebox.find(".ifame_leftmenu").size();
        var iframeId = "iframe-leftmenu-" + (iCurrentBoxNum + 1);
        iframebox.append('<iframe class="ifame_leftmenu" id=' + iframeId + ' name=' + iframeId + ' src=' + href + ' width="100%" height="100%" frameborder="0" ></iframe>');   
    }
}

function leftmenu_click(href, title) { //当左侧菜单点击后发生的事情
    chooseTab(href, title);
}

function chooseTab (href, title) { //选择要显示一个已有的tab或者新建一个tab
    var tab_list = $("#right_part .tabbed ul li"); //所有的tab里的标签；
    var more_tab_list = $("#right_part .more_tab ul li"); //所有的more_tab里的标签；
    var isFound = false; //查找结果
    var bStopIndex = 0; //所在位置
    tab_list.each(function () { //在tab里遍历
        if ($(this).find('span').attr("page_href") == href) {
            isFound = true;
            bStopIndex = tab_list.index($(this));
            return false;
        }
    });

    if (!isFound) {
        more_tab_list.each(function () { //在more_tab里遍历
            if ($(this).find('span').attr('page_href') == href) {
                isFound = true;
                bStopIndex = more_tab_list.index($(this)) + tab_list.size();
                return false;
            }
        });
    };

    if (!isFound) {
        createIframe(href, title);
    } else {
        tab_list.removeClass("active");
        if (tab_list.size() >= (bStopIndex + 1)) {
            tab_list.eq(bStopIndex).addClass("active");
        }
        var iframe_box = $("#right_part .show_iframe");
        iframe_box.find(".iframe_content").hide().eq(bStopIndex).show().find("iframe").attr("src", href);
    };
}

function createIframe (href, titleName) {  //新建一个tab，并加载对应的页面
    var show_nav = $("#right_part .tabbed ul");
    show_nav.find('li').removeClass("active");
    if ($(".arrow_box").hasClass("down") || $(".arrow_box").hasClass("up") || isNeedShowMoreTabWhenAddTab()) {
        if (!($(".arrow_box").hasClass("down") || $(".arrow_box").hasClass("up"))) {
            $(".arrow_box").addClass("down");
        }
        $(".more_tab ul li").removeClass("active");
        $(".more_tab ul").append('<li class="active"><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    } else {
        //add to tab
        show_nav.append('<li class="active"><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    }
    
    //新建iframe_box
    var iframe_box = $("#right_part .show_iframe");
    var iframebox = iframe_box.find(".iframe_content");
    iframebox.hide();
    iframe_box.append('<iframe class="iframe_content" name="iframe_content" src=' + href + ' width="100%" height="100%" frameborder="0" ></iframe>');   
    // var showbox = iframebox.find(".iframe_content:visible");
    // showbox.find("iframe").load();
    // showbox.load();
}

function SetUserName(cookieUser){
    var username = $.cookie(cookieUser);
    console.log("username: " + username);
    $("#userInfo .userLoginName").html(username);
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1; 
            c_end = document.cookie.indexOf(";" ,c_start);
            if (c_end == -1) { 
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return null;
}

function setCookie(c_name, value, expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString());
}

function checkCookie() {
    username = getCookie('username');
    if (username != null && username != "") {
        alert('Welcome again '+username+'!');
    } else {
        username=prompt('Please enter your name:',"");
        if (username!=null && username!="") {
            setCookie('username', username ,365);
        }
    }
}

function userVerify(username, password, callback) {
    var postResult = $.post("/data/login", "username=" + username + "&password=" + password);
    postResult.done(function(data) {
            var jsonData = JSON.parse(data);
            errcode = jsonData['errcode'];
            result = jsonData['result'];
            console.log('errcode :' + errcode);
            console.log('result: ' + result);
            if (parseInt(errcode) == 0) {
                return callback(true);
            } else {
                return callback(false);
            }
        })
        .fail(function(data) {
            console.log('fail:', data.status);
            return callback(false);
        });
}

function validCookie(cookieUser, cookiePass) {
    var user = $.cookie(cookieUser);
    var pwd = $.cookie(cookiePass);
    if (pwd == "" || pwd == undefined || pwd == null || user == "" || user == undefined || user == null) {
        $.cookie(cookieUser, null);
        $.cookie(cookiePass, null);
        console.log("Need login.");
        window.location.href = "/";
        return false;
    }
    userVerify(user, pwd, function (err) {
        if (true == err) {
            return true;
        } else {
            $.cookie(cookieUser, null);
            $.cookie(cookiePass, null);
            console.log("Need login.");
            window.location.href = "/";
            return false;
        }
    });
}

function PretreatmentJsonMenuData (data) {
    if (data.length == 0) {
        return;
    }
    for (var index in data) {
        var checked = data[index].checked;
        if (false == checked) {
            data.splice(index, 1);
            index -= 1;
        } else {
            PretreatmentJsonMenuData(data[index].children);
        }
    }
}

function TraverseAuthorityPath(data) {
    var headerNav = $("#headerNav .nav");
    for (var index in data) {
        var id = data[index].id;
        var url = data[index].url;
        var text = data[index].text;
        if (data[index].children.length == 0) {
            continue;
        }
        if (data[index]) {
            headerNav.append("<li><a _href=" + url + " target=ifame_leftmenu>" + text + "</a></li>");
        }
    }
}

function GeneralHeaderNav() {
    JsonMenuTree = GetSelfRollListData();
    if (JsonMenuTree == null) {
        console.log("Get menu info error.");
        return false;
    }
    PretreatmentJsonMenuData(JsonMenuTree);
    TraverseAuthorityPath(JsonMenuTree);
    return true;
}

function GetLeftMenuList(activeTabUrl) {
    console.log("activeTabUrl: " + activeTabUrl);
    if (JsonMenuTree == null) {
        console.log("Menu list is empty.");
        return null;
    }
    for (var index in JsonMenuTree) {
        var item = JsonMenuTree[index];
        if (item == null) {
            continue;
        }
        var url = item.url;
        if (url == activeTabUrl) {
            return item.children;
        }
    }
    return null;
}

function GetNavList(pageUrl) {
    console.log("Load page url: " + pageUrl);
    if (JsonMenuTree == null) {
        console.log("Menu list is empty.");
        return null;
    }
    var retData = [];
    if (TransverJsonTreeToGetNavList(JsonMenuTree, pageUrl, retData)) {
        return retData;
    }
    return null;
}

function TransverJsonTreeToGetNavList(jsonData, url, retData) {
    if (jsonData.length == 0 ) {
        return false;
    }
    for (var index in jsonData) {
        var item = jsonData[index];
        var text = item.text;
        var urlInJson = item.url;
        var children = item.children;
        if (urlInJson == url) {
            var text = item.text;
            retData.push(text);
            return true;
        } else {
            if (TransverJsonTreeToGetNavList(children, url, retData)) {
                retData.push(text);
                return true;
            }
        }
    }
    return false;
}

function SimulateHeaderNavClickEvent () {
    $('#headerNav .nav li').each(function(){
        if ($(this).hasClass("nav_home")) {
            return;
        }
        $(this).trigger('click');
    })
    $('#headerNav .nav li.nav_home').next().trigger('click');
}