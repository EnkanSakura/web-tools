base_article = "　　SubjectEvent是怎么回事呢？Subject相信大家都很熟悉，但是SubjectEvent是怎么回事呢，下面就让小编带大家一起了解吧。<br />　　SubjectEvent，其实就是Statement，大家可能会很惊讶Subject怎么会Event呢？但事实就是这样，小编也感到非常惊讶。<br />　　这就是关于SubjectEvent的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！"
in_subject = "营销号";
in_event = "被扬了";
in_statement = "营销号的马没了";

function creat_short_article() {
    var arc_res = new String(base_article);
    for (var i = 0; i < 3; ++i) {
        arc_res = arc_res.replace(/Subject/g, in_subject);
        arc_res = arc_res.replace(/Event/g, in_event);
        arc_res = arc_res.replace(/Statement/g, in_statement);
    }
    $("#article_res").html(arc_res);
}

function creat_long_article() {
    alert("暂未实装");
}

$(document).ready(function () {
    creat_short_article();
    $("#article_run").click(function () {
        var have_blank = [false, false, false, false];
        var t_subject, t_event, t_statement;
        if ($("#in_subject").val() == "") {
            have_blank[0] = true;
            have_blank[1] = true;
        } else {
            t_subject = $("#in_subject").val();
        }
        if ($("#in_event").val() == "") {
            have_blank[0] = true;
            have_blank[2] = true;
        } else {
            t_event = $("#in_event").val();
        }
        if ($("#in_statement").val() == "") {
            have_blank[0] = true;
            have_blank[3] = true;
        } else {
            t_statement = $("#in_statement").val();
        }
        if (have_blank[0]) {
            if (have_blank[1]) {
                document.getElementById("alarm_1").style.visibility = "visible";
            }
            if (have_blank[2]) {
                document.getElementById("alarm_2").style.visibility = "visible";
            }
            if (have_blank[3]) {
                document.getElementById("alarm_3").style.visibility = "visible";
            }
        } else {
            in_subject = t_subject;
            in_event = t_event;
            in_statement = t_statement;
            document.getElementById("alarm_1").style.visibility = "hidden";
            document.getElementById("alarm_2").style.visibility = "hidden";
            document.getElementById("alarm_3").style.visibility = "hidden";
            if (document.getElementById("short_article").checked) {
                creat_short_article();
            } else if (document.getElementById("long_article").checked) {
                creat_long_article();
            } else {
                alert("Error");
            }
        }
    });
});