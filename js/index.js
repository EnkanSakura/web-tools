var rec_url = window.location.href;
var base_url = rec_url.substring(0, rec_url.lastIndexOf('/') + 1) + "html/";
var tool_name = [
    "多人游戏分队工具",
    "苏联笑话生成器",
    "抽签筒",
    "营销号生成器"
];
var tool_url = [
    "game-group",
    "soviet-joke",
    "draw-lots",
    "market-account"
];
var resString = "";

for (var i = 0; i < tool_name.length; ++i) {
    resString += "<div class=\"single-tool\"><a href=\"" + base_url + tool_url[i] +
        ".html\" style=\"text-decoration:none;\">" +
        tool_name[i] + "</a></div>";
}
$(document).ready(function () {
    $("#tool_list").css("font-size", "20px");
    $("#tool_list").html(resString);
});