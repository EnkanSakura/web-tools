reg_9 = /9|Ⅸ|九|氿|玖|笨蛋/g;
var draw_info = new Array();
var draw_num = 0;

$(document).ready(function () {
    // 投签
    $("#draw_add").click(function () {
        var str_tmp = $("#draw_text").val().replace(reg_9, "⑨");
        if (str_tmp == "") {
            str_tmp = "114514";
        }
        var info_tmp = {
            d_str: str_tmp,
            d_rnd: Math.floor(Math.random() * 100)
        };
        draw_info.push(info_tmp);
        if (draw_info.length == 1) {
            document.getElementById("divide_br").hidden = false;
        }
        $("#box_state").html("<b>筒里有" + draw_info.length.toString().replace(/9/g, "⑨") + "根签</b>");
        $("#box_res").append("<label class=\"draw-str\" style=\"font-size: 18px;\">" + str_tmp + "</label><br />");
    });

    // 抽签功能
    $("#draw_run").click(function () {
        if (draw_info.length == 0) {
            alert("筒里没有签");
        } else {
            var draw_index = [0];
            if (document.getElementById("draw_back").checked) {
                if (document.getElementById("draw_once").checked) {
                    // 放回抽一次
                    draw_index[1] = Math.floor(Math.random() * 114514) % draw_info.length;
                    draw_index[0] = 1;
                } else if (document.getElementById("draw_multy").checked) {
                    // 放回抽多次
                    alert("暂未实现");
                }
            } else if (document.getElementById("draw_not_back").checked) {
                if (document.getElementById("draw_once").checked) {
                    // 不放回抽一次
                    alert("暂未实现");
                } else if (document.getElementById("draw_multy").checked) {
                    // 不放回抽多次
                    alert("暂未实现");
                }
            }
            if (draw_index[0] != 0) {
                if (draw_num == 0) {
                    $("#draw_res").html("");
                }
                for (var i = 1; i < draw_index[0] + 1; i++) {
                    $("#draw_res").append("<label class=\"draw-result\" style=\"font-size: 15px;\">" + draw_info[draw_index[i]].d_str + "</label><br />");
                    ++draw_num;
                }
            } else {
                alert("Error");
            }
        }
        if (document.getElementById("draw_clear").hidden == true) {
            document.getElementById("draw_clear").hidden = false;
        }
    });

    // 页面重置
    $("#draw_reset").click(function () {
        $("#box_state").html("<b>现在筒里没有签</b>");
        $("#box_res").html("");
        $("#draw_res").html("<b>结果将显示在此处</b>");
        document.getElementById("divide_br").hidden = true;
        document.getElementById("draw_clear").hidden = true;
        draw_info.length = 0;
        draw_num = 0;
    });

    // 清空结果
    $("#draw_clear").click(function () {
        $("#draw_res").html("<b>结果将显示在此处</b>");
        document.getElementById("draw_clear").hidden = true;
        draw_num = 0
    })

    // 点击签上的文字删除一根签
    // $("#draw_box").$("label").click(function () {
    //     $(this).hide();
    // });
});