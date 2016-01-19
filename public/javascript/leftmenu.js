$(function () {
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

    $("aside .accordion .section li").click(function () {
        var href = $(this).find('a').attr('_href');
        var title = $(this).find('a').attr('page_title');
        window.parent.leftmenu_click(href, title);
    });
});
