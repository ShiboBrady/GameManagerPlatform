$(function () {
    $("aside #leftmenu_container .pagination li").on('click', (function () {
        $(this).siblings().removeClass("active").end().addClass("active");
        $choosefordisplay = $(this).attr("for");
        $(".accordion").children().addClass("none");
        $(".accordion").children().each(function () {
            if ($(this).hasClass($choosefordisplay)) {
                $(this).removeClass("none");
                return false;
            }
        });
    }));

    $("aside").on('click', '.accordion-third > .accordion-twice > input[type="radio"]', (function () { //第一级菜单
        $obj = $("aside .accordion-third .accordion-twice > input[type='radio']");
        console.log("click happened.");
        if ($(this).hasClass("checked")) {
            $(this).removeAttr("checked");
            $(this).removeClass("checked");
        } else {
            $obj.removeClass("checked");
            $(this).addClass("checked");
        }
    }));

    $("aside").on('click', '.accordion-twice > .section > input[type="radio"]', (function () { //第二级菜单
        $obj = $("aside .accordion-twice > .section > input[type='radio']");
        if ($(this).hasClass("checked")) {
            $(this).removeAttr("checked");
            $(this).removeClass("checked");
        } else {
            $obj.removeClass("checked");
            $(this).addClass("checked");
        }
    }));

    $("aside").on('click', '.accordion-twice > .section li', (function () { //第三级菜单
        var href = $(this).find('a').attr('_href');
        var title = $(this).find('a').attr('page_title');
        window.parent.leftmenu_click(href, title);
    }));
});

function TraverseAuthorityPathForTwoLevel(data) {
    // var JsonData = JSON.parse(data);
    console.log("TraverseAuthorityPath call.");
    var jsonData = data;
    $("aside").append('<div class="accordion-twice"></div>');
    var accordion = $("aside .accordion-twice");
    for (var index in jsonData) {
        var id = jsonData[index].id;
        var text = jsonData[index].text;
        var children = jsonData[index].children;
        var selectionId = 'selection-' + index;
        accordion.append('<div class="section" id=' + selectionId + '></div>');
        var accordion_child = accordion.find('#'+selectionId);
        var radioName = "section-radio";
        var radioId = "section-" + index;
        accordion_child.append('<input name=' + radioName + ' id=' + radioId + ' type="radio">');
        accordion_child.append('<label for=' + radioId + '><span>' + text + '</span></label>');
        accordion_child.append('<div class="content"></div>');
        var accordion_child_content = accordion_child.find(".content");
        accordion_child_content.append('<ul></ul>');
        var accordion_child_content_ul = accordion_child_content.find('ul');
        for (var childIndex in children) {
            var text = children[childIndex].text;
            var url = children[childIndex].url;
            accordion_child_content_ul.append('<li><a _href=' + url + ' page_title=' + text + ' href="javascript:void(0);" target="iframe_content">' + text + '</a></li>');
        }
    }
}

function TraverseAuthorityPathForThreeLevel(data) {
    console.log("TraverseAuthorityPathForThreeLevel call.");
    $("aside").append('<div class="accordion-third"></div>');
    var jsonData = data;
    var accordionRoot = $("aside .accordion-third");
    for (var indexAccordion in jsonData) { //第一级菜单
        if (!jsonData[indexAccordion].checked) {
            continue;
        }
        var text = jsonData[indexAccordion].text;
        var accordionRootChildren = jsonData[indexAccordion].children;
        var accordionId = 'accordion-' + indexAccordion;
        accordionRoot.append('<div class="accordion-twice" id=' + accordionId + '></div>');
        var accordionRoot_child = accordionRoot.find('#'+accordionId);
        var radioName = "accordion-radio";
        var radioId = "accordion-radio-" + indexAccordion;
        accordionRoot_child.append('<input name=' + radioName + ' id=' + radioId + ' type="radio">');
        accordionRoot_child.append('<label for=' + radioId + '><span>' + text + '</span><i class="icon"></i></label>');
        // accordionRoot_child.append('<div class="section"></div>');
        for (var indexSection in accordionRootChildren) { //第二级菜单
            if (!accordionRootChildren[indexSection].checked) {
                continue;
            }
            var id = accordionRootChildren[indexSection].id;
            var text = accordionRootChildren[indexSection].text;
            var accordionChildren = accordionRootChildren[indexSection].children;
            var selectionId = 'selection-' + indexSection;
            accordionRoot_child.append('<div class="section" id=' + selectionId + '></div>');
            var accordion_child = accordionRoot_child.find('#'+selectionId);
            var radioName = "section-radio";
            var radioId = "section-radio-" + indexSection;
            accordion_child.append('<input name=' + radioName + ' id=' + radioId + ' type="radio">');
            accordion_child.append('<label for=' + radioId + '><span>' + text + '</span></label>');
            accordion_child.append('<div class="content"></div>');
            var accordion_child_content = accordion_child.find(".content");
            accordion_child_content.append('<ul></ul>');
            var accordion_child_content_ul = accordion_child_content.find('ul');
            for (var childIndex in accordionChildren) { //第三级菜单
                if (!accordionChildren[childIndex].checked) {
                    continue;
                }
                var text = accordionChildren[childIndex].text;
                var url = accordionChildren[childIndex].url;
                accordion_child_content_ul.append('<li><a _href=' + url + ' page_title=' + text + ' href="javascript:void(0);" target="iframe_content">' + text + '</a></li>');
            }
        }
    }
}

function ExpansionFirstLevelMenu(){
    if ($("#accordion-radio-0").length > 0) {
        $("#accordion-radio-0").attr("checked","checked");
        return;
    }
    if ($("#section-0").length > 0) {
        $("#section-0").attr("checked","checked");
        return;
    }
}

function load(url) {
    var menuList = window.parent.GetLeftMenuList(url);
    if (menuList == null) {
        console.log("Cannot get menulist.");
        return;
    }
    var depth = window.parent.CalcLevel(menuList);
    console.log("depth: " + depth);
    if (2 == depth) {
        TraverseAuthorityPathForTwoLevel(menuList);
    } else if (3 == depth) {
        TraverseAuthorityPathForThreeLevel(menuList);
    }
    ExpansionFirstLevelMenu();
    return;
}