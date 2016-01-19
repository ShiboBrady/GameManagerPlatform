$(function () {
    var username = getUrlParam('name');
    console.log("username: " + username);
    $("#userInfo .userLoginName").html(username);

    $("#headerNav .nav li").click(function () {
        $(this).siblings().removeClass("active").end().addClass("active");
        if ($(this).hasClass("nav_home")) {
            chooseTab($(this).find("a").attr("_href"), $(this).find("a").attr("page_title"));
        }
    });

    $("#displayArrow").click(function() {
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
    });

    $("#right_part .tabbed ul").on('click', 'li', function () {
        console.log("li click.");
        var show_nav_list = $("#right_part .tabbed ul li"); 
        var index = show_nav_list.index($(this));
        if ( -1 == index ) {
            return;
        }               
        console.log("tab " + index + " click");
        show_nav_list.removeClass("active");
        $(this).addClass("active");
        var iframe_box = $("#right_part .show_iframe");
        iframe_box.find(".iframe_content").hide().eq(index).show();
    });

    $("#right_part .tabbed ul").on('click', '.close', function () {
        var tabIndex = $(this).parent().index();
        var show_nav = $("#right_part .tabbed ul li");
        var iframe_box = $("#right_part .show_iframe");

        console.log('tabIndex:' + tabIndex);
        $(this).parent().remove();
        if (tabIndex > 0) {
            iframe_box.find(".iframe_content").eq(tabIndex).remove();
            show_nav.eq(tabIndex - 1).addClass("active");
            console.log("tab " + (tabIndex - 1) + " has add active class.");
            iframe_box.find(".iframe_content").eq(tabIndex - 1).show();
        } else if (tabIndex == 0 && show_nav.size() > 0) {
            console.log("Impossible execute this.");
            iframe_box.find(".iframe_content").eq(0).remove();
            show_nav.eq(0).addClass("active");
            iframe_box.find(".iframe_content").eq(0).show();
        } else {
            console.log("Impossible execute this.");
            var lastIframe = iframe_box.find(".iframe_content").eq(0);
            lastIframe.removeAttr("src");
            lastIframe.load();
        }
    });
});

function getUrlParam(name){
    //构造一个含有目标参数的正则表达式对象  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    //匹配目标参数  
    var r = window.location.search.substr(1).match(reg);  
    //返回参数值  
    if (r!=null) return unescape(r[2]);  
    return null;  
} 

function leftmenu_click(href, title) {
    console.log("call parant func successed;");
    chooseTab(href, title);
}

function chooseTab (href, title) {
    var show_nav_list = $("#right_part .tabbed ul li");
    var bStop = false;
    var bStopIndex = 0;
    show_nav_list.each(function () {
        if ($(this).find('span').attr("page_href") == href) {
            bStop = true;
            bStopIndex = show_nav_list.index($(this));
            console.log("bStopIndex: " + bStopIndex);
            return false;
        }
    });
    if (!bStop) {
        createIframe(href, title);
    }
    else {
        show_nav_list.removeClass("active").eq(bStopIndex).addClass("active");
        var iframe_box = $("#right_part .show_iframe");
        iframe_box.find(".iframe_content").hide().eq(bStopIndex).show().find("iframe").attr("src", href);
    }
}

function createIframe (href, titleName) {
    var show_nav = $("#right_part .tabbed ul");
    var iframe_box = $("#right_part .show_iframe");
    var iframebox = iframe_box.find(".iframe_content");
    console.log(show_nav.children().size());
    if (0 == show_nav.children().size()) {
        //
        iframebox.attr("src", href);
    } else {
        show_nav.find('li').removeClass("active");
        iframebox.hide();
        iframe_box.append('<iframe class="iframe_content" name="iframe_content" src=' + href + ' width="100%" height="100%"></iframe>');
    }
    show_nav.append('<li class="active"><span class="title" page_href="' + href + '">' + titleName + '</span><span class="close"><span></li>');
    var showbox = iframebox.find(".iframe_content:visible");
    showbox.find("iframe").load();
}
