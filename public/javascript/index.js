$(function () {
    SetUserName(); //设置header中欢迎字段的用户名

    $(window).resize(function(){ 
        console.log("windows size changed, new size is: " + $("#right_part").width());
        changeTabListAndMoreTabListWhenWidowsSizeChanged(); //当右边内容窗口大小改变时，调整打开页面标签的展示
    });    

    $("#headerNav .nav li").click(function () { //header中导航菜单点击后的效果
        $(this).siblings().removeClass("active").end().addClass("active");
        if ($(this).hasClass("nav_home")) {
            chooseTab($(this).find("a").attr("_href"), $(this).find("a").attr("page_title"));
        }
    });

    $("#displayArrow").click(function() { //隐藏左侧菜单按钮点击后的效果
          if($(this).hasClass("open"))
          {
              $(this).removeClass("open");
              $("#right_part").css("left", "0px");
              $("#left_part").css("left", "-200px");
          }else
          {
              $(this).addClass("open");
              $("#right_part").css("left", "200px");
              $("#left_part").css("left", "0");
          }
          console.log("Current size is: " + $("#right_part").width());
          changeTabListAndMoreTabListWhenWidowsSizeChanged();
    });

    $("#right_part .tabbed ul").on('click', '.title', function () { //右侧打开页面tab点击后的效果
        console.log("tablist span click.");
        var show_nav_list = $("#right_part .tabbed ul li"); 
        var index = show_nav_list.index($(this).parent());
        if ( -1 == index ) {
            return;
        }
        console.log("tab " + index + " click");
        show_nav_list.removeClass("active").eq(index).addClass("active");
        var iframe_box = $("#right_part .show_iframe");
        iframe_box.find(".iframe_content").hide().eq(index).show();
    });

    $("#right_part .tabbed ul").on('click', '.close', function () { //右侧打开页面tab上面的关闭按钮点击后的效果
        var tabIndex = $(this).parent().index();
        var show_nav = $("#right_part .tabbed ul li");
        var iframe_box = $("#right_part .show_iframe");
        var isCurrentTabActive = $(this).parent().hasClass("active");
        console.log('tabIndex:' + tabIndex);
        $(this).parent().remove();
        iframe_box.find(".iframe_content").eq(tabIndex).remove();
        if (isCurrentTabActive) {
            show_nav.eq(tabIndex - 1).addClass("active");
            console.log("tab " + (tabIndex - 1) + " has add active class.");
            iframe_box.find(".iframe_content").eq(tabIndex - 1).show();
        }
        moveItemFromMoreTabListIntoTabList();
    });

    $("#right_part .more_tab ul").on('click', '.title', function () { //右侧下拉tab点击后的效果
        console.log("more_tab span click.");
        var show_nav_list = $("#right_part .more_tab ul li");
        var index = show_nav_list.index($(this).parent());
        var tablistsize = $("#right_part .tabbed ul li").size();
        console.log("iframe_box: " + tablistsize + " display.");
        show_nav_list.removeClass("active");
        $(this).parent().addClass("active");
        $("#right_part .show_iframe .iframe_content").hide().eq(tablistsize + index).show();
        $(".arrow_box").removeClass("up");
        $(".arrow_box").addClass("down");
        $(".more_tab").slideUp("1000");
    });

    $("#right_part .more_tab ul").on('click', '.close', function() { //右侧下拉tab上的关闭按钮点击后的效果
        console.log('more_tab close click.');
        var show_nav_list = $("#right_part .more_tab ul li");
        var nav_size = show_nav_list.size();
        var index = show_nav_list.index($(this).parent());
        var tablistsize = $("#right_part .tabbed ul li").size();
        var closeIndex = tablistsize + index;
        console.log("iframe_box: " + closeIndex + " close.");
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
        console.log("arrow_box");
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
});
var spanWidthInit = 60;
var spanWidthChanged = 60;
var eachLiMarginLeft = 30;
var eachSpanMargin = 23;
var marginRight = 50;

function changeTabListAndMoreTabListWhenWidowsSizeChanged() { //当窗口变化时，自动调整tab的位置
    var windowSize = $("#right_part").width();
    var eachWidth = spanWidthInit + eachSpanMargin * 2 + eachLiMarginLeft;
    var maxTabNum = parseInt((windowSize - marginRight) / eachWidth); 
    var curTabNum = $("#right_part .tabbed ul").children().size();
    console.log("windowSize: " + windowSize + ", maxTabNum: " + maxTabNum + ", curTabNum: " + curTabNum);
    if (maxTabNum < curTabNum) {
        //减少时
        for (var index = 0; index < (curTabNum - maxTabNum); ++index) {
            moveItemFromTabListIntoMoreTabList();
            console.log("move once time.");
        }
    } else if (maxTabNum > curTabNum){
        //变大时
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
    console.log("windowSize: " + windowSize + ", eachWidth: " + eachWidth + ", maxTabNum: " + maxTabNum + ", curTabNum: " + curTabNum);
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

function getUrlParam(name){
    //构造一个含有目标参数的正则表达式对象  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    //匹配目标参数  
    var r = window.location.search.substr(1).match(reg);  
    //返回参数值  
    if (r!=null) return unescape(r[2]);  
    return null;  
} 

function leftmenu_click(href, title) { //当左侧菜单点击后发生的事情
    console.log("call parant func successed;");
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
            console.log("find tad in tab list.");
            return false;
        }
    });

    if (!isFound) {
        more_tab_list.each(function () { //在more_tab里遍历
            if ($(this).find('span').attr('page_href') == href) {
                isFound = true;
                bStopIndex = more_tab_list.index($(this)) + tab_list.size();
                console.log("find tad in more tab list.");
                return false;
            }
        });
    };

    if (!isFound) {
        console.log("Ready to create a iframe.");
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
            console.log("Show the arrow_box.");
        }
        console.log("Add item in more_tab.");
        $(".more_tab ul li").removeClass("active");
        $(".more_tab ul").append('<li class="active"><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    } else {
        //add to tab
        console.log("Add item in tab list.");
        show_nav.append('<li class="active"><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    }
    
    //新建iframe_box
    var iframe_box = $("#right_part .show_iframe");
    var iframebox = iframe_box.find(".iframe_content");
    iframebox.hide();
    iframe_box.append('<iframe class="iframe_content" name="iframe_content" src=' + href + ' width="100%" height="100%" frameborder="0" ></iframe>');   
    var showbox = iframebox.find(".iframe_content:visible");
    showbox.find("iframe").load();
}

function SetUserName(){
    var username = getUrlParam('name');
    console.log("username: " + username);
    $("#userInfo .userLoginName").html(username);
}