var rec_url = window.location.href;
var base_url = rec_url.substring(0, rec_url.lastIndexOf('/') + 1) + "html/";
var tool_name = [
    "多人游戏分队工具",
    "苏联笑话生成器",
    "抽签筒"
];
var tool_url = [
    "game-group",
    "soviet-joke",
    "draw-lots"
];
var resString = "";
var numbers = tool_name.length;

for (var i = 0; i < numbers; ++i) {
    resString += "<p><a href=\"" + base_url + tool_url[i] + ".html\" style=\"text-decoration:none;\">" + tool_name[i] + "</a></p>";
}
$(document).ready(function () {
    $("#tool_list").css("font-size", "20px");
    $("#tool_list").html(resString);
});