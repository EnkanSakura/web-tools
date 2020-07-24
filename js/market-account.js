const base_article = [
    "SubjectEvent是怎么回事呢？Subject相信大家都很熟悉，但是SubjectEvent是怎么回事呢，下面就让小编带大家一起了解吧。",
    "SubjectEvent，其实就是Statement，大家可能会很惊讶Subject怎么会Event呢？但事实就是这样，小编也感到非常惊讶。",
    "这就是关于SubjectEvent的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！"
];
const default_in = [
    "营销号",
    "被扬了",
    "营销号的马没了"
];
const body_reg = [
    /Subject/ig,
    /Event/ig,
    /Statement/ig,
    /Think/ig,
    /Say/ig
];
const para_space = "　　";
const long_end = "总结的来说，SubjectEvent其实就是Statement， 大家可能会很惊讶Subject怎么会Event呢？但事实就是这样，小编也感到非常惊讶。"

var request = new XMLHttpRequest();
request.open("get", "../json/sayings.json"); /*设置请求方法与路径*/
request.send(null);
request.onload = function () {
    if (request.status == 200) {
        json = JSON.parse(request.responseText);
    }
}

var user_in = default_in;
var added = {
    sayings: [],
    bosh: [],
    think: [],
    say: []
};
var voice_settings = {
    lan: "zh",
    cuid: "enkansakura",
    ctp: "1",
    spd: "6",
    per: "0",
    tok: "24.bc1428dd49e9edf26594342c7a4c00cf.2592000.1598182998.282335-21579885"
};
var LC_multiplier = 214013;
var LC_addend = 2531011;
var LC_module = Math.pow(2, 32);
var rnd_seed = get_web_para("rnd_seed") || Math.floor(get_random(LC_module, Math.random));

function get_web_para(para) {
    return new URL(window.location.href).searchParams.get(para);
}

function LCG() {
    rnd_seed = (rnd_seed * LC_multiplier + LC_addend) % LC_module;
    return rnd_seed / LC_module;
};

function get_sentence(what) {
    var index = Math.floor(LCG() * json[what].length);
    return json[what][index];
}

function get_random(max_num = 100, rnd_fun = LCG) {
    var out_rnd = rnd_fun() * max_num;
    return parseInt(out_rnd);
}

function creat_short_article() {
    // 短文
    var short_result = new String();
    $(".res-box").css({
        "width": "40%",
        "margin": "0 auto"
    });

    for (var i = 0; i < base_article.length; ++i) {
        short_result += para_space + base_article[i] + (i == base_article.length - 1 ? "" : "<br />");
    }
    for (var i = 0; i < 3; ++i) {
        short_result = short_result.replace(body_reg[i], user_in[i]);
    }
    $("#article_res").html(short_result);
}

function creat_long_article() {
    // 长文
    $(".res-box").css("width", "auto");

    var long_result = new String();
    var para = new String(para_space);
    long_result += "<p style=\"text-align: center; font-weight: bold; font-size: 35px;\">" + get_sentence("title") + "</p>";
    long_result += "<p style=\"line-height: 40px; font-size:25px\">" + para_space + base_article[0] + "<br />";
    while (long_result.length < 250) {
        var rnd = get_random(100);
        var last_sentence = "";
        if (rnd < 5 && para.length > 100) {
            long_result += para + "<br />";
            para = para_space;
            last_sentence = "para";
        } else if (rnd < 20) {
            para += get_sentence("sayings");
            last_sentence = "sayings";
        } else {
            para += get_sentence("bosh");
            last_sentence = "bosh";
        }
    }
    if (last_sentence == "bosh") {
        para += get_sentence("bosh_end");
    }
    long_result += para;
    long_result += long_end + base_article[2] + "</p>";
    for (var i = 0; i < 3; ++i) {
        long_result = long_result.replace(body_reg[i], user_in[i]);
    }
    long_result = long_result.replace(/think/ig, get_sentence("think"));
    long_result = long_result.replace(/say/ig, get_sentence("say"));
    $("#article_res").html(long_result);
}

function voice_article() {
    var article = document.getElementById("article_res").innerText;
    var audio = document.getElementById("voice_control");
    var url = "https://tsn.baidu.com/text2audio?tex=";
    document.getElementById("voice").style.display = "";
    url += encodeURI(encodeURI(article));
    for (i in voice_settings) {
        url += "&" + i + "=" + voice_settings[i];
    }
    audio.src = url;
}

$(document).ready(function () {
    creat_short_article();

    $("#article_run").click(function () {
        var have_blank = [false, false, false, false];
        var t_in = new Array(3);
        for (i in added) {
            added[i].length = 0;
        }
        if ($("#in_subject").val() == "") {
            have_blank[0] = true;
            have_blank[1] = true;
        } else {
            t_in[0] = $("#in_subject").val();
        }
        if ($("#in_event").val() == "") {
            have_blank[0] = true;
            have_blank[2] = true;
        } else {
            t_in[1] = $("#in_event").val();
        }
        if ($("#in_statement").val() == "") {
            have_blank[0] = true;
            have_blank[3] = true;
        } else {
            t_in[2] = $("#in_statement").val();
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
            user_in = t_in;
            document.getElementById("alarm_1").style.visibility = "hidden";
            document.getElementById("alarm_2").style.visibility = "hidden";
            document.getElementById("alarm_3").style.visibility = "hidden";
            document.getElementById("voice").style.display = "none";
            if (document.getElementById("short_article").checked) {
                // 短文
                creat_short_article();
            } else if (document.getElementById("long_article").checked) {
                // 长文
                creat_long_article();
            } else {
                alert("Error");
            }
        }
    });
    $("#article_voice").click(function () {
        voice_article();
    });
})