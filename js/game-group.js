var checkboxs = document.getElementsByName("member");

function all_select() {
    for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = true;
    }
}

function reverse_select() {
    for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = !checkboxs[i].checked;
    }
}

function rollTeam() {
    var members_all = document.getElementsByName("member");
    var members_selected = new Array();
    var num_selected = 0;
    var random_array = new Array();
    var sort_index = new Array();
    for (var i = 0; i < members_all.length; i++) {
        if (members_all[i].checked) {
            members_selected[num_selected] = members_all[i].value;
            num_selected++;
        }
    }
    if (num_selected < 6)
        return "人数少于六人";
    else {
        for (var i = 0; i < num_selected; i++) {
            random_array[i] = Math.random();
        }
        for (var i = 0; i < num_selected; i++) {
            var idx = random_array.indexOf(Math.max.apply(0, random_array));
            sort_index[i] = idx;
            random_array[idx] = -1;
        }
        var roll_reasult = new String("<center><h3>Team A</h3>");
        for (var i = 0; i < num_selected; i++) {
            roll_reasult += "<p>" + members_selected[sort_index[i]] + "</p>";
            if (i == Math.floor((num_selected - 1) / 2)) {
                roll_reasult += "<h3>Team B</h3>";
            }
        }
        roll_reasult += "</center>";
        return roll_reasult;
    }
}

function reset_web() {
    document.getElementById("check_form").reset();
    return "";
}